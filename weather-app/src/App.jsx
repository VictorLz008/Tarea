import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureArrowUp } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const api_key = 'f0d8de1ee6ee4606e4a7d7b4f463a73f';
  const [ciudad, setCiudad] = useState('Puebla');
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [Pais, setPais] = useState('MX');
  const [humedad, setHumedad] = useState(0);
  const [temperatura, setTemperatura] = useState(0);
  const [tempMax, setTempMax] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [sensacionReal, setSensacionReal] = useState(0);
  const [nubosidad, setNubosidad] = useState(0);
  const getConversion = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  }
  const getGeocodingData = async (ciudad, pais, limite) => {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${ciudad},${pais}&limit=${limite}&limit=5&appid=${api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setCiudad(data[0].name);
      setLat(data[0].lat);
      setLon(data[0].lon);
      setPais(data[0].country);
    } catch (error) {
      console.log(error)
    }
  }
  const getWeatherData = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setHumedad(data.main.humidity);
      setTempMax(getConversion(data.main.temp_max));
      setTempMin(getConversion(data.main.temp_min));
      setSensacionReal(getConversion(data.main.feels_like));
      setTemperatura(getConversion(data.main.temp));
      setNubosidad(data.clouds.all);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getGeocodingData('Puebla', 'Mx', 1);
    getWeatherData(lat, lon);
  }, []);
  const determinarClima = () => {
    if (nubosidad > 70) {
      return "nublado";
    } else {
      return "soleado";
    }
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row my-4 justify-content-center">
          <div className="col-md-6 text-center">
            <FontAwesomeIcon icon={faCloudRain} bounce size="7x" style={{ color: "#63E6BE" }} />
          </div>
          <div className='my-3 col-md-9 text-center text-white'>
            <p style={{ fontSize: "40px" }}>{Pais},{ciudad} <FontAwesomeIcon icon={faLocationDot} size="sm" style={{ color: "#63E6BE", }} /></p>
            <p>long:{lon}, Lat:{lat}</p>
            <p style={{ fontSize: "50px" }}>
              <FontAwesomeIcon size='sm' icon={faTemperatureLow} style={{ color: "#FFD43B", }} />{temperatura}°C</p>
            <p className='text-lg'>Se espera un día {determinarClima()}. La temperatura máxima será de {tempMax}° y la mínima de {tempMin}°.</p>
          </div>
        </div>
        <div className="row my-4 justify-content-center">
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-header bg-secondary text-white d-flex justify-content-center align-items-center">
                <h3 className="card-title">Humedad</h3>
              </div>
              <div className="card-body bg-secondary container d-flex justify-content-center align-items-center">
                <p className='text-lg'>{humedad}% <FontAwesomeIcon icon={faDroplet} size="2x" style={{ color: "#74C0FC", }} /></p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-header bg-secondary text-white d-flex justify-content-center align-items-center">
                <h3 className="card-title">Temperatura Minima</h3>
              </div>
              <div className="card-body bg-secondary container d-flex justify-content-center align-items-center">
                <p className='text-lg'>{tempMin}° <FontAwesomeIcon icon={faTemperatureArrowDown} size="2x" style={{ color: "#63E6BE", }} /> </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-header bg-secondary text-white d-flex justify-content-center align-items-center">
                <h3 className="card-title">Temperatura Maxima</h3>
              </div>
              <div className="card-body container bg-secondary d-flex justify-content-center align-items-center">
                <p className='text-lg'>{tempMax}° <FontAwesomeIcon icon={faTemperatureArrowUp} size='2x' style={{ color: "#ff0000", }} /></p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card mb-3">
              <div className="card-header bg-secondary text-white d-flex justify-content-center align-items-center">
                <h3 className="card-title">Sensacion real</h3>
              </div>
              <div className="card-body bg-secondary container d-flex justify-content-center align-items-center">
                <p className='text-lg'>{sensacionReal}° <FontAwesomeIcon size='2x' icon={faTemperatureLow} style={{ color: "#FFD43B", }} /></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
