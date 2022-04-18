import React from "react";
import NavigationDrawer from "./navigationDrawer";
import makeStyles from "@mui/styles/makeStyles";
import TourList from "./tourList";
import Grid from "@mui/material/Grid";

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function ListPageTemplate({ props, title, action }) {
  const classes = useStyles();

  return (
    <>
      <NavigationDrawer title={title} />
      <Grid container className={classes.root}>
        <Grid item xs={12}></Grid>
        <Grid item container spacing={5}>
          <TourList action={action} props={props} />
        </Grid>
      </Grid>
    </>
  );
}
export default ListPageTemplate;
