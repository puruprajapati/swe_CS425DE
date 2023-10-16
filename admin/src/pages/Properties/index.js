import { Box, Button, Grid, MenuItem, Paper, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { ColumnTypes, RowActions } from "components/DataTable/RowActions";
import StatusView from "components/StatusView";
import Action from "components/DataTable/Action";
import Layout from "pages/Layout";
import SearchForm from "components/SearchForm";
import DataTable from "components/DataTable";
import { UserStatus } from "common/constant";
import useAxios from "axios-hooks";
import { defaultHeaders } from 'api/defaultHeaders';
import { AuthContext } from 'context/AuthContext';
import SearchIcon from "@mui/icons-material/Search";


const roomSelections = [
  {
    value: 0,
    label: '-',
  },
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
];

function Properties(props) {
  const columns = useMemo(
    () => [
      // { id: "id", label: "ID", },
      { id: "propertyName", label: "Property Name" },
      { id: "city", label: "Address" },
      { id: "propertyType", label: "Type" },
      { id: "rentAmount", label: "Amount" },
      { id: "securityDepositAmount", label: "Security Deposit" },
      { id: "numberOfBedrooms", label: "Bedrooms" },
      { id: "numberOfBathrooms", label: "Bathrooms" },
      { id: "isOccupied", label: "isOccupied" },
      // { id: "lastRentedBy.email", label: "Rented By" },

      {
        id: "active",
        label: "Active",
        align: "left",
        renderCell: (data) => {
          const status = data.value ? UserStatus.active : UserStatus.deactivate;
          return <StatusView title={status} variant={status} />;
        },
      },
      {
        id: "actions",
        label: "Actions",
        type: ColumnTypes.actions,
        renderCell: (data) => {
          const actions = data.value;
          const row = data.row;

          const buttons = actions.map((a) => {
            return (
              <Action
                onClick={() => onAction(a, row)}
                text={a}
                color={a}
                key={`${a}_${row.id}`}
              />
            );
          });

          return (
            <Grid container spacing={1}>
              {buttons}
            </Grid>
          );
        },
      },
    ],
    []
  );

  const { isSignedIn } = useContext(AuthContext)

  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("createdAt");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [rows, setRows] = React.useState([]);
  // const [rowCount, setRowCount] = React.useState(34);
  const [keywords, setKeywords] = useState("");
  const [room, setRoom] = useState(0);

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/landlord/properties",
      method: "get",
      params: {
        page,
        size: rowsPerPage,
        sort: orderBy ? orderBy + "," + order : undefined,
        search: keywords,
        room: room,
      },
      headers: defaultHeaders(isSignedIn)
    },
    {
      useCache: false,
    }
  );

  let rows = data?.data?.map((i) => {
    return { ...i, actions: [RowActions.activate, RowActions.deactivate, RowActions.delete] };
  });

  const rowCount = data?.total;

  console.log(rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    console.log("click ", row);

    // NOTE: Do not need to do edit property because it will cause the mismatch with the rental history
    // navigate(`/properties/detail/${row.id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* -------------------------------------------------------------------------- */
  /*                            Search properties                               */
  /* -------------------------------------------------------------------------- */
  const search = (keywords) => {
    setKeywords(keywords);
  };

  const searchProperties = () => {
    refetch()
  }
  /* -------------------------------------------------------------------------- */
  /*                               New property                                 */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();

  const newProperty = () => {
    // New property
    navigate("/properties/new");
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */
  const [
    { data: userUpdated, loading: putLoading, error: putError },
    executePut,
  ] = useAxios(
    {
      url: "/landlord/properties/{{user_id}}/activate",
      method: "PUT",
      headers: defaultHeaders(isSignedIn),
    },
    { manual: true }
  );

  const [
    { data: deleteData, loading: deleteLoading },
    executeDelete,
  ] = useAxios(
    {
      url: "/landlord/properties/{{user_id}}",
      method: "DELETE",
      headers: defaultHeaders(isSignedIn),
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [refetch, userUpdated, deleteData]);

  const onAction = async (action, row) => {
    if (action === 'delete') {
      await executeDelete(
        {
          url: `/landlord/properties/${row.id}`,
          method: "DELETE",
          headers: defaultHeaders(isSignedIn),
        }
      )      
    } else {
    executePut({
      url: `/landlord/properties/${row.id}/${action}`,
      method: "PUT",
      headers: defaultHeaders(isSignedIn),
    });
  }
  };

  return (
    <Layout title="Properties">
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <SearchForm onSubmit={search} />
        </Grid>
        <Grid item xs={1}>
          <Paper>
            <TextField
              id="room"
              select
              label="Rooms"
              value={room}
              onChange={(event) => {
                setRoom(event.target.value)
              }}
              variant="outlined" 
              fullWidth
            >
              {roomSelections.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Paper>
        </Grid>
        {/* <Grid item xs={3}>
          <TextFieldForm label="Search by rooms" onSubmit={searchByRooms} />
        </Grid> */}

        <Grid item>
          <Button variant="contained" onClick={searchProperties}>
            <Box p={1} flexDirection="row" display="flex">
              <SearchIcon />
              <Typography ml={1}>Search</Typography>
            </Box>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={newProperty}>
            <Box p={1} flexDirection="row" display="flex">
              <AddIcon /> 
              <Typography ml={1}>New Property</Typography>
            </Box>
          </Button>
        </Grid>

        <Grid item xs={12}>
          <DataTable
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
      {/* <Loading loading={loading || deleteLoading || putLoading} /> */}
    </Layout>
  );
}

export default Properties;
