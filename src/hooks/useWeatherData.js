"use client";

import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const APP_ID = process.env.NEXT_PUBLIC_WEATHER_APP_ID;

const useWeatherData = () => {
  const [data, setData] = useState(null);
  const [cityName, setCityName] = useState("vadodara");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${APP_ID}`,
      );

      const { data } = response;

      if (data.cod === 200) {
        const { temp, pressure, humidity, feels_like } = data.main;
        const { name, visibility } = data;
        const { country, sunrise, sunset } = data.sys;
        const { speed } = data.wind;
        const { main: weathermood } = data.weather[0];

        const weatherData = {
          temp: Math.round(temp),
          pressure: pressure,
          humidity: humidity,
          city: name,
          country: country,
          sunrise: moment.unix(sunrise).format("hh:mm A"),
          sunset: moment.unix(sunset).format("hh:mm A"),
          wind: speed,
          weathermood: weathermood,
          visibility: visibility,
          feels_like: Math.round(feels_like),
        };

        setData(weatherData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, cityName, setCityName, loading, fetchData };
};

export default useWeatherData;
