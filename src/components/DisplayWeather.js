import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DisplayHourlyWeather from '../components/DisplayHourlyWeather';

import './DisplayWeather.css';

class DisplayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentforecast: this.props.currentforecast,
      currenttime: this.props.currenttime,
      currentweather: this.props.currentweather,
      weatherIcon: this.props.weatherIcon,
      hourlyWeather: this.props.hourlyWeather,
      showHourly: this.props.showHourly
    };
  }

  componentDidMount() {
    console.log('I am mounting');
    console.log(this.props.hourlyWeather, this.props.fetchedWeatherData);
  }
  switchToHourly = () => {
    this.setState({
      showHourly: !this.state.showHourly
    });
  };
  showCurrentWeatherorHourly = () => {
    if (this.state.showHourly) {
      return (
        <div>
          <DisplayHourlyWeather hourlyWeather={this.props.hourlyWeather} />
        </div>
      );
    } else {
      return null;
    }
  };

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

    console.log(this.props);
    return (
      <div className="ui container">
        <Link to="/">Click here to go back to form</Link>

        {this.showCurrentWeatherorHourly()}
        <br />
        {this.state.showHourly ? null : (
          <div>
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
                    <div className="day">{this.props.currenttime}</div>
                  </td>
                  <td>{this.props.currentforecast}</td>
                  <div>
                    <td>
                      <img
                        src={
                          'https://openweathermap.org/img/wn/' +
                          this.props.weatherIcon +
                          '.png'
                        }
                      />
                      {this.props.currentweather}
                    </td>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <button onClick={this.switchToHourly}>swap weather</button>
      </div>
    );
  }
}

export default DisplayWeather;
