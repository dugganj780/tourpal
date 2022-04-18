import { makeStyles } from "@mui/styles";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import MediaPlayer from "./mediaPlayer";

const useStyles = makeStyles({
  map: {
    width: "100%",
    height: "100%",
  },
  card: {
    width: "100%",
    height: "90vh",
    margin: "10px",
  },
});

function MapViewPoi(props) {
  const { uid, title, lat, lng, poi } = props.props.props;
  const classes = useStyles();
  const [activePoi, setActivePoi] = useState(null);

  function handleClick(e) {
    e.preventDefault();
    setActivePoi(props.props);
  }

  return (
    <Card className={classes.card}>
      <MapContainer className={classes.map} center={[lat, lng]} zoom={20}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          key={uid}
          position={[lat, lng]}
          eventHandlers={{
            click: (e) => {
              setActivePoi(props.props);
            },
          }}
        />
        {activePoi && (
          <Popup
            position={[lat, lng]}
            onClose={() => {
              setActivePoi(null);
            }}
          >
            <>
              <MediaPlayer props={props} />
            </>
          </Popup>
        )}
      </MapContainer>
    </Card>
  );
}

export default MapViewPoi;
