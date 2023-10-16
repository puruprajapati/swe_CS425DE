import { Button, Grid } from '@mui/material';
import React from 'react';

function Action({ color, text, onClick }) {

  const handleClick = (e) => {
    e.stopPropagation();

    onClick()
  }

  return (
    <Grid item>
      <Button onClick={handleClick} variant="outlined" color={color}>
        {text}
      </Button>
    </Grid>
  );
}

export default Action;