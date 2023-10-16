import { faker } from "@faker-js/faker";
import * as React from "react";
import dayjs from "dayjs";
import { Box, Grid, Paper } from "@mui/material";
import DataTable from "../components/DataTable";


import Loading from '../components/Loading';
import Header from '../components/Header';

import { useAxios } from '../api/userAxios';

const DisplayTopTenData = (props) => {

  const { data, error, loading, execute, queryParam } = useAxios(
    "get",
    props.url
  );

  const columns = props.columns;

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState(props.defaultColumnSort);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  React.useEffect(() => {
    // Get new data with new query
    execute(queryParam([{ key: "size", value: rowsPerPage }, { key: "sort", value: `${orderBy},${order}` }, { key: "page", value: page }]))
  }, [rowsPerPage, orderBy, order, page]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  if (loading) {
    return (
      <>
        <Header />
        <Loading loading={loading} />
      </>
    );
  }

  const rows = data?.data;
  const rowCount = data?.total;



  return (

    <Grid container spacing={1}>
      <Grid item xs={12}>
        <DataTable
          title={props.title}
          order={order}
          orderBy={orderBy}
          selected={selected}
          rows={rows}
          columns={columns}
          handleRequestSort={handleRequestSort}
          handleClick={handleClick}
          rowCount={rowCount}
          rowsPerPage={rowsPerPage}
          page={page}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
    </Grid>

  )

};

export default DisplayTopTenData;