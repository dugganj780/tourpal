import React, { useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import Slider from "@mui/material/Slider";

const useStyles = makeStyles({
  card: {
    width: "100%",
  },
  slider: {
    marginLeft: 5,
    marginRight: 5,
  },
});

export default function MediaPlayer(props) {
  const { title, city, recording } = props.props.props.props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [curentTime, setCurrentTime] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const theme = useTheme();
  const player = useRef();
  const classes = useStyles();

  const playAudio = () => {
    const audio = player.current;
    setIsPlaying(true);
    audio.volume = 1;
    audio.play();
  };

  const pauseAudio = () => {
    const audio = player.current;
    setIsPlaying(false);
    audio.pause();
  };

  const skipForward = () => {
    const audio = player.current;
    audio.currentTime = audio.currentTime + 10;
  };

  const skipBack = () => {
    const audio = player.current;
    audio.currentTime = audio.currentTime - 10;
  };

  const audioFunction = () => {
    if (!isPlaying) {
      playAudio();
    } else {
      pauseAudio();
    }
  };

  function PlayPauseIcon(props) {
    if (!isPlaying) {
      return <PlayArrowIcon sx={{ height: 38, width: 38 }} />;
    } else {
      return <PauseIcon sx={{ height: 38, width: 38 }} />;
    }
  }

  function getCurrentDuration(e) {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  }

  function onChange(e) {
    const audio = player.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  }

  return (
    <>
      <Card sx={{ display: "flex" }} className={classes.card}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {title}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {city}
            </Typography>
          </CardContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              pl: 1,
              pb: 1,
            }}
          >
            <IconButton aria-label="previous" onClick={skipBack}>
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton aria-label="play/pause" onClick={audioFunction}>
              <PlayPauseIcon />
            </IconButton>
            <IconButton aria-label="next" onClick={skipForward}>
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>

            <audio
              src={recording}
              ref={player}
              onLoadedData={(e) => {
                setDuration(e.currentTarget.duration.toFixed(2));
              }}
              onTimeUpdate={getCurrentDuration}
            ></audio>
          </Box>
          <Slider
            className={classes.slider}
            size="small"
            aria-label="Small"
            valueLabelDisplay="auto"
            value={percentage}
            onChange={onChange}
          />
        </Box>
      </Card>
    </>
  );
}
