import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import BoxWeather from './components/BoxWeather';
import Loader from './components/Loader';

function App() {
  const apiKey = '96675e1c8dbbf99d321bbdf2ba16fb63';
  const urlBase = 'https://api.openweathermap.org/data/2.5/';

  const [weather, setWeather] = useState({});
  const [coords, setCoords] = useState({});

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          setCoords({
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }),
        onError
      );
    }
  }, []);
  const onError = async () => {
    const key = '4adc08e53ddf42ff9ed2388f8e8bf43d';
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${key}`;
    let res = await axios.get(url);
    setCoords({
      lat: res.data.latitude,
      long: res.data.longitude,
    });
  };
  useEffect(() => {
    const getWeather = async (coords) => {
      let url = `${urlBase}weather?lat=${coords.lat}&lon=${coords.long}&appid=${apiKey}`;
      let res = await axios.get(url);
      setWeather(res.data);
    };
    if (coords.lat) getWeather(coords);
  }, [coords]);

  return (
    <div className="contain">
      <div className="app-clima">
        {weather.name ? <BoxWeather weather={weather} /> : <Loader />}
      </div>
    </div>
  );
}

export default App;
