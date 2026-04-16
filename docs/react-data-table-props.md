# `react-data-table-component` — Props principales y utilidades

## Props demostradas en `TableBase`

| Prop                           | Tipo                              | Descripción                                              |
| ------------------------------ | --------------------------------- | -------------------------------------------------------- |
| `title`                        | `string \| ReactNode`             | Encabezado visible sobre la tabla                        |
| `columns`                      | `TableColumn<T>[]`                | Definición de columnas: nombre, selector, orden, ancho   |
| `data`                         | `T[]`                             | Array de datos tipados que alimenta la tabla             |
| `pagination`                   | `boolean`                         | Activa paginación automática en el cliente               |
| `paginationPerPage`            | `number`                          | Filas por página por defecto                             |
| `paginationRowsPerPageOptions` | `number[]`                        | Opciones del selector de filas por página                |
| `selectableRows`               | `boolean`                         | Agrega checkboxes para selección múltiple de filas       |
| `striped`                      | `boolean`                         | Alterna color de fondo en filas pares/impares            |
| `highlightOnHover`             | `boolean`                         | Resalta la fila al pasar el cursor                       |
| `dense`                        | `boolean`                         | Reduce el padding para tablas compactas                  |
| `fixedHeader`                  | `boolean`                         | Fija el encabezado al hacer scroll vertical              |
| `fixedHeaderScrollHeight`      | `string`                          | Altura máxima del cuerpo scrolleable (ej. `"300px"`)     |
| `responsive`                   | `boolean`                         | Envuelve la tabla en un contenedor con scroll horizontal |
| `progressPending`              | `boolean`                         | Muestra un spinner de carga mientras es `true`           |
| `noDataComponent`              | `ReactNode`                       | Contenido a mostrar cuando `data` está vacío             |
| `onRowClicked`                 | `(row: T, e: MouseEvent) => void` | Callback al hacer click en una fila                      |

## Props adicionales de alto valor

| Prop                      | Descripción                                                       |
| ------------------------- | ----------------------------------------------------------------- |
| `expandableRows`          | Habilita filas expandibles con contenido personalizado            |
| `expandableRowsComponent` | Componente que se renderiza al expandir una fila                  |
| `conditionalRowStyles`    | Aplica estilos dinámicos por condición en cada fila               |
| `customStyles`            | Objeto completo para sobreescribir todos los estilos internos     |
| `subHeader`               | Zona sobre la tabla para filtros o acciones (ej. buscador)        |
| `paginationServer`        | Delega la paginación al servidor en lugar del cliente             |
| `sortServer`              | Delega el ordenamiento al servidor                                |
| `onSelectedRowsChange`    | Callback con las filas seleccionadas actualmente                  |
| `clearSelectedRows`       | Flag para limpiar la selección programáticamente                  |
| `contextActions`          | Acciones que aparecen en la barra contextual al seleccionar filas |

## Por qué usar `DataTable` como `const` genérico

```tsx
const DataTable = <T extends object>(props: TableProps<T>) =>
  React.createElement(..., props);
```

- Preserva el **tipado genérico** `T` en columnas y datos — TypeScript infiere el tipo de `row` en cada `selector`
- Se usa como JSX normal: `<DataTable columns={...} data={...} />`
- Permite pasar **todos los props** de `TableProps<T>` con autocompletado e inferencia
- Evita el problema de Vite + React 19 con el interop CJS sin instalar nada adicional
