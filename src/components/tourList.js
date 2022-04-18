import React from "react";
import Tour from "./tourCard";
import Grid from "@mui/material/Grid";

const TourList = ({ props, action }) => {
  let tourCards = props.map((m) => (
    <Grid key={m.uid} item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Tour key={m.uid} tour={m} action={action} />
    </Grid>
  ));
  return tourCards;
};

export default TourList;
