import { Grid, Paper } from "@mui/material";
import { defaultHeaders } from "api/defaultHeaders";
import useAxios from "axios-hooks";
import PropertyItem from "components/PropertyItem";
import { AuthContext } from "context/AuthContext";
import moment from "moment";
import Layout from "pages/Layout";
import React, { useContext } from "react";
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

function RentHistory() {
  const { isSignedIn } = useContext(AuthContext);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: "/landlord/rental-history",
      method: "get",
      params: {},
      headers: defaultHeaders(isSignedIn)
    },
    {
      useCache: false,
    }
  );

  return (
    <Layout title="Rent History">
      <Grid container>
        {data?.data?.map((item) => {
          return (
            <PropertyItem key={item.id} item={item} property={item.property} />            
          );
        })}
      </Grid>
      {data?.data?.length === 0 &&
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          style={{ minHeight: "80vh" }}
        >
          <DoNotDisturbOnIcon color="disabled" sx={{ fontSize: 120 }} />
          <h3>You don't have any rentals yet!</h3>
        </Grid>
      }
    </Layout>
  );
}

export default RentHistory;
