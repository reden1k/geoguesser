import React, { useState } from "react";
import Timer from "./components/Timer/Timer";
import Map from "./components/Map/Map";
import Button from "./components/Button/Button";
import "./App.scss";

const cities = [
  { name: "Москва", coords: [55.751244, 37.618423] },
  { name: "Санкт-Петербург", coords: [59.9342802, 30.3350986] },
  { name: "Казань", coords: [55.796391, 49.108891] },
  { name: "Новосибирск", coords: [55.0084, 82.9357] },
];

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [city, setCity] = useState(null);

  const startGame = () => {
    const randomCity = cities[Math.floor(Math.random() * cities.length)];
    setCity(randomCity);
    setGameStarted(true);
  };

  const stopGame = () => {
    setGameStarted(false);
    setCity(null);
  };

  return (
    <div className="app">
      <div className="top-bar">
        <div className="city">{gameStarted ? city?.name : "Город появится здесь"}</div>
        <Timer gameStarted={gameStarted} onTimeUp={stopGame}/>
      </div>

      <Map gameStarted={gameStarted} cityCoords={city?.coords} />

      <div className="buttons">
        <Button onClick={startGame} text="Начать игру" disabled={gameStarted} />
        <Button onClick={stopGame} text="Остановить игру" disabled={!gameStarted} />
      </div>
    </div>
  );
};

export default App;
