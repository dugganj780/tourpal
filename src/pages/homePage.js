import React from "react";
import Image from "../images/home_image.jpg";
import LoginForm from "../components/loginForm";
import Grid from "@mui/material/Grid";
import WelcomeCard from "../components/welcomeCard";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    backgroundImage: `url(${Image})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
});

const HomePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs={1} />

        <Grid item xs={4}>
          <WelcomeCard />
        </Grid>
        <Grid item xs={2} />

        <Grid item xs={4} align="center">
          <LoginForm />
        </Grid>
        <Grid xs={1} />
      </Grid>
    </div>
  );
};

export default HomePage;
