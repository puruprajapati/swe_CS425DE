import { Input, InputAdornment, Paper } from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";

function SearchForm({ onSubmit, initialValues }) {
  const formik = useFormik({
    initialValues: initialValues || { search: "" },
    onSubmit: values => {
      onSubmit(values.search)
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper>
        <Input
          id="search"
          name="search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
          disableUnderline
          sx={{ p: 1.5 }}
          placeholder="Search"
          fullWidth
          onChange={formik.handleChange}
          value={formik.values.search}
        />
      </Paper>
    </form>
  );
}

export default SearchForm;
