import React, { useState } from 'react';

import IconSpeed from '../assets/img/speed.svg'
import IconClouds from '../assets/img/clouds.svg'
import IconTemp from '../assets/img/temp.svg'
import IconHumidity from '../assets/img/humidity.svg'

function BoxWeather({ weather }) {
  const [tempCelcius, setTempCelcius] = useState(true);

  const convertTemp = (temp) => {
    if (tempCelcius) return parseFloat(temp - 273.15).toFixed(0);
    return parseFloat(((temp - 273.15) * 9) / 5 + 32).toFixed(0);
  };
  const isCold = (temp) => {
    let tempCovert = parseFloat(temp - 273.15).toFixed(0);
    if (tempCovert > 16) return 'bg-cold';
    return 'bg-hot';
  };

  return (
    <div className={isCold(weather.main.temp)}>
      <div className="content-weather">
        <h4 className="title-weather">
          {weather.name} {weather.sys.country}
        </h4>
        <div className="weather-box">
          <p className="temp">
            {convertTemp(weather.main.temp)} {tempCelcius ? 'C°' : 'F°'}
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon-temp"
          />
          <p className="temp-description">{weather.weather[0].description}</p>
          <button className="btn" onClick={() => setTempCelcius(!tempCelcius)}>
            {tempCelcius ? 'C° to F°' : 'F° to C°'}
          </button>
          <div className="box-weather-description">
            <div className="weather-description">
              <img src={IconSpeed} alt="icon-speed"/>
              <p>{weather.wind.speed} m/s</p>
            </div>
            <div className="weather-description">
              <img src={IconClouds} alt="icon-Clouds"/>
              <p>{weather.clouds.all} %</p>
            </div>
            <div className="weather-description">
              <img src={IconTemp} alt="icon-Temp"/>
              <p>{weather.main.pressure} mb</p>
            </div>
            <div className="weather-description">
              <img src={IconHumidity} alt="icon-Humidity"/>
              <p>{weather.main.humidity} %</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxWeather;
