import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';
import Suggestions from './Suggestions';

function Weather() {
  const [selectCity, setSelectCity] = useState('');
  const [info, setInfo] = useState({
    image: '',
    temperature: '',
    humidity: '',
    windSpeed: '',
    cityname: '',
  });

  const imageUrl = `./Asserts/${info.image}.png`;

  async function getWeatherData() {
    try {
      const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${selectCity}&appid=dc20c28362c7178c16c1296853385b46&units=metric`);

      const { main, wind } = res.data;
      setInfo({
        ...info,
        temperature: Math.round(main.temp),
        humidity: main.humidity,
        cityname: res.data.name,
        windSpeed: wind.speed,
        image: res.data.weather[0].main
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
    setSelectCity("")
  }

  // Set default values if cityname is empty and component initially renders
  React.useEffect(() => {
    if (info.cityname === "") {
      setInfo({
        ...info,
        temperature: "30.5",
        humidity: "56",
        cityname: "Gajwel",
        windSpeed: "42",
        image: "Clouds"
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once, on initial render

  return (
    <div className='container'>
      <div className='top-bar'>
        <input type='text' className='cityInput' placeholder='Where do you want to go..' value={selectCity} onChange={(e) => setSelectCity(e.target.value)} />
        <div className='search-icon' onClick={getWeatherData}>
          <img src='./Asserts/search.png' alt='search' />
        </div>
      </div>
      
      <div className='weather-image'>
        <img src={imageUrl} alt={imageUrl} />
      </div>
      <div className='weather-temp'>{info.temperature}°C</div>
      <div className='weather-location'>{info.cityname}</div>
      <div className='data-container'>
        <div className='element'>
          <img src='./Asserts/humidity.png' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{info.humidity}%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='element'>
          <img src='./Asserts/wind.png' className='icon' />
          <div className='data'>
            <div className='humidity-percent'>{info.windSpeed} km/hr</div>
            <div className='text'>Wind speed</div>
          </div>
        </div>
      </div>
      <div className='suggestions'>
        <Suggestions data={info}></Suggestions>
      </div>
    </div>
  );
}

export default Weather;
