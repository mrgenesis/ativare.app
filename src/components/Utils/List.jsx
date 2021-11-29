import React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function DenseTable({ columns, rows, pageSize }) {

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        hideFooterSelectedRowCount
        autoHeight
        density="compact"
        rows={rows}
        columns={columns}
        pageSize={pageSize}
      />
    </div>
  );
}
