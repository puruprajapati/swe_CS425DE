import React, { useContext } from 'react';
import Layout from "./Layout";
import dayjs from "dayjs";
import { Box, Grid } from "@mui/material";
import { AuthContext } from 'context/AuthContext';
import DisplayTopTenData from "components/DisplayTopTenData";
import PieChartComponent from "components/PieChartComponent";

const LandlordDashboard = () => {

  const { user } = useContext(AuthContext);
  console.log('pp', user)
  let urlPieChart = "properties/property-by-income";
  if (user) {
    urlPieChart = urlPieChart + "?userId=" + user.id.toString();
    console.log('url', urlPieChart)
  }



  const propertyColumn = [
    { id: "id", label: "Id", minWidth: 10 },
    { id: "propertyName", label: "Property Name", minWidth: 170 },
    { id: "streetAddress", label: "Street Name", minWidth: 170 },
    { id: "city", label: "City", minWidth: 170 },
    { id: "propertyType", label: "Property Type", minWidth: 170 },
    { id: "numberOfBedrooms", label: "Bedroom#", minWidth: 170 },
    { id: "numberOfBathrooms", label: "Bathroom#", minWidth: 170 }

  ];


  return (
    <Layout title="Dashboard">
      <Grid container spacing={1}>
        <DisplayTopTenData title="Properties" url="/landlord/properties" columns={propertyColumn} defaultColumnSort="createdAt" />

        <DisplayTopTenData title="Leased Properties" url="/landlord/properties/top10-lease-end" columns={propertyColumn} defaultColumnSort="createdAt" />

        <Grid item xs={6} rowSpacing={1}>

          <PieChartComponent url={urlPieChart} />
        </Grid>
      </Grid>
    </Layout>

  )
}

export default LandlordDashboard;