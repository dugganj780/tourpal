import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "90vh",
    margin: "10px",
    alignContent: "center",
    justifyContent: "center",
  },
});

function NoPoisCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography gutterBottom variant="h2" component="div">
          Add Destinations to view map{" "}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NoPoisCard;
