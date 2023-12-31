import React, { useState, useEffect } from "react";
import { LinearProgress, Typography } from "@mui/material";

const EstimatedTimeProgress = ({ text, totalTime }) => {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setElapsedTime(0);
  }, [totalTime]);

  useEffect(() => {
    let interval;

    //console.log("elapsedTime " + elapsedTime);
    //console.log("totalTime " + totalTime);

    // Start a timer to update elapsed time every second
    if (elapsedTime < totalTime) {
      interval = setTimeout(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    // Clear the timer when the component unmounts
    return () => clearTimeout(interval);
  }, [elapsedTime, totalTime]);

  const remainingTime = totalTime - elapsedTime;
  const progressPercentage = (elapsedTime / totalTime) * 100;

  return (
    <div
      style={{
        marginTop: "10px",
        marginRight: "20px",
        marginLeft: "10px",
        width: "1170px",
      }}
    >
      <Typography variant="h8">
        {text}: {formatTime(remainingTime)}
      </Typography>
      <LinearProgress variant="determinate" value={progressPercentage} />
    </div>
  );
};

// Function to format time in HH:MM:SS format
const formatTime = (timeInSeconds) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export default EstimatedTimeProgress;
