import React, { useEffect, useState } from "react";
import "./css/style.css";

const Wheatherapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("Mumbai");

  const fetchapi = async () => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ed8712101a275be914e62dd090271022`;
    const response = await fetch(url);
    const resJson = await response.json();
    console.log(resJson);
    if (resJson.cod === "404" || search === "") {
      setCity(null);
    } else {
      setCity(resJson);
    }
  };

  useEffect(() => {
    fetchapi();
  }, [search]);

  return (
    <>
      <div className="box">
        <div className="inputData">
          <h2 id="inputText">Enter City :</h2>
          <input
            type="search"
            className="inputField"
            placeholder="Enter City Name"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>

        {!city ? (
          <>
            <p className="errorMes">No Data Found!!!</p>
          </>
        ) : (
          <div className="info">
            <h2 className="location">
              <i className="fas fa-street-view"></i>
              {city.name},<span id="country">{city.sys.country}</span>
            </h2>
            <h3 className="atmos">{city.weather[0].main}</h3>
            <div className="tempp">
              <h1>{city.main.temp}&#176; Cel</h1>
            </div>
            <div className="inside">
              <div className="temp">
                <span>Min</span>
                <h1>{city.main.temp_min}&#176;</h1>
              </div>
              <span>|</span>
              <div className="temp">
                <span>Max</span>
                <h1>{city.main.temp_max}&#176;</h1>
              </div>
            </div>
            <div className="inside">
              <div className="temp">
                <span>Humidity</span>
                <h1>{city.main.humidity}</h1>
              </div>
              <span>|</span>
              <div className="temp">
                <span>Speed</span>
                <h1>{city.wind.speed}km/h;</h1>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Wheatherapp;
