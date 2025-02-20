import React, { useState, useEffect, useRef } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import haversine from "haversine-distance";
import "./styles.scss";

const getRandomCoords = () => {
  const locations = [
    { name: "Москва", coords: [55.751244, 37.618423] },
    { name: "Санкт-Петербург", coords: [59.9342802, 30.3350986] },
    { name: "Казань", coords: [55.796391, 49.108891] },
    { name: "Новосибирск", coords: [55.0084, 82.9357] },
  ];
  return locations[Math.floor(Math.random() * locations.length)];
};

export default function YandexMap() {
  const [targetLocation, setTargetLocation] = useState(getRandomCoords());
  const [userGuess, setUserGuess] = useState(null);
  const [distance, setDistance] = useState(null);
  const panoramaRef = useRef(null);

  useEffect(() => {
    if (!window.ymaps) {
      console.error("Yandex Maps API не загружен!");
      return;
    }
  
    window.ymaps.ready(() => {
      console.log("Yandex Maps API загружен!");
  
      window.ymaps.panorama.locate(targetLocation.coords).then((panoramas) => {
        console.log("Найденные панорамы:", panoramas);
        if (panoramas.length > 0) {
          document.getElementById("yandex-panorama").innerHTML = "";
          const player = new window.ymaps.panorama.Player(
            "yandex-panorama",
            panoramas[0],
            { direction: [256, 16] }
          );
          panoramaRef.current = player;
        } else {
          console.warn("Панорамы не найдены для этой локации!");
        }
      }).catch((err) => console.error("Ошибка загрузки панорам:", err));
    });
  }, [targetLocation]);
  

  const handleClick = (e) => {
    const coords = e.get("coords");
    setUserGuess(coords);

    const distanceMeters = haversine(
      {
        latitude: targetLocation.coords[0],
        longitude: targetLocation.coords[1],
      },
      { latitude: coords[0], longitude: coords[1] }
    );

    setDistance(distanceMeters);
  };

  return (
    <div className="map">
      <YMaps query={{ apikey: "b9c7647c-ab3b-4b02-aa3a-0198822dcc91", lang: "ru_RU", load: "package.full" }}>
        <div id="panorama" style={{ width: "100%"}}></div>
        <Map
          defaultState={{ center: [55.751244, 37.618423], zoom: 3 }}
          width="400px"
          height="400px"
          onClick={handleClick}
        >
          {userGuess && <Placemark geometry={userGuess} />}
        </Map>
        {distance && (
          <p>Расстояние до цели: {(distance / 1000).toFixed(2)} км</p>
        )}
      </YMaps>
    </div>
  );
}
