import { makeStyles } from "@mui/styles";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: "100%",
    height: "90vh",
    margin: "10px",
    alignSelf: "center",
  },
});

function MapViewTour(props) {
  const { uid, title, lat, lng, pois } = props.props.props;
  const classes = useStyles();
  const [activePoi, setActivePoi] = useState(null);
  const [foundPois, setFoundPois] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPois = async () => {
      const poiRef = db.ref("pois");
      poiRef.on("value", (snapshot) => {
        const poi = snapshot.val();
        const dbPois = [];
        const keys = Object.keys(pois);
        for (let id in poi) {
          keys.forEach((key, index) => {
            if (key === id) {
              dbPois.push(poi[id]);
            }
          });
        }
        setFoundPois(dbPois);
      });
    };
    getPois();
  }, []);

  function handleClick(props) {
    setActivePoi(props);
  }

  return (
    <Card className={classes.card}>
      {foundPois[0] && (
        <MapContainer
          className={classes.map}
          center={[parseFloat(foundPois[0].lat), parseFloat(foundPois[0].lng)]}
          zoom={20}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {foundPois.map((poi) => {
            return (
              <>
                <Marker
                  key={poi.uid}
                  position={[poi.lat, poi.lng]}
                  eventHandlers={{
                    click: (e) => {
                      handleClick(poi);
                    },
                  }}
                />
                ;
              </>
            );
          })}
          {activePoi && (
            <Popup
              position={[activePoi.lat, activePoi.lng]}
              onClose={() => {
                setActivePoi(null);
              }}
            >
              <>
                <Typography>{activePoi.title}</Typography>
                <Button
                  size="small"
                  onClick={() => navigate(`/poi/${activePoi.uid}`)}
                >
                  Go to Destination
                </Button>
              </>
            </Popup>
          )}
        </MapContainer>
      )}
    </Card>
  );
}

export default MapViewTour;
