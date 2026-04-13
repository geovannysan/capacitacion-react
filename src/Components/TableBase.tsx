import React from 'react';
import type {
  TableColumn,
  TableProps,
  ExpanderComponentProps,
  ConditionalStyles,
} from 'react-data-table-component';
import * as RDT from 'react-data-table-component';

// ── Interop Vite CJS → ESM ────────────────────────────────────────────────────
type AnyComp = React.ComponentType<TableProps<unknown>>;
type MemoLike = { type: AnyComp };
type ModuleLike = { default: MemoLike };
const mod = (RDT as unknown as { default: ModuleLike }).default;
const DataTable = <T extends object>(props: TableProps<T>) =>
  React.createElement((mod.default as MemoLike).type as React.ComponentType<TableProps<T>>, props);

// ── Props genéricas — T lo define quien usa TableBase ─────────────────────────
export type TableBaseProps<T extends object> = {
  data: T[];
  columns: TableColumn<T>[];
  filterText: string;
  onFilterChange: (value: string) => void;
  selectedRows: T[];
  onSelectedRowsChange: (rows: T[]) => void;
  editRow: T | null;
  onEditClose: () => void;
  onDeleteSelected: (rows: T[]) => void;
  expandedRowComponent?: React.ComponentType<ExpanderComponentProps<T>>;
  expandedRowCondition?: (row: T) => boolean;
  conditionalRowStyles?: ConditionalStyles<T>[];
  progressPending?: boolean;
  title?: string;
  fixedHeaderScrollHeight?: string;
  renderEditModal?: (row: T, onClose: () => void) => React.ReactNode;
};

// ── Subheader con buscador ────────────────────────────────────────────────────
const SubHeaderSearch = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <input
    placeholder="Buscar..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
    style={{ padding: '6px 12px', borderRadius: 4, border: '1px solid #ccc', width: 220 }}
  />
);

// ── Componente presentacional genérico ───────────────────────────────────────
function TableBase<T extends object>({
  data,
  columns,
  filterText,
  onFilterChange,
  selectedRows,
  onSelectedRowsChange,
  editRow,
  onEditClose,
  onDeleteSelected,
  expandedRowComponent,
  expandedRowCondition,
  conditionalRowStyles,
  progressPending = false,
  title = 'Tabla',
  fixedHeaderScrollHeight = '320px',
  renderEditModal,
}: TableBaseProps<T>) {
  return (
    <div style={{ padding: 16 }}>
      {editRow && renderEditModal?.(editRow, onEditClose)}

      <DataTable
        title={title}
        columns={columns}
        data={data}
        pagination
        paginationPerPage={3}
        paginationRowsPerPageOptions={[3, 5, 10]}
        selectableRows
        onSelectedRowsChange={({ selectedRows: rows }) => onSelectedRowsChange(rows)}
        contextActions={
          <button
            onClick={() => onDeleteSelected(selectedRows)}
            style={{
              background: '#c62828',
              color: '#fff',
              border: 'none',
              padding: '6px 14px',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            🗑 Eliminar seleccionados
          </button>
        }
        expandableRows={!!expandedRowComponent}
        expandableRowsComponent={expandedRowComponent}
        expandableRowExpanded={expandedRowCondition}
        subHeader
        subHeaderComponent={<SubHeaderSearch value={filterText} onChange={onFilterChange} />}
        striped
        highlightOnHover
        dense
        fixedHeader
        fixedHeaderScrollHeight={fixedHeaderScrollHeight}
        responsive
        conditionalRowStyles={conditionalRowStyles}
        progressPending={progressPending}
        noDataComponent={<span style={{ padding: 16 }}>No hay datos 🗂</span>}
      />
    </div>
  );
}

export default TableBase;
