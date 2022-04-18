import React from "react";
import CreatePoiForm from "../components/createPoiForm";
import Grid from "@mui/material/Grid";
import NavigationDrawer from "../components/navigationDrawer";
import CreatePoiText from "../components/createPoiText";

const CreatePoiPage = () => {
  return (
    <>
      <NavigationDrawer title="Create a Destination" />
      <Grid container justify="center" spacing={2}>
        <Grid xs={2} />
        <Grid item xs={4} align="center">
          <CreatePoiText />
        </Grid>
        <Grid item xs={4} align="center">
          <CreatePoiForm />
        </Grid>
        <Grid xs={2} />
      </Grid>
    </>
  );
};

export default CreatePoiPage;
