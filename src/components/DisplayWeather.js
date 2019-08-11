import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HourlyWeather from '../components/DisplayHourlyWeather';

import './DisplayWeather.css';

class DisplayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentforecast: this.props.currentforecast,
      currenttime: this.props.currenttime,
      currentweather: this.props.currentweather,
      hourlyWeather: [],
      weatherIcon: this.props.weatherIcon
    };
  }

  //not being able to add this.fetchWeatherData to this is causing it to remount.
  componentDidMount() {
    console.log('I am mounting');
    console.log(this.props);
  }

  render() {
    const {
      currentforecast,
      currenttime,
      currentweather,
      fetchedWeatherData,
      hourlyWeather,
      showHourlyWeather,
      weatherIcon
    } = this.state;

    console.log(this.state);
    return (
      <div className="ui container">
        <br />
        <h1>Current temperature</h1>
        <table className="ui basic table">
          <thead>
            <tr>
              <th> time</th>
              <th> temp</th>
              <th> weather</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="day">{currenttime}</div>
              </td>
              <td>{currentforecast}</td>
              <div>
                <td>
                  <img
                    src={
                      'https://openweathermap.org/img/wn/' +
                      weatherIcon +
                      '.png'
                    }
                  />
                  {currentweather}
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default DisplayWeather;

/*

 if (!showHourlyWeather) {
      return (
        <HourlyWeather
          hourlyWeather={this.state.hourlyWeather}
          currentweatherinfo={this.state.currentweatherinfo}
        />
      );
    }
  }
}
//don't believe this does anything.
hourlyWeatherData = () => {
    const { hourlyWeather } = this.state;
    console.log(hourlyWeather);
  };



*/
