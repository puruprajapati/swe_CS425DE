import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100%",
        justifyContent: "center",
        marginTop: "200px",
        minHeight: "600px",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
