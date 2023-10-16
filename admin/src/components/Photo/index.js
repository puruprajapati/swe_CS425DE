import { Box } from "@mui/material";
import React from "react";

function Photo({ src }) {
  return (
    <Box
      component="img"
      sx={{
        height: 200,
        width: 200,
      }}
      alt="From us with love."
      src={src}
    />
  );
}

export default Photo;
