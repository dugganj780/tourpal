import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateTourForm from "../components/updateTourForm";
import Grid from "@mui/material/Grid";
import NavigationDrawer from "../components/navigationDrawer";
import { db } from "../firebase";

const UpdateTourPage = () => {
  const { tourId } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            setTour(tours[uid]);
          }
        });
      }
    });
  }, []);

  return (
    <>
      {tour && (
        <>
          <NavigationDrawer title="Update Tour" />
          <Grid container justify="center">
            <Grid xs={4} />
            <Grid item xs={4} align="center">
              <UpdateTourForm props={tour} />
            </Grid>
            <Grid xs={4} />
          </Grid>
        </>
      )}
    </>
  );
};

export default UpdateTourPage;
