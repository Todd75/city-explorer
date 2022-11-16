
import React from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';






handleWeather = async () => {
    let url = `${process.env.REACT_APP_SERVER}/weather?city=${this.state.city}`;
    let cityData = await axios.get(url);
    console.log(cityData.data)
}