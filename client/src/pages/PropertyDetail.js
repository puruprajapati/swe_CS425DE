import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";
import Facility from "../components/Facility";
import RentForm from "../components/RentForm";
import { useAxios } from "../api/useAxios";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const PropertyDetail = () => {
  const { id } = useParams();
  const { data, error, loading } = useAxios("get", "/properties/" + id);

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    );
  }
  console.log(data);
  return (
    <>
      <Header />
      <Carousel list={data?.photos} />
      <div className="detail-description">
        <div style={{ marginBottom: "20px" }}>
          <h4 className="title">
            {data?.propertyType} {data?.propertyName} hosted by{" "}
            {data?.ownedBy.firstName} {data?.ownedBy.lastName}
          </h4>
        </div>
        <div>
          <h4 className="title">${data?.rentAmount}</h4>
          <p className="sub-title">
            {data?.city}, {data?.state}
          </p>
        </div>
        <hr />
        <div style={{ marginBottom: "100px", marginTop: "50px" }}>
          <h4 className="title">Facilities</h4>
          <div className="facility-list">
            <Facility count={data?.numberOfBedrooms} type="bed" />
            <Facility count={data?.numberOfBathrooms} type="bath" />
          </div>
        </div>
        <hr />
        <div>
          <h4 className="title">Description</h4>
          <div className="description">
            <p>{data?.description}</p>
          </div>
        </div>
        <div className="rent-form-container">
          <RentForm
            amount={data?.rentAmount}
            security={data?.securityDepositAmount}
            id={data?.id}
          />
        </div>
      </div>
    </>
  );
};

export default PropertyDetail;
