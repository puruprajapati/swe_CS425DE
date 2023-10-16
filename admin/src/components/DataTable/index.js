import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import PropTypes from 'prop-types';
import React from 'react';
import EnhancedTableHead from './EnhancedTableHead';
import TableToolbar from './TableToolbar';

const DataTable = function index(props) {
  const { order, orderBy, selected, rows, columns, handleRequestSort, handleClick, rowCount, rowsPerPage, page, handleChangePage, handleChangeRowsPerPage, title } = props;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowCount) : 0;

  return (
    <Paper sx={{ width: "100%", mb: 2 }}>
        <TableToolbar title={title} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
            stickyHeader
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              // onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={columns}
            />
            <TableBody>
            {rows
              .map((row) => {
                return (
                  <TableRow hover 
                      role="selection" 
                      tabIndex={-1} 
                      key={row.id}
                      onClick={(event) => {
                        event.stopPropagation()

                        handleClick(event, row)}}
                      >
                    {columns.map((column) => {
                      const value = row[column.id];

                      if (column.renderCell) {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.renderCell({ value, row })}
                          </TableCell>
                        ); 
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  );
}

DataTable.defaultProps = {
  rows: [],
}

DataTable.propTypes = {
  title: PropTypes.string,
}

export default DataTable;