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
    margin: "20px auto",
  },
});

export default function UpdateTourForm(props) {
  const { uid, title, city, country, owner, description, pois } = props.props;
  const [activeTour, setActiveTour] = useState(null);
  const [newTitle, setTitle] = useState(title);
  const [newCity, setCity] = useState(city);
  const [newCountry, setCountry] = useState(country);
  const [newOwner, setOwner] = useState(owner);
  const [newDescription, setDescription] = useState(description);
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
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

  const [tours, setTours] = useState([]);

  //const navigate = useNavigate();
  const classes = useStyles();

  const uploadHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  function uploadFiles(file) {
    if (!file) return;

    const storageRef = sRef(storage, `tourImages/${datetime + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url);
        });
      }
    );
  }

  async function handleUpdateTourClick(e) {
    e.preventDefault();

    const tour = {
      uid: uid,
      title: newTitle,
      city: newCity,
      country: newCountry,
      owner: newOwner,
      description: newDescription,
      image: image,
      pois: pois,
    };

    setTours((tours) => {
      return [...tours, tour];
    });

    /*
    const tourRef = db.ref("tours");
    tourRef.push(tour);
    */

    set(ref(db, `/tours/${uid}`), {
      uid: uid,
      title: newTitle,
      city: newCity,
      country: newCountry,
      owner: newOwner,
      description: newDescription,
      image: image,
      pois: pois,
    });
    navigate(-1);
  }

  /*
  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email.current.value, password.current.value);
      navigate("/tourlist");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  }
  */

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
          id="country"
          label="Country"
          variant="standard"
          value={newCountry}
          onChange={(e) => setCountry(e.target.value)}
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
          id="description"
          label="Description"
          variant="standard"
          value={newDescription}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
        />
        <Button variant="contained" onClick={handleUpdateTourClick} fullWidth>
          Create Tour
        </Button>
        <Button variant="contained" fullWidth>
          Cancel
        </Button>
        <form onSubmit={uploadHandler}>
          <input type="file" className="input" />
          <button type="submit">Upload Image</button>
        </form>
      </Stack>
    </Paper>
  );
}
