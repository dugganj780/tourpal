import React, { useRef, useState } from "react";
import Paper from "@mui/material/Paper";
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { db, auth, storage } from "../firebase";
import { set, ref } from "firebase/database";
import { ref as sRef } from "firebase/storage";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import CircularProgress from "@mui/material/CircularProgress";

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

    //height: "70vh",
    //width: "50%",
    margin: "20px auto",
  },
});

export default function CreatePoiForm() {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [owner, setOwner] = useState("");
  const [lat, setLat] = useState(0.0);
  const [lng, setLng] = useState(0.0);
  const [image, setImage] = useState("");
  const [recording, setRecording] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [audioUploaded, setAudioUploaded] = useState(false);
  const [imageProgress, setImageProgress] = useState(0);
  const [audioProgress, setAudioProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const uid = uuidv4();
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

  const [pois, setPois] = useState([]);

  //const navigate = useNavigate();
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

        setImageProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImageUploaded(true);
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

        setAudioProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setAudioUploaded(true);
          setRecording(url);
        });
      }
    );
  }

  async function handleCreateTourClick(e) {
    e.preventDefault();

    if (!title || !owner || !city || !lat || !lng) {
      setErrorMessage("Field Missing. Please check your entries and update.");
    } else if (isNaN(+lat) || isNaN(+lng)) {
      setErrorMessage(
        "You must enter a numerical value for Latitude and Longitude"
      );
    } else if (!imageUploaded) {
      setErrorMessage("You must upload an image file");
    } else if (!audioUploaded) {
      setErrorMessage("You must upload an audio file");
    } else {
      const poi = {
        uid: uid,
        poi: true,
        title: title,
        owner: owner,
        ownerid: auth.currentUser.uid,
        city: city,
        lat: lat,
        lng: lng,
        image: image,
        recording: recording,
      };
      setPois((pois) => {
        return [...pois, poi];
      });

      set(ref(db, `/pois/${uid}`), {
        uid: uid,
        poi: true,
        title: title,
        owner: owner,
        ownerid: auth.currentUser.uid,
        city: city,
        lat: lat,
        lng: lng,
        image: image,
        recording: recording,
      });

      navigate("/poilist");
    }
  }

  return (
    <Paper className={classes.paper}>
      <Typography variant="h5">Create a Destination</Typography>
      <Stack spacing={2}>
        <TextField
          id="title"
          label="Title"
          variant="standard"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          id="city"
          label="City"
          variant="standard"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
        />
        <TextField
          id="owner"
          label="Tour Guide"
          variant="standard"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          fullWidth
        />
        <TextField
          id="lat"
          label="Latittude"
          variant="standard"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          fullWidth
        />
        <TextField
          id="lng"
          label="Longitude"
          variant="standard"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          fullWidth
        />
        <form onSubmit={uploadImageHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload Image</button>
        </form>
        <CircularProgress variant="determinate" value={imageProgress} />

        <form onSubmit={uploadAudioHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload Recording</button>
        </form>
        <CircularProgress variant="determinate" value={audioProgress} />
        <Typography color={"red"}>{errorMessage}</Typography>
        <Button variant="contained" onClick={handleCreateTourClick} fullWidth>
          Create Destination
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
      </Stack>
    </Paper>
  );
}
