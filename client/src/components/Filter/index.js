import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import "./index.css";

const Filter = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [room, setRoom] = useState(0);
  const [error, setError] = useState(null);

  return (
    <>
      <div>
        <TextField
          id="standard-basic"
          label="Location"
          variant="outlined"
          size="small"
          className="filter-input1"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <TextField
          id="standard-basic"
          label="Room"
          variant="outlined"
          size="small"
          className="filter-input2"
          error={error ? true : false}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          onChange={(e) => {
            let value = e.target.value;
            if (parseInt(value)) {
              setRoom(parseInt(value));
              setError(null);
            } else {
              setError("Only number is supported");
            }
          }}
        />
        <Button
          variant="contained"
          className="search"
          onClick={() => {
            onFilter([
              { key: "location", value: location },
              { key: "room", value: room },
            ]);
          }}
        >
          Search
        </Button>
      </div>
    </>
  );
};
export default Filter;
