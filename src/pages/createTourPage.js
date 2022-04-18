import React from "react";
import CreateTourForm from "../components/createTourForm";
import Grid from "@mui/material/Grid";
import NavigationDrawer from "../components/navigationDrawer";
import CreateTourText from "../components/createTourText";

const CreateTourPage = () => {
  return (
    <>
      <NavigationDrawer title="Create a Tour" />
      <Grid container justify="center" spacing={2}>
        <Grid xs={2} />
        <Grid item xs={4} align="center">
          <CreateTourText />
        </Grid>
        <Grid item xs={4} align="center">
          <CreateTourForm />
        </Grid>
        <Grid xs={2} />
      </Grid>
    </>
  );
};

export default CreateTourPage;
