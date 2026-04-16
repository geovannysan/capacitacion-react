# Fix: `react-data-table-component` con Vite + React 19

## El problema

```
Error: Element type is invalid: expected a string or a class/function but got: object.
// o bien:
Error: Element type is invalid: ... but got: undefined.
```

## Causa raíz

`react-data-table-component@7.7.0` tiene tres campos de resolución en su `package.json`:

```json
{
  "main": "dist/index.cjs.js",
  "module": "dist/index.es.js",
  "browser": "dist/index.cjs.js"
}
```

Vite en modo browser usa el campo `"browser"` → **CJS build**.

El CJS build exporta así:

```js
// dist/index.cjs.js
exports.__esModule = true;
exports.default = React.memo(function DataTable(props) { ... });
```

Cuando Vite hace el interop CJS→ESM de un módulo con `__esModule: true`, expone:

```
import DataTable from '...'  →  exports.default  →  React.memo(fn)
```

Un `React.memo()` tiene esta forma:

```js
{ $$typeof: Symbol(react.memo), type: fn, compare: null }
```

React 19 es más estricto al validar el tipo en `createElement`. Dependiendo de cómo Vite
resuelva el módulo en cada build/entorno, el resultado puede ser:

| Escenario           | Valor recibido      | Error            |
| ------------------- | ------------------- | ---------------- |
| Vite dev, interop A | `React.memo object` | `got: object`    |
| Vite dev, interop B | `undefined`         | `got: undefined` |
| Vite build prod     | función directa     | ✅ funciona      |

## La solución

Resolver el componente real de forma **defensiva**, cubriendo los tres casos posibles:

```tsx
import * as RDT from 'react-data-table-component';
import type { TableProps } from 'react-data-table-component';
import React from 'react';

type AnyComponent = React.ComponentType<TableProps<unknown>>;

const rdtAny = RDT as unknown as Record<string, unknown>;
const defaultExport = rdtAny['default'] as
  | AnyComponent
  | React.MemoExoticComponent<AnyComponent>
  | undefined;

const DataTableComponent: AnyComponent =
  typeof defaultExport === 'function'
    ? defaultExport // caso 1: función directa
    : ((defaultExport as React.MemoExoticComponent<AnyComponent>)?.type ?? // caso 2: React.memo → .type
      (rdtAny as Record<string, AnyComponent>)['DataTable']); // caso 3: named export fallback
```

Luego usar `React.createElement` en lugar de JSX para evitar la validación de tipo de React 19:

```tsx
function TableBase() {
  return React.createElement(DataTableComponent, { columns, data });
}
```

## Por qué `React.createElement` en lugar de JSX

JSX `<DataTableComponent />` compila a `React.createElement(DataTableComponent, props)`.
React 19 añade una validación **antes** de llamar a `createElement` cuando el tipo viene
de JSX transform. Usando `React.createElement` directamente se bypasea esa validación
y React acepta el componente si es una función válida.

## Solución definitiva (largo plazo)

Esperar a que la librería publique soporte explícito para React 19 con un build ESM nativo
o campo `"exports"` en su `package.json`. Mientras tanto, este fix es estable.
