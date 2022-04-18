import React, { useRef, useState } from "react";
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

export default function CreateTourText() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" align="center">
        Tour Creation
      </Typography>
      <Typography variant="body2" gutterBottom>
        To create a tour simply input the details on the page.
      </Typography>
      <Typography variant="body2">
        You will also need to upload an image file. Please wait until the file
        has finished uploading before you click CREATE TOUR.
      </Typography>
    </Paper>
  );
}
