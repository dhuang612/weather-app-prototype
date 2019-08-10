import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import DisplayWeather from './components/DisplayWeather';
import DisplayHourlyWeather from './components/DisplayHourlyWeather';
import Form from './components/form';
import axios from 'axios';

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
      hourlyWeather: [],
      weatherIcon: ''
    };
  }
  componentDidMount() {}

  fetchWeatherData = async e => {
    const PATH_BASE = 'https://api.openweathermap.org/';
    const REQ_PATH = 'data/2.5/forecast?';
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();
    const units = 'imperial';
    const cnt = 10;

    const url = `${PATH_BASE}${REQ_PATH}q=${city},${country}&APPID=${
      process.env.REACT_APP_WEATHER_API_KEY
    }&units=${units}&cnt=${cnt}`;

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
  getComponent({ prop, state }) {
    let component;
    switch (this.state.weather) {
      case this.weatherIcon:
        return (component = (
          <DisplayWeather state={this.state.currentweather} />
        ));

      case this.hourlyWeather:
        return (component = (
          <DisplayHourlyWeather prop={this.state.hourlyWeather} />
        ));

      case !this.weatherIcon:
        return (component = <Form prop={this.state.fetchWeatherData} />);

      default:
        return null;
    }
  }

  render() {
    const {
      currentforecast,
      currenttime,
      currentweather,
      weatherIcon,
      hourlyWeather
    } = this.state;
    console.log(this.state);
    return (
      <div className="App">
        <h1>Weather forecast</h1>
        <Form loadWeather={this.fetchWeatherData} />
        {this.getComponent(this.state)}
      </div>
    );
  }
}

export default App;
/*
<Route path="/" exact component={DisplayWeather} />

 <Route
              path="/"
              exact
              render={props => (
                <DisplayWeather
                  {...props}
                  currentforecast={this.state.currentforecast}
                  currenttime={this.state.currenttime}
                  currentweather={this.state.currentweather}
                />
              )}
            />



             <Form loadWeather={this.fetchWeatherData} />

 <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={props => (
                <Form {...props} loadWeather={this.fetchWeatherData} />
              )}
            />

            <Route
              path="/current"
              render={props => (
                <DisplayWeather
                  {...props}
                  currentforecast={this.state.currentforecast}
                  currenttime={this.state.currenttime}
                  currentweather={this.state.currentweather}
                  weatherIcon={this.state.weatherIcon}
                />
              )}
            />
          </Switch>
        </Router>



*/
