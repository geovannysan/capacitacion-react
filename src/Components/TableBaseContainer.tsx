import React from 'react';
import type {
  TableColumn,
  ExpanderComponentProps,
  ConditionalStyles,
} from 'react-data-table-component';

import TableBase from './TableBase';

// ── Tipo concreto — solo el contenedor lo conoce ──────────────────────────────
type Row = {
  id: number;
  title: string;
  year: string;
  genre: string;
  rating: number;
  active: boolean;
};

// ── Columnas ──────────────────────────────────────────────────────────────────
const staticColumns: TableColumn<Row>[] = [
  { name: 'ID', selector: (row) => row.id, sortable: true, width: '70px', center: true },
  { name: '🎬 Título', selector: (row) => row.title, sortable: true, grow: 2 },
  { name: 'Año', selector: (row) => row.year, sortable: true, center: true, width: '90px' },
  {
    name: 'Rating',
    selector: (row) => row.rating,
    sortable: true,
    center: true,
    format: (row) => `⭐ ${row.rating}/10`,
    conditionalCellStyles: [
      { when: (row) => row.rating >= 8, style: { color: '#2e7d32', fontWeight: 700 } },
      { when: (row) => row.rating < 6, style: { color: '#c62828' } },
    ],
  },
  {
    name: 'Estado',
    center: true,
    cell: (row) => (
      <span
        style={{
          padding: '2px 10px',
          borderRadius: 12,
          fontSize: 12,
          fontWeight: 600,
          background: row.active ? '#e8f5e9' : '#ffebee',
          color: row.active ? '#2e7d32' : '#c62828',
        }}
      >
        {row.active ? 'Activo' : 'Inactivo'}
      </span>
    ),
  },
];

function useColumns(onEdit: (row: Row) => void): TableColumn<Row>[] {
  return React.useMemo(
    () => [
      ...staticColumns,
      {
        name: 'Acciones',
        button: true,
        cell: (row: Row) => (
          <button
            onClick={() => onEdit(row)}
            style={{
              padding: '4px 10px',
              borderRadius: 4,
              border: 'none',
              background: '#1976d2',
              color: '#fff',
              cursor: 'pointer',
              fontSize: 12,
            }}
          >
            Editar
          </button>
        ),
      },
    ],
    [onEdit],
  );
}

// ── Expand ────────────────────────────────────────────────────────────────────
const ExpandedRow = ({ data }: ExpanderComponentProps<Row>) => (
  <div style={{ padding: '12px 24px', background: '#f5f5f5', borderLeft: '4px solid #1976d2' }}>
    <strong>Género:</strong> {data.genre} &nbsp;|&nbsp;
    <strong>Rating:</strong> ⭐ {data.rating}/10 &nbsp;|&nbsp;
    <strong>Estado:</strong> {data.active ? '✅ Activo' : '❌ Inactivo'}
  </div>
);

const conditionalRowStyles: ConditionalStyles<Row>[] = [
  { when: (row) => !row.active, style: { opacity: 0.5, fontStyle: 'italic' } },
];

// ── Datos ─────────────────────────────────────────────────────────────────────
const ALL_DATA: Row[] = [
  { id: 1, title: 'Beetlejuice', year: '1988', genre: 'Comedia', rating: 7, active: true },
  { id: 2, title: 'Ghostbusters', year: '1984', genre: 'Comedia', rating: 8, active: true },
  { id: 3, title: 'The Shining', year: '1980', genre: 'Terror', rating: 9, active: false },
  { id: 4, title: 'Blade Runner', year: '1982', genre: 'Sci-Fi', rating: 9, active: true },
  { id: 5, title: 'Alien', year: '1979', genre: 'Terror', rating: 8, active: false },
];

// ── Contenedor — toda la lógica aquí ─────────────────────────────────────────
function TableBaseContainer() {
  const [data, setData] = React.useState<Row[]>(ALL_DATA);
  const [filterText, setFilterText] = React.useState('');
  const [selectedRows, setSelectedRows] = React.useState<Row[]>([]);
  const [editRow, setEditRow] = React.useState<Row | null>(null);

  const filtered = data.filter((row) => row.title.toLowerCase().includes(filterText.toLowerCase()));

  const handleEdit = React.useCallback((row: Row) => setEditRow(row), []);
  const handleEditClose = React.useCallback(() => setEditRow(null), []);
  const handleDelete = React.useCallback((rows: Row[]) => {
    const ids = new Set(rows.map((r) => r.id));
    setData((prev) => prev.filter((r) => !ids.has(r.id)));
    setSelectedRows([]);
  }, []);

  const columns = useColumns(handleEdit);

  return (
    <TableBase<Row>
      title="🎬 Catálogo de Películas"
      data={filtered}
      columns={columns}
      filterText={filterText}
      onFilterChange={setFilterText}
      selectedRows={selectedRows}
      onSelectedRowsChange={setSelectedRows}
      editRow={editRow}
      onEditClose={handleEditClose}
      onDeleteSelected={handleDelete}
      expandedRowComponent={ExpandedRow}
      expandedRowCondition={(row) => row.rating >= 9}
      conditionalRowStyles={conditionalRowStyles}
      renderEditModal={(row, onClose) => (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 999,
          }}
          onClick={onClose}
        >
          <div
            style={{ background: '#fff', padding: 24, borderRadius: 8, minWidth: 280 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ margin: '0 0 12px' }}>Editando: {row.title}</h3>
            <p>
              Año: {row.year} | Rating: {row.rating}
            </p>
            <button onClick={onClose} style={{ marginTop: 12, cursor: 'pointer' }}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    />
  );
}

export default TableBaseContainer;
