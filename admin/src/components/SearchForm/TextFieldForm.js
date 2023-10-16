import { Paper, TextField } from "@mui/material";
import React from "react";
import { useFormik } from "formik";

function TextFieldForm({ onSubmit, initialValues, label }) {
  const formik = useFormik({
    initialValues: initialValues || { search: "" },
    onSubmit: values => {
      onSubmit(values.search)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper>
        <TextField 
          id="search"
          name="search"
          label={label}
          variant="outlined" 
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.search}
        />
      </Paper>
    </form>
  );
}

TextFieldForm.defaultProps = {
  label: "Search"
}

export default TextFieldForm;
