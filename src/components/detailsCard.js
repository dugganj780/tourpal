import React from "react";
import { makeStyles } from "@mui/styles";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { ref as sRef, deleteObject } from "firebase/storage";

const useStyles = makeStyles({
  card: {
    width: "100%",
    height: "65vh",
    margin: "10px",
  },
});

function DetailsCard(props) {
  const classes = useStyles();
  const {
    uid,
    title,
    owner,
    city,
    country,
    description,
    image,
    lat,
    lng,
    poi,
  } = props.props;
  const navigate = useNavigate();

  function PoiButtons(props) {
    return (
      <>
        <Button variant="outlined">Add to Tour</Button>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button variant="outlined" onClick={handleUpdatePoiClick}>
          Update Destination
        </Button>
        <Button variant="outlined" onClick={handleDeletePoi}>
          Delete
        </Button>
      </>
    );
  }

  function TourButtons(props) {
    return (
      <>
        <Button variant="outlined" onClick={handleTourDetailsClick}>
          Add Destinations
        </Button>
        <Button variant="outlined" onClick={handleUpdateTourClick}>
          Update Tour
        </Button>
        <Button variant="outlined" onClick={handleDeleteTour}>
          Delete
        </Button>
      </>
    );
  }

  function ShowLatLng(props) {
    if (poi) {
      return (
        <>
          <Typography variant="body2" color="text.secondary">
            Latitude: {lat}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Longitude: {lng}
          </Typography>
        </>
      );
    } else {
      return (
        <Typography variant="h6" color="text.secondary">
          Description: {description}
        </Typography>
      );
    }
  }

  function UsableButtons(props) {
    if (poi) {
      return <PoiButtons />;
    } else {
      return <TourButtons />;
    }
  }

  async function handleTourDetailsClick() {
    navigate(`/poilist/${uid}`);
  }

  async function handleUpdateTourClick(props) {
    navigate(`/updatetour/${uid}`);
  }

  async function handleUpdatePoiClick(props) {
    navigate(`/updatepoi/${uid}`);
  }

  function handleDeleteTour(props) {
    const tourId = uid;

    const tourRef = db.ref("tours");
    tourRef.once("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            const imageRef = sRef(storage, tours[uid].image);
            deleteObject(imageRef)
              .then(() => {
                // File deleted successfully
              })
              .catch((error) => {
                // Uh-oh, an error occurred!
              });

            db.ref(`/tours/${uid}`).remove();
            navigate("/tourlist");
          } else {
            console.log("Could not delete tour");
          }
        });
      }
    });
  }

  function handleDeletePoi(props) {
    const poiId = uid;

    const poiRef = db.ref("pois");
    poiRef.once("value", (snap) => {
      const pois = snap.val();
      if (pois !== null) {
        Object.keys(pois).forEach((uid) => {
          if (uid === poiId) {
            const imageRef = sRef(storage, pois[uid].image);
            deleteObject(imageRef)
              .then(() => {})
              .catch((error) => {});
            const recordingRef = sRef(storage, pois[uid].recording);
            deleteObject(recordingRef)
              .then(() => {})
              .catch((error) => {});

            db.ref(`/pois/${uid}`).remove();
            navigate("/poilist");
          } else {
            console.log("Could not delete POI");
          }
        });
      }
    });
  }

  return (
    <Card className={classes.card}>
      <CardMedia component="img" height="33%" image={image} alt="tour image" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Location: {city}, {country}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Tour Guide: {owner}
        </Typography>
        <ShowLatLng />
      </CardContent>
      <CardActions>
        <UsableButtons />
      </CardActions>
    </Card>
  );
}

export default DetailsCard;
