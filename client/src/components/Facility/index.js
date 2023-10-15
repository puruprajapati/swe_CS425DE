import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import BedIcon from "@mui/icons-material/Bed";
import ShowerIcon from "@mui/icons-material/Shower";

const Facility = ({ type, count }) => {
  return (
    <React.Fragment>
      <Box sx={{ minWidth: 200, maxWidth: 200 }}>
        <Card variant="outlined">
          <CardContent>
            {type === "bed" ? <BedIcon /> : <ShowerIcon />}
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {type === "bed" ? "Bedroom" : "Bathroom"}
            </Typography>
            <Typography variant="body2">
              {count} {type === "bed" ? "bedroom" : "bathroom"}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </React.Fragment>
  );
};
export default Facility;
