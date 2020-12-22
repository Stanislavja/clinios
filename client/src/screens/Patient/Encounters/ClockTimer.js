import React, { useState, useEffect, useRef } from "react";

import {
  Box, Typography, Button, Grid,
} from "@material-ui/core";

const Clock = () => {
  const [seconds, setSeconds] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const interval = useRef(null);

  useEffect(() => () => {
    clearInterval(interval.current);
  }, []);

  const start = () => {
    setIsTimerOn(true);
    setShowReset(true);
    interval.current = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);
  };

  const reset = () => {
    setShowReset(false);
    setIsTimerOn(false);
    setSeconds(0);
    clearInterval(interval.current);
  };

  const pause = () => {
    setIsTimerOn(false);
    clearInterval(interval.current);
  };

  const pad = (val) => (val > 9 ? val : `0${val}`);

  const minutes = pad(Math.floor((seconds / 60) % 60));
  const hours = pad(Math.floor(seconds / 60 / 60));

  return (
    <Grid
      container
      alignItems="center"
    >
      <Box pr={1} pl={1}>
        <Typography variant="body1">
          {`${hours} : ${minutes} : ${pad(seconds % 60)}`}
        </Typography>
      </Box>
      {
        isTimerOn
          ? <Button variant="text" onClick={() => pause()}>Pause</Button>
          : <Button variant="text" onClick={() => start()}>Start</Button>
      }
      {
        showReset && (
          <Button variant="text" onClick={() => reset()}>Reset</Button>
        )
      }
    </Grid>
  );
};

export default Clock;
