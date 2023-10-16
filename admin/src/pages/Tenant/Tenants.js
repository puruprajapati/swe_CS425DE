import { Button, Grid } from "@mui/material";
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
import { AuthContext } from "context/AuthContext";
import { defaultHeaders } from "api/defaultHeaders";

function Tenants(props) {
  const columns = useMemo(
    () => [
      { id: "id", label: "Id" },
      { id: "firstName", label: "First Name" },
      { id: "lastName", label: "Last Name" },
      { id: "email", label: "Email" },
      { id: "gender", label: "Gender" },

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

  const { isSignedIn } = useContext(AuthContext);
  const [order, setOrder] = React.useState("desc");
  const [orderBy, setOrderBy] = React.useState("firstName");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  // const [rows, setRows] = React.useState([]);
  // const [rowCount, setRowCount] = React.useState(34);
  const [keywords, setKeywords] = useState("");

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/admin/tenants",
      method: "get",
      params: {
        page,
        size: rowsPerPage,
        sort: orderBy ? orderBy + "," + order : undefined,
        keywords,
      },
      headers: defaultHeaders(isSignedIn)
    },
    {
      useCache: false,
    }
  );

  const rows = data?.data.map((i) => {
    return { ...i, actions: [RowActions.activate, RowActions.deactivate] };
  });

  const rowCount = data?.total;

  console.log(rows);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = (event, row) => {
    const name = row.name;
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

    console.log("click ", row);

    navigate(`/admin/tenants/${row.id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Search tenants                               */
  /* -------------------------------------------------------------------------- */
  const searchTenants = (keywords) => {
    setKeywords(keywords);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 New tenant                                 */
  /* -------------------------------------------------------------------------- */
  const navigate = useNavigate();

  const addTenant = () => {
    navigate("/admin/tenants/new");
  };

  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */
  const [
    { data: userUpdated, loading: putLoading, error: putError },
    executePut,
  ] = useAxios(
    {
      url: "/admin/users/{{user_id}}/activate",
      method: "PUT",
      headers: defaultHeaders(isSignedIn)
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [refetch, userUpdated]);

  const onAction = (action, row) => {
    // TODO: handle action
    console.log(action, row);
    executePut({
      url: `/admin/users/${row.id}/${action}`,
      method: "PUT",
    });
  };

  return (
    <Layout title="Tenants">
      <Grid container spacing={1}>
        <Grid item xs={4}>
          <SearchForm onSubmit={searchTenants} />
        </Grid>

        {/* <Grid item xs={4}>
          <Button variant="contained" onClick={addTenant}>
            <AddIcon /> New Tenant
          </Button>
        </Grid> */}

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
    </Layout>
  );
}

export default Tenants;
