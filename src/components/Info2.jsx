import "./Info2.css";
import { useEffect } from 'react';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'; // fallback
import AirIcon from '@mui/icons-material/Air';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';



export default function Info2({ data }) {

   const dayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  function getWeatherIcon(weather) {
  const w = weather.toLowerCase();

  
  
  const iconProps = {
    sx: {
      mr: 1,
      fontSize: 180,  
      verticalAlign: "middle",
    },
  };



  if (w.includes("clear")) return <WbSunnyIcon {...iconProps} sx={{ ...iconProps.sx, color: "#fbc02d" }} />;
  if (w.includes("cloud")) return <CloudIcon {...iconProps} sx={{ ...iconProps.sx, color: "#90a4ae" }} />;
  if (w.includes("rain")) return <ThunderstormIcon {...iconProps} sx={{ ...iconProps.sx, color: "#1565c0" }} />;
  if (w.includes("snow")) return <AcUnitIcon {...iconProps} sx={{ ...iconProps.sx, color: "#81d4fa" }} />;
  return <HelpOutlineIcon {...iconProps} />;
}

 
   

useEffect(() => {
    if (!data) return;

    const weather = data.current.weather.toLowerCase();
    const temp = data.current.temp;

    let className = "default-bg";

    //for background
    if (weather.includes("rain")) className = "rain-bg";
    else if (weather.includes("clear")) className = "clear-bg";
    else if (temp < 10) className = "cold-bg";
    else if (temp > 35) className = "hot-bg";

    document.body.className = className;

    // Cleanup if component unmounts
    return () => {
      document.body.className = "";
    };
  }, [data]);


    
  if (!data) {
    return <p className="no-data">Search for a city to view weather info.</p>;
  }

  return (
 <div className="weather-info">
      <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center",color:"white" }}>{getWeatherIcon(data.current.weather)}</h1>
      <div className="current">
         <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center",color:"white" }}>{data.current.temp}°C</h1>
        <h1 style={{color:"#0d47a1",fontSize:"3rem"}}><LocationOnIcon sx={{ fontSize:50 , mr: 1 }}/>{data.currentCity}</h1>
        <p style={{ fontSize: "1rem", color: "white" }}><AccessTimeIcon sx={{ fontSize: 20, mr: 1 }} />{data.current.date} | {data.current.time}</p>
        <p style={{fontSize:"1.2rem",color:"white"}}>{data.current.weather}</p>
        
        
        <h2>Today's Highlights</h2>
        <div className="newb">
        <div className="forecast-day">
             <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>Feels Like: </p>
             <p><WbSunnyIcon sx={{ fontSize: 60 }} />{data.current.feelsLike}°C</p>
        </div>
        <div className="forecast-day">
             <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>Humidity: </p>
            
        <p><DeviceThermostatIcon sx={{ fontSize: 60 }}  /> {data.current.humidity}%</p>
        </div>
        <div className="forecast-day">
             <p style={{ fontWeight: "bold", fontSize: "1.4rem" }}>Wind: </p>
             <p><AirIcon sx={{ fontSize: 60 }}/>{data.current.wind} m/s</p>
        </div>
        </div>
         
      </div>

      <h2>Upcoming Weather</h2>
      <div className="forecast">
        {data.upcoming.map((day, i) => (
          <div className="forecast-day" key={i}>
            <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{day.date}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.weather}
            />
            <p>{day.temp}°C</p>
            <p>{day.weather}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
