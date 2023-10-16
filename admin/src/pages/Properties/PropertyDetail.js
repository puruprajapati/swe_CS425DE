import { Box, Button, Grid, Paper } from "@mui/material";
import Layout from "pages/Layout";
import React, { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import useAxios from "axios-hooks";
import { defaultHeaders } from "api/defaultHeaders";
import { AuthContext } from "context/AuthContext";
import Loading from "components/Loading";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Photo from "components/Photo";
import AxiosFormData from "form-data";

function PropertyDetail(props) {
  const { id } = useParams();
  const { isSignedIn } = useContext(AuthContext);

  /* -------------------------------------------------------------------------- */
  /*                                Get property                                */
  /* -------------------------------------------------------------------------- */
  const [{ data: property }, getProperty] = useAxios(
    {
      url: "/landlord/properties/" + id,
      method: "post",
      data: {},
      headers: defaultHeaders(isSignedIn),
    },
    {
      useCache: false,
      manual: true,
    }
  );

  useEffect(() => {
    getProperty(
      {
        url: "/landlord/properties/" + id,
        method: "post",
        data: {},
        headers: defaultHeaders(isSignedIn),
      },
      {
        useCache: false,
        manual: true,
      }
    );
  }, [getProperty, id, isSignedIn]);

  const notify = (msg) => toast.error(msg);

  const [{ data, loading, error }, updateProperty] = useAxios(
    {
      url: "/landlord/properties",
      method: "post",
      data: {},
      headers: defaultHeaders(isSignedIn),
    },
    {
      useCache: false,
      manual: true,
    }
  );

  /* -------------------------------------------------------------------------- */
  /*                                Select photos                               */
  /* -------------------------------------------------------------------------- */
  const [photos, setPhotos] = useState([]);

  const handleSelectPhotos = ({ target }) => {
    const files = [];
    for (let index = 0; index < target.files.length; index++) {
      const file = target.files[index];
      const url = URL.createObjectURL(file);
      files.push({
        file,
        url,
      });
    }
    console.log(files);
    setPhotos(files);
  };

  /* -------------------------------------------------------------------------- */
  /*                                Upload photos                               */
  /* -------------------------------------------------------------------------- */
  const [{ data: uploadedFiles }, uploadFiles] = useAxios(
    {
      url: "/file/upload",
      method: "post",
      data: {},
      headers: defaultHeaders(isSignedIn),
    },
    {
      useCache: false,
      manual: true,
    }
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      let imageUrls = [];
      if (photos.length > 0) {
        const formData = new AxiosFormData();
        photos.map((p) => {
          formData.append("files", p.file);
          return "";
        });

        const files = await uploadFiles(
          {
            url: "/file/upload-multiple-files",
            method: "post",
            data: formData,
            headers: {
              ...defaultHeaders(isSignedIn),
              "Content-Type": "multipart/form-data",
            },
          },
          {
            useCache: false,
            manual: true,
          }
        );

        imageUrls = files?.data?.data?.map((f) => {
          return {
            imageUrl: f.fileDownloadUri,
          };
        });

        console.log(imageUrls);
      }

      const property = await updateProperty(
        {
          url: "/landlord/properties",
          method: "post",
          data: {
            propertyName: form.get("propertyName"),
            description: form.get("description"),
            streetAddress: form.get("streetAddress"),
            city: form.get("city"),
            state: form.get("state"),
            zipCode: form.get("zipCode"),
            propertyType: form.get("propertyType"),
            numberOfBedrooms: form.get("numberOfBedrooms"),
            numberOfBathrooms: form.get("numberOfBathrooms"),
            rentAmount: form.get("rentAmount"),
            securityDepositAmount: form.get("securityDepositAmount"),
            isOccupied: false,
            photos: imageUrls,
          },
          headers: defaultHeaders(isSignedIn),
        },
        {
          useCache: false,
          manual: true,
        }
      );
      console.log(property);
    } catch (error) {
      notify(error);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      toast(`Property ${data.data?.propertyName} saved`);
      setTimeout(() => {
        navigate("/properties");
      }, 1500);
    }
  }, [data, navigate]);

  useEffect(() => {
    notify(error);
  }, [error]);

  return (
    <Layout title="Property Detail">
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Paper>
            <Box component="form" onSubmit={handleSubmit} p={3}>
              <Typography variant="h6" gutterBottom>
                Property information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="propertyName"
                    name="propertyName"
                    label="Property name"
                    fullWidth
                    autoComplete="property-name"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={5} sm={2}>
                  <TextField
                    required
                    id="numberOfBedrooms"
                    name="numberOfBedrooms"
                    label="Bed rooms"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={5} sm={2}>
                  <TextField
                    required
                    id="numberOfBathrooms"
                    name="numberOfBathrooms"
                    label="Bath rooms"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    required
                    id="rentAmount"
                    name="rentAmount"
                    label="Rent amount"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={8} sm={5}>
                  <TextField
                    required
                    id="securityDepositAmount"
                    name="securityDepositAmount"
                    label="Security deposit amount"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="streetAddress"
                    name="streetAddress"
                    label="Street address"
                    fullWidth
                    autoComplete="street address"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="city"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="state"
                    name="state"
                    label="State/Province/Region"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zipCode"
                    name="zipCode"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="propertyType"
                    name="propertyType"
                    label="Property Type"
                    fullWidth
                    autoComplete="propertyType"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                    <Button variant="contained" type="submit">
                      <SaveIcon />
                      <Typography ml={2}>Save</Typography>
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={6}>
          <Paper>
            <Box p={3}>
              <Grid container>
                {photos.map((p, index) => {
                  return (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                      <Photo src={p.url} />
                    </Grid>
                  );
                })}
              </Grid>

              <Box pb={2}>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="files"
                  multiple
                  type="file"
                  onChange={handleSelectPhotos}
                />
                <label htmlFor="files">
                  <Button variant="contained" component="span">
                    <AddPhotoAlternateIcon />
                    <Typography ml={2}>Select photos</Typography>
                  </Button>
                </label>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Loading loading={loading} />
    </Layout>
  );
}

export default PropertyDetail;
