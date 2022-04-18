import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase";
import { set, ref } from "firebase/database";

export default function TourCard(props) {
  const { uid, title, owner, city, country, image, poi } = props.tour;
  const navigate = useNavigate();
  const { tourId } = useParams();
  const [activeTour, setActiveTour] = useState(null);
  const pois = [];

  useEffect(() => {
    if (!activeTour) {
      const tourRef = db.ref("tours");
      tourRef.on("value", (snap) => {
        const tours = snap.val();
        if (tours !== null) {
          Object.keys(tours).forEach((uid) => {
            if (uid === tourId) {
              setActiveTour(tours[uid]);
            }
          });
        }
      });
    }
  }, []);

  function PoiButtons(props) {
    return (
      <>
        <Button size="small" onClick={() => handlePoiDetailsClick()}>
          View Details
        </Button>
        {activeTour && (
          <>
            <Button size="small" onClick={() => handleAddPoi()}>
              Add to Tour
            </Button>
            <Button onClick={() => navigate(-1)}> Finish </Button>
          </>
        )}
      </>
    );
  }

  function TourButtons(props) {
    return (
      <>
        <Button size="small" onClick={() => handleTourDetailsClick()}>
          View Tour
        </Button>
      </>
    );
  }

  function UsableButtons(props) {
    if (poi) {
      return <PoiButtons />;
    } else {
      return <TourButtons />;
    }
  }

  async function handleTourDetailsClick(props) {
    navigate(`/tour/${uid}`);
  }

  async function handlePoiDetailsClick(props) {
    navigate(`/poi/${uid}`);
  }

  async function handleAddPoi(props) {
    const poiUid = uid;

    const tourRef = db.ref("tours");
    await tourRef.once("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            set(ref(db, `tours/${uid}/pois/${poiUid}`), { poiUid });
          }
        });
      }
    });
  }

  async function handleUpdatePois() {
    const tourRef = db.ref("tours");
    tourRef.on("value", (snap) => {
      const tours = snap.val();
      if (tours !== null) {
        Object.keys(tours).forEach((uid) => {
          if (uid === tourId) {
            set(ref(db, `/tours/${uid}`), {
              uid: activeTour.uid,
              title: activeTour.title,
              city: activeTour.city,
              country: activeTour.country,
              owner: activeTour.owner,
              image: activeTour.image,
              pois: pois,
            });
          }
        });
      }
    });
    navigate("/tourlist");
  }

  return (
    <Card key={uid} sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt="tour image" />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {city}, {country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Tour Guide: {owner}
        </Typography>
      </CardContent>
      <CardActions>
        <UsableButtons />
      </CardActions>
    </Card>
  );
}
