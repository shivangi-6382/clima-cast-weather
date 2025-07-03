import { useState } from "react";
import SearchBox2 from "./SearchBox2";
import Info2 from "./Info2";
import "./WeatherApp2.css";
import Alert from '@mui/material/Alert';
 

export default function WeatherApp2() {


  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");


  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const API_URL = "https://api.openweathermap.org/data/2.5/forecast";
  

  //to get weather info
  const getWeatherInfo = async (city) => {
    try {
      const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      const jsonResponse = await response.json();

      const current = jsonResponse.list[0];
      const timestamp = Date.parse(current.dt_txt); // as string like "2025-07-01 12:00:00"

       
      const dateObj = new Date(timestamp); // no need to multiply by 1000 here
      const dtText = current.dt_txt; // "2025-07-01 12:00:00"
      const [rawDate, rawTime] = dtText.split(" ");


  
      const result = {
        currentCity: jsonResponse.city.name,
        current: {
          temp: current.main.temp,
          tempMin: current.main.temp_min,
          tempMax: current.main.temp_max,
          humidity: current.main.humidity,
          feelsLike: current.main.feels_like,
          weather: current.weather[0].description,
          wind: current.wind.speed,
          date: rawDate,
          time: rawTime
           
        },
        upcoming: [],
      };

      const forecastMap = new Map();
      jsonResponse.list.forEach((item) => {
        if (item.dt_txt.includes("12:00:00")) {
          const date = item.dt_txt.split(" ")[0];
          forecastMap.set(date, {
            date,
            temp: item.main.temp,
            weather: item.weather[0].main,
            icon: item.weather[0].icon,
          });
        }
      });

       
      
    result.upcoming = Array.from(forecastMap.values()).slice(0, 5);

      setWeatherData(result);
    } catch (error) {
         setError(<Alert severity="error">City Not Found.</Alert>)
         setWeatherData(null);
    
  }};



  return (
    <div className="weather-app">
      <SearchBox2 onSearch={getWeatherInfo} error={error} setError={setError}  />
      <Info2 data={weatherData} />
    </div>
  );
}
