import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import DisplayWeather from './components/DisplayWeather';
import DisplayHourlyWeather from './components/DisplayHourlyWeather';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={DisplayWeather} />
        <Route
          path="current"
          render={props => (
            <DisplayWeather {...props} loadWeather={this.fetchWeatherData} />
          )}
        />
        <Route
          path="hourly"
          render={props => (
            <DisplayHourlyWeather
              {...props}
              hourlyWeather={this.state.hourlyWeather}
            />
          )}
        />
        <div className="App">
          <h1>Weather forecast</h1>
          <DisplayWeather />
        </div>
      </Switch>
    );
  }
}

export default App;
