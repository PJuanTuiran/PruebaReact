"use client"; 
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { IconButton } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';


const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable({ rows, columns, onEdit, onDelete }) {
  

   const modifiedColumns = columns.map((column) =>
    column.field === 'actions'
      ? {
          ...column,
          renderCell: (params) => (
            <>
              <IconButton onClick={() => onEdit(params.row)}>
                <FaEdit />
              </IconButton>
              <IconButton onClick={() => onDelete(params.row)}>
                <FaTrash />
              </IconButton>
            </>
          ),
        }
      : column
  );
  return (
    <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={modifiedColumns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}

      />
    </Paper>
  );
}
