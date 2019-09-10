import React, { Component } from 'react';

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
      showHourly: this.props.showWeather,
      fetchedWeatherData: this.props.fetchedWeatherData,
      showForm: false
    };
  }

  componentDidMount() {
    console.log('I am mounting');
    console.log(this.props.hourlyWeather, this.props.fetchedWeatherData);
  }
  toggleShowForm = () => {
    this.setState({
      showForm: !this.showForm
    });
  };

  showFormOrWeather = () => {
    if (!this.state.showForm) {
      return (
        <div className="ui container">
          <br />
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
          <button onClick={this.toggleShowForm}>show form</button>
        </div>
      );
    } else {
      return <Form onChange={this.handleChange} onSubmit={this.onSubmit} />;
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
    return <div>{this.showFormOrWeather()}</div>;
  }
}

export default DisplayWeather;
/*
    <button onClick={this.switchToHourly}>swap weather</button>
*/
