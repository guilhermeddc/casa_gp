import React from "react";

import {
  DataGrid as MuiDataGrid,
  GridColDef,
  DataGridProps,
  GridRowsProp,
} from "@mui/x-data-grid";

interface IProps extends DataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp[];
  initialPageSize?: number;
  checkboxSelection?: boolean;
}

export const DataGrid: React.FC<IProps> = ({
  rows,
  columns,
  checkboxSelection = false,
  ...props
}) => {
  return (
    <MuiDataGrid
      rows={rows}
      columns={columns}
      pagination
      checkboxSelection={checkboxSelection}
      {...props}
    />
  );
};
