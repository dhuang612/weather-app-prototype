import React, { Component } from 'react';

import DisplayHourlyWeather from '../components/DisplayHourlyWeather';
import Form from './form';
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
      showHourly: this.props.showHourly,
      fetchedWeatherData: this.props.fetchedWeatherData,
      showForm: false
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

  switchToForm = () => {
    this.setState({
      showForm: !this.state.showForm
    });
  };
  showCurrentWeatherorHourly = () => {
    if (this.state.showHourly) {
      return (
        <div>
          <DisplayHourlyWeather hourlyWeather={this.props.hourlyWeather} />
        </div>
      );
    } else if (this.state.showForm) {
      return (
        <Form
          onChange={this.props.handleChange}
          onSubmit={this.props.onSubmit}
        />
      );
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
        {this.showCurrentWeatherorHourly()}
        <br />
        {this.state.showHourly ? null : (
          <div>
            <h1>Current temperature</h1>
            <button onClick={this.switchToForm}>switch to Form</button>
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
