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

export default function CreatePoiText() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" align="center">
        Destination Creation
      </Typography>
      <Typography variant="body2" gutterBottom>
        To create a destination simply input the details on the page.
      </Typography>
      <Typography variant="body2">
        You will also need to upload an image file and an audio file. Please
        wait until the files have finished uploading before you click CREATE
        TOUR.
      </Typography>
    </Paper>
  );
}
