# `react-data-table-component` vs MUI DataGrid

## Comparativa general

| Característica | react-data-table-component | MUI DataGrid |
|---|---|---|
| Peso del bundle | ~50 KB | ~300 KB (Community) |
| Dependencias | solo `styled-components` | todo el ecosistema MUI |
| Licencia gratuita completa | ✅ MIT | ⚠️ Pro/Premium son de pago |
| Paginación servidor | ✅ built-in | ✅ built-in |
| Paginación cliente | ✅ automática | ✅ automática |
| Filas expandibles (Collapse) | ✅ `expandableRows` + componente custom | ❌ no disponible en Community |
| Subheader con buscador | ✅ `subHeaderComponent` libre | ❌ toolbar fija con API limitada |
| Header de columna custom (ReactNode) | ✅ `name: <ReactNode>` | ⚠️ solo `renderHeader` con API propia |
| Celda custom completa | ✅ `cell: (row) => ReactNode` | ✅ `renderCell` |
| Columna tipo botón | ✅ `button: true` | ✅ `type: 'actions'` |
| Estilos condicionales por fila | ✅ `conditionalRowStyles` | ⚠️ solo via `getRowClassName` + CSS |
| Estilos condicionales por celda | ✅ `conditionalCellStyles` | ❌ no disponible |
| `contextActions` al seleccionar | ✅ barra de acciones automática | ❌ manual |
| Drag & drop de columnas | ✅ `onColumnOrderChange` | ✅ Pro |
| Virtualización de filas | ❌ | ✅ |
| Edición inline de celdas | ❌ | ✅ |
| Agrupación de filas | ❌ | ✅ Premium |
| Tipado genérico `<T>` | ✅ completo | ✅ completo |
| Theming | `createTheme()` propio | integrado con MUI Theme |

---

## Lo que permite `react-data-table-component` y MUI DataGrid no (gratis)

### 1. Filas expandibles (Collapse)
```tsx
<DataTable
  expandableRows
  expandableRowsComponent={({ data }) => <div>{data.description}</div>}
  expandableRowExpanded={(row) => row.rating >= 9}  // auto-expandir por condición
/>
```
MUI DataGrid Community **no tiene filas expandibles**. Es feature de la versión Pro ($).

### 2. `contextActions` — barra de acciones al seleccionar filas
```tsx
<DataTable
  selectableRows
  contextActions={<button onClick={handleDelete}>🗑 Eliminar</button>}
/>
```
Aparece automáticamente cuando hay filas seleccionadas. En MUI hay que construirlo manualmente.

### 3. `subHeaderComponent` — zona libre sobre la tabla
```tsx
<DataTable
  subHeader
  subHeaderComponent={<input placeholder="Buscar..." onChange={...} />}
/>
```
En MUI el toolbar tiene una API rígida (`GridToolbar`). Aquí es un `ReactNode` libre.

### 4. `conditionalCellStyles` — estilos por celda según condición
```tsx
{
  name: 'Rating',
  conditionalCellStyles: [
    { when: (row) => row.rating >= 8, style: { color: 'green', fontWeight: 700 } },
  ]
}
```
MUI DataGrid no expone estilos condicionales por celda de forma declarativa.

### 5. Header de columna como `ReactNode` libre
```tsx
{ name: <span title="tooltip">🎬 Título</span> }
```
En MUI se usa `renderHeader` pero dentro de una API más restrictiva.

---

## Cuándo elegir cada uno

**Usar `react-data-table-component` cuando:**
- Necesitas filas expandibles (collapse) sin pagar licencia
- Quieres bundle pequeño y pocas dependencias
- El diseño no está atado a MUI
- Necesitas `contextActions` o `subHeader` libres

**Usar MUI DataGrid cuando:**
- Ya usas MUI en el proyecto y quieres consistencia visual
- Necesitas virtualización para miles de filas
- Necesitas edición inline de celdas
- Tienes presupuesto para Pro/Premium
