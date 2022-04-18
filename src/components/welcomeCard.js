import React from "react";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    spacing: 2,
    direction: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardaction: {
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    padding: 20,
    height: "100%",
    width: "100%",
    margin: "20px auto",
  },
});

export default function WelcomeCard() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" align="center">
        TourPal
      </Typography>
      <Typography variant="subtitle1" gutterBottom align="center">
        An app to help you build walking tours.
      </Typography>
      <Typography variant="body2" gutterBottom>
        Welcome to TourPal! With this web app you can create walking tours that
        tourists can take using the TourPal mobile app. Share your knowledge!
      </Typography>
      <Typography variant="body2">
        You can register or login on this page. Once you have set up your
        account, you can create a tour of anywhere in the world!
      </Typography>
    </Paper>
  );
}
