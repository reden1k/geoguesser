import React, { useEffect, useState } from "react";
import "./styles.scss";

const Timer = ({ gameStarted, onTimeUp }) => {
  const [time, setTime] = useState(10);

  useEffect(() => {
    let interval = null;

    if (gameStarted) {
      setTime(10);
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            if (onTimeUp) onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted, onTimeUp]);

  return <div className="timer">⏱️ {time} сек</div>;
};

export default Timer;
