import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import { useEffect, useState, useRef } from "react";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(true);
  //weather icon
  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02d": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Enter a city name first");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      //if response is
      if (!response.ok) {
        setWeatherData(false);
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        windSpeed: data.wind.speed,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
    }
  };
  useEffect(() => {
    search("Dhaka");
    inputRef.current.value = "";
  }, []);
  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="search here" />
        <img
          src={search_icon}
          alt="search_Icon"
          onClick={() => {
            search(inputRef.current.value);
            inputRef.current.value = "";
          }}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="clear_Icon" className="clear-icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humadity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;
