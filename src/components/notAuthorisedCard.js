import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

export default function NotAuthorisedCard() {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Paper className={classes.paper}>
      <Typography variant="h2" align="center" color={"red"}>
        YOU ARE NOT AUTHORISED TO VIEW THIS PAGE{" "}
      </Typography>
      <Button
        onClick={() => navigate("/tourlist")}
        variant="contained"
        color="warning"
      >
        Return to Tours
      </Button>
    </Paper>
  );
}
