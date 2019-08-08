import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import DisplayWeather from './components/DisplayWeather';
import DisplayHourlyWeather from './components/DisplayHourlyWeather';
import Form from './components/form';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <h1>Weather forecast</h1>

        <Switch>
          <Route
            exact
            path="/"
            render={routeProps => (
              <DisplayWeather {...{ ...routeProps, ...this.props }} />
            )}
          />
          <Route
            path="/hourly"
            render={routeProps => (
              <DisplayHourlyWeather
                {...{
                  ...routeProps,
                  ...this.props
                }}
              />
            )}
          />
          <Route
            path="/current"
            render={routeProps => (
              <DisplayWeather
                {...{
                  ...routeProps,
                  ...this.props
                }}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
/*
<Route path="/" exact component={DisplayWeather} />

*/
