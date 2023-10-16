import * as React from "react";
import dayjs from "dayjs";
import { Box, Grid } from "@mui/material";
import Layout from "./Layout";
import PieChartComponent from "components/PieChartComponent";
import LineChartComponent from "components/LineChartComponent"
import DisplayTopTenData from "components/DisplayTopTenData";

function AdminDashboard() {
  const urlPieChart = "properties/property-by-income"

  const tenantColumn = [
    { id: "id", label: "Id", minWidth: 10 },
    { id: "firstName", label: "First Name", minWidth: 170 },
    { id: "lastName", label: "Last Name", minWidth: 170 },
    {
      id: "createdAt",
      label: "Date",
      minWidth: 170,
      align: "right",
      format: (value) => dayjs(value).format("MMM DD YYYY"),
    },
    {
      id: "gender",
      label: "Gender",
      minWidth: 170,
      align: "right",
      format: (value) => value,
    },
  ];

  const propertyColumn = [
    { id: "id", label: "Id", minWidth: 10 },
    { id: "propertyName", label: "Property Name", minWidth: 170 },
    { id: "streetAddress", label: "Street Name", minWidth: 170 },
    { id: "city", label: "City", minWidth: 170 },
    { id: "propertyType", label: "Property Type", minWidth: 170 },
    { id: "numberOfBedrooms", label: "Bedroom#", minWidth: 170 },
    { id: "numberOfBathrooms", label: "Bathroom#", minWidth: 170 },
    {
      id: "lastRentedDate",
      label: "Last Rented Date",
      minWidth: 170,
      align: "right",
      format: (value) => dayjs(value).format("MMM DD YYYY"),
    },

  ];

  return (
    <Layout title="Dashboard">
      <Grid container spacing={1}>
        <DisplayTopTenData title="Newly added tenants" url="/admin/tenants" columns={tenantColumn} defaultColumnSort="createdAt" />

        <DisplayTopTenData title="Recently rented properties" url="/properties/rented/paginated" columns={propertyColumn} defaultColumnSort="lastRentedDate" />

        <Grid item xs={6} rowSpacing={1}>

          <PieChartComponent url={urlPieChart} />

          <Box margin={1} />
          <LineChartComponent />
        </Grid>
      </Grid>
    </Layout>
  );
}

export default AdminDashboard;
