import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import "./index.css";
import DefaultImage from "../../assets/img/default-house.jpeg";
import { Box, Typography } from "@mui/material";
import moment from "moment";

const Item = ({ propertyRentalHistory, children }) => {
  if (!propertyRentalHistory) return <></>;

  const { property } = propertyRentalHistory;

  const {
    id,
    numberOfBedrooms,
    numberOfBathrooms,
    photos,
    propertyName,
    rentAmount,
    securityDepositAmount,
    city,
    state,
    propertyType,
  } = property;

  const startDate = moment(propertyRentalHistory.startDate);
  const endDate = moment(propertyRentalHistory.endDate);
  const diff = endDate.diff(startDate);
  const diffDuration = moment.duration(diff);

  console.log(propertyRentalHistory);

  return (
    <>
      <Card className="card-item">
        <CardMedia
          component="img"
          height="240"
          image={photos.length > 0 ? photos[0].imageUrl : DefaultImage}
          alt="green iguana"
        />
        <CardContent>
          <div style={{ textAlign: "right" }}>
            <h4 className="title">
              <span style={{ fontSize: "30px" }}>${rentAmount}</span>
            </h4>
            <h4 className="sub-title">
              {"("}Security Deposit{")"}{" "}
              <span style={{ fontSize: "30px" }}>${securityDepositAmount}</span>
            </h4>
          </div>

          <div className="card-body">
            <p>
              {propertyType} {propertyName}
            </p>
            <h5 className="city" style={{ marginBottom: "10px" }}>
              {city}, {state}
            </h5>
            <p>{numberOfBedrooms} bedroom</p>
            <p>{numberOfBathrooms} bathroom</p>
            <p
              style={{ fontWeight: "bold", color: "black", marginTop: "10px" }}
            >
              From {moment(startDate).format("MMM DD YYYY")} to{" "}
              {moment(endDate).format("MMM DD YYYY")} for {diffDuration.days()}{" "}
              days
            </p>
            <Box
              sx={{ fontWeight: "bold", m: 1 }}
              style={{ textAlign: "right" }}
            >
              Total{" "}
              <span style={{ fontSize: "30px" }}>
                ${diffDuration.days() * (rentAmount + securityDepositAmount)}
              </span>
            </Box>
          </div>
        </CardContent>
        {children}
      </Card>
    </>
  );
};
export default Item;
