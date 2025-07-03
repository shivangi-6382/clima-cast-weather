import { useState } from "react";
import "./SearchBox2.css";
import { Alert } from "@mui/material";

export default function SearchBox2({ onSearch ,error,setError}) {
  const [city, setCity] = useState("");
   

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
      setCity(""); // clear input
    }else{
        setError(<Alert severity="error">Please enter valid City.</Alert>);
    }
  };


  return (
    <div className="search-box">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => {setCity(e.target.value);
            setError(""); }}
        />
        

        <button type="submit" className="btn">Search</button>
        
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
