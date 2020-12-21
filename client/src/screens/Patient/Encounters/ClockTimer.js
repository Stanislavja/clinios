import React, { useState, useEffect, useRef } from "react";

import { Box, Typography, Button } from "@material-ui/core";

const Clock = () => {
  const [seconds, setSeconds] = useState(0);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const interval = useRef(null);

  useEffect(() => () => {
    clearInterval(interval.current);
  }, []);

  const start = () => {
    setIsTimerOn(true);
    interval.current = setInterval(() => {
      setSeconds((prevState) => prevState + 1);
    }, 1000);
  };

  const reset = () => {
    setSeconds(0);
    clearInterval(interval.current);
  };

  const pause = () => {
    setIsTimerOn(false);
    clearInterval(interval.current);
  };

  const restart = () => {
    reset();
    start();
  };

  const pad = (val) => (val > 9 ? val : `0${val}`);

  const minutes = pad(Math.floor((seconds / 60) % 60));
  const hours = pad(Math.floor(minutes / 60));

  return (
    <>
      <Box pr={2} pl={2}>
        <Typography variant="body1">
          {hours}
          {" "}
          :
          {" "}
          {minutes}
          {" "}
          :
          {" "}
          {pad(seconds % 60)}
        </Typography>
      </Box>
      {
        isTimerOn
          ? <Button variant="text" onClick={() => pause()}>Pause</Button>
          : <Button variant="text" onClick={() => start()}>Start</Button>
      }
      <Button variant="text" onClick={() => reset()}>Reset</Button>
      <Button variant="text" onClick={() => restart()}>Restart</Button>
    </>
  );
};

export default Clock;
