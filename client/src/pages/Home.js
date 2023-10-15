import React, { useContext, useEffect, useId } from "react";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import PropertyItem from "../components/PropertyItem";
import { useAxios } from "../api/useAxios";
import Loading from "../components/Loading";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import Pagination from "@mui/material/Pagination";

const Home = () => {
  const { data, error, loading, execute, queryParam } = useAxios(
    "get",
    "/properties",
    "?size=12"
  );

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }

  return (
    <>
      <Header
        type="filter"
        onFilter={(data) => {
          execute(queryParam(data));
        }}
      />
      <div className="container card-list">
        {data?.data?.length > 0 ? (
          data.data.map((item) => (
            <PropertyItem key={item.id} property={item} />
          ))
        ) : (
          <>
            <div className="empty-list" style={{ minHeight: "500px" }}>
              <MapsHomeWorkIcon
                style={{ fontSize: "35px", marginBottom: "10px" }}
              />
              <h3> Sorry! We could not find any properties.</h3>
            </div>
          </>
        )}
      </div>
      <div className="pagination">
        <Pagination
          count={data?.totalPage}
          shape="rounded"
          color="primary"
          page={data?.current + 1}
          onChange={(e, value) => {
            execute(
              queryParam([
                { key: "size", value: 12 },
                { key: "page", value: value - 1 },
              ])
            );
            window.scrollTo(0, 0);
          }}
        />
      </div>
    </>
  );
};

export default Home;
