import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HourlyWeather from '../components/DisplayHourlyWeather';
import Form from './form';
import axios from 'axios';
import './DisplayWeather.css';

//confirming that the api key is available also checking if in dev / prod
console.log(process.env.REACT_APP_WEATHER_API_KEY, process.env.NODE_ENV);

class DisplayWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHourlyWeather: false,
      currentforecast: '',
      currenttime: '',
      currentweather: '',
      hourlyWeather: [],
      weatherIcon: ''
    };
  }

  //not being able to add this.fetchWeatherData to this is causing it to remount.
  componentDidMount() {
    console.log('I am mounting');
  }
  handleSubmit = e => {
    const [input] = e.target.elements;
    console.log('city and country ', input.value);
    e.preventDefault();
  };

  fetchWeatherData = async e => {
    const PATH_BASE = 'https://api.openweathermap.org/';
    const REQ_PATH = 'data/2.5/forecast?';
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

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

  render() {
    const {
      currentforecast,
      currenttime,
      currentweather,
      fetchedWeatherData,
      hourlyWeather,
      showHourlyWeather
    } = this.state;
    console.log(hourlyWeather);
    {
      return currentweather === '' ? (
        <div>
          <Form loadWeather={this.fetchWeatherData} />
        </div>
      ) : (
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
                  <div className="day">{this.state.currenttime}</div>
                </td>
                <td>{this.state.currentforecast}</td>
                <div>
                  <td>
                    <img
                      src={
                        'https://openweathermap.org/img/wn/' +
                        this.state.weatherIcon +
                        '.png'
                      }
                    />
                    {this.state.currentweather}
                  </td>
                </div>
              </tr>
            </tbody>
          </table>
          <Link
            to={{
              pathname: '/hourly',
              state: { hourlyWeather: hourlyWeather }
            }}
          >
            Hourly weather
          </Link>
        </div>
      );
    }
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
