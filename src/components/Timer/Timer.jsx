import React, { useEffect, useState } from "react";
import "./styles.scss";

const Timer = ({ gameStarted }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (gameStarted) {
      setTime(0); 
      interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [gameStarted]);

  return <div className="timer">⏱️ {time} сек</div>;
};

export default Timer;
