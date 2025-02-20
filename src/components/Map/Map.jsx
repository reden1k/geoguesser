import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import haversine from "haversine-distance";
import "./styles.scss";

export default function YandexMap({ gameStarted, cityCoords }) {
  const [targetLocation, setTargetLocation] = useState([]);
  const [userGuess, setUserGuess] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (cityCoords) {
      setTargetLocation({ coords: cityCoords });
    }
  }, [gameStarted]);

  const handleClick = (e) => {
    if (gameStarted) {
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
    }
  };

  return (
    <div className="map">
      <YMaps
        query={{
          apikey: "b9c7647c-ab3b-4b02-aa3a-0198822dcc91",
          lang: "ru_RU",
          load: "package.full",
        }}
      >
        <Map
          defaultState={{
            center: [55.751244, 37.618423],
            zoom: 3,
            controls: [],
          }}
          options={{
            suppressMapOpenBlock: true,
            suppressObsoleteBrowserNotifier: true,
            yandexMapDisablePoiInteractivity: true,
            avoidFractionalZoom: false,
            suppressPanoramaOpen: true,
          }}
          width="400px"
          height="400px"
          onClick={handleClick}
        >
          {userGuess && <Placemark geometry={userGuess} />}
        </Map>
        {distance && !gameStarted && (
          <p>Расстояние до города: {(distance / 1000).toFixed(2)} км</p>
        )}
      </YMaps>
    </div>
  );
}
