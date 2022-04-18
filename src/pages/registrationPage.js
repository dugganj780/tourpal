import React from "react";
import Grid from "@mui/material/Grid";
import RegistrationForm from "../components/registrationForm";

const RegistrationPage = () => {
  return (
    <Grid container justify="center">
      <Grid xs={4} />
      <Grid item xs={4} align="center">
        <RegistrationForm />
      </Grid>
      <Grid xs={4} />
    </Grid>
  );
};

export default RegistrationPage;
