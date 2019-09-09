import React, { Component } from 'react';

import DisplayWeather from './components/DisplayWeather';
import DisplayHourlyWeather from './components/DisplayHourlyWeather';
import Form from './components/form';
import axios from 'axios';
import Navbar from './components/navbar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

//confirming that the api key is available also checking if in dev / prod
console.log(process.env.REACT_APP_WEATHER_API_KEY, process.env.NODE_ENV);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentforecast: '',
      currenttime: '',
      currentweather: '',
      hourlyWeather: this.props.hourlyWeather,
      weatherIcon: '',
      fetchedweatherdata: false,
      city: this.props.city,
      country: this.props.country,
      showHourly: false
    };
  }
  componentDidMount() {
    this.showCurrentWeather();
  }

  //grabs the props from <Form> for state and country
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  //handles submit on the form and runs the api call
  onSubmit = e => {
    e.preventDefault();
    this.fetchWeatherData();
    this.setState({ fetchedweatherdata: !this.state.fetchedweatherdata }, () =>
      console.log(this.state.fetchedweatherdata)
    );
  };
  fetchWeatherData = async e => {
    const city = this.state.city;
    const country = this.state.country;

    console.log(city, country);
    const PATH_BASE = 'https://api.openweathermap.org/';
    const REQ_PATH = 'data/2.5/forecast?';
    //review into how you are getting the data from the form.

    const units = 'imperial';
    const cnt = 10;

    const url = `${PATH_BASE}${REQ_PATH}q=${city},${country}&APPID=${process.env.REACT_APP_WEATHER_API_KEY}&units=${units}&cnt=${cnt}`;

    const response = await axios.get(url);
    this.sortData(response.data);
  };
  convertTimefromUnix = dt => {
    const date = new Date(dt * 1000);
    const hours = date.getHours();
    const minutes = '0' + date.getMinutes();
    const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
  };

  curday = sp => {
    const today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return yyyy + sp + mm + sp + dd;
  };

  /*
javascript string method .startsWith only returns 1 value
array.forEach
-1 returns unique values
  */
  sortData = result => {
    const { list } = result;
    console.log(list);
    const sortedData = list
      .filter(item => item.dt_txt.indexOf(this.curday('-') > -1))
      .map(item => ({
        day: item.dt_txt,
        temp: item.main.temp,
        dt: this.convertTimefromUnix(item.dt),
        weather: item.weather[0].main,
        weatherIcon: item.weather[0].icon
      }));

    console.log(sortedData);
    this.setState({
      currentforecast: sortedData[0].temp,
      currenttime: sortedData[0].dt,
      currentweather: sortedData[0].weather,
      hourlyWeather: [...sortedData],
      weatherIcon: sortedData[0].weatherIcon
    });
  };
  showCurrentWeather = () => {
    if (this.state.fetchedweatherdata) {
      return (
        <div>
          <DisplayWeather
            currentweather={this.state.currentweather}
            currentforecast={this.state.currentforecast}
            currenttime={this.state.currenttime}
            weatherIcon={this.state.weatherIcon}
            hourlyWeather={this.state.hourlyWeather}
            showHourly={this.state.showHourly}
            onChange={this.handleChange}
            onSubmit={this.onSubmit}
            fetchedweatherdata={!this.fetchedweatherdata}
          />
        </div>
      );
    } else if (!this.state.fetchedweatherdata) {
      return <Form onChange={this.handleChange} onSubmit={this.onSubmit} />;
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Weather forecast</h1>

        {this.showCurrentWeather()}
      </div>
    );
  }
}

export default App;
