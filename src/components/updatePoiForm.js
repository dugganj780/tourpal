import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { set, ref } from "firebase/database";
import { ref as sRef } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
    height: "70vh",
    width: 280,
    margin: "20px auto",
  },
});

export default function UpdatePoiForm(props) {
  const { uid, title, city, owner, ownerid, lat, lng, image, recording } =
    props.props;
  const [newTitle, setTitle] = useState(title);
  const [newCity, setCity] = useState(city);
  const [newOwner, setOwner] = useState(owner);
  const [newLat, setLat] = useState(lat);
  const [newLng, setLng] = useState(lng);
  const [newImage, setImage] = useState(image);
  const [newRecording, setRecording] = useState(recording);
  const navigate = useNavigate();
  var currentdate = new Date();

  var datetime =
    currentdate.getDate() +
    "." +
    (currentdate.getMonth() + 1) +
    "." +
    currentdate.getFullYear() +
    ", " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    "_";

  const classes = useStyles();

  const uploadImageHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadImageFile(file);
  };

  const uploadAudioHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadAudioFile(file);
  };

  function uploadImageFile(file) {
    if (!file) return;

    const storageRef = sRef(storage, `poiImages/${datetime + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        //setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
        });
      }
    );
  }

  function uploadAudioFile(file) {
    if (!file) return;

    const storageRef = sRef(storage, `poiAudio/${datetime + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        //setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setRecording(url);
        });
      }
    );
  }

  async function handleUpdatePoiClick(e) {
    e.preventDefault();

    const poi = {
      uid: uid,
      poi: true,
      title: newTitle,
      owner: newOwner,
      ownerid: ownerid,
      city: newCity,
      lat: newLat,
      lng: newLng,
      image: newImage,
      recording: newRecording,
    };

    set(ref(db, `/pois/${uid}`), {
      uid: uid,
      poi: true,
      title: newTitle,
      owner: newOwner,
      ownerid: ownerid,
      city: newCity,
      lat: newLat,
      lng: newLng,
      image: newImage,
      recording: newRecording,
    });

    navigate(-1);
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Create a Tour</Typography>
      <Stack spacing={2}>
        <TextField
          id="title"
          label="Title"
          variant="standard"
          type="text"
          value={newTitle}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          id="city"
          label="City"
          variant="standard"
          value={newCity}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <TextField
          id="owner"
          label="Tour Guide"
          variant="standard"
          value={newOwner}
          onChange={(e) => setOwner(e.target.value)}
          fullWidth
        />
        <TextField
          id="lat"
          label="Latittude"
          variant="standard"
          value={newLat}
          onChange={(e) => setLat(e.target.value)}
          fullWidth
        />
        <TextField
          id="lng"
          label="Longitude"
          variant="standard"
          value={newLng}
          onChange={(e) => setLng(e.target.value)}
          fullWidth
        />
        <form onSubmit={uploadImageHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload Image</button>
        </form>
        <form onSubmit={uploadAudioHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload Recording</button>
        </form>
        <Button variant="contained" onClick={handleUpdatePoiClick} fullWidth>
          Update Destination
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}
