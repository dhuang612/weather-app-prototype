import React, { Component } from 'react';
import { isTemplateElement } from '@babel/types';
import { Link } from 'react-router-dom';
import DisplayWeather from './DisplayWeather';
//refactor the dataset so that there are less pieces of state
class HourlyWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HourlyWeather: this.props.location.state.hourlyWeather,
      HourlyData: [],
      showCurrentWeather: false
    };
  }
  //if removed this makes hourly not display
  componentDidMount() {
    console.log(this.props.location.state.hourlyWeather);
    console.log(this.state.HourlyWeather);
    this.sortHourlyData();
  }

  sortHourlyData = data => {
    //getting info from state and putting information into array.
    const dataSet = this.state.HourlyWeather.map(item => ({
      day: item.dt_txt,
      dt: item.dt,
      temp: item.temp,
      weather: item.weather.main,
      weatherIcon: item.weatherIcon
    }));

    const AddIdToSortedData = dataSet.forEach((item, i) => {
      item.id = i + 1;

      console.log(dataSet);
    });

    this.setState({ HourlyData: dataSet });

    //next steps get data from new object and sort into arrays to save in state.
  };
  switchToCurrent = () => {
    this.setState({ showCurrentWeather: !this.state.showCurrentWeather });
  };
  /*
 ? (
        <div>
          <Form loadWeather={this.fetchWeatherData} />
        </div>
      ) : (
  */

  render() {
    const { HourlyData, showCurrentWeather, HourlyWeather } = this.state;

    console.log(HourlyData);
    return (
      <div>
        <h1>Hourly weather</h1>
        {HourlyData.map((item, index) => {
          return (
            <div className="ui container">
              <table className="ui basic table">
                <thead>
                  <tr className="center aligned six wide">
                    <th className="center aligned six wide">time</th>
                    <th className="center aligned six wide">temperature</th>
                    <th className="center aligned six wide">weather</th>
                    <th className="center aligned six wide">
                      <img
                        src={
                          'https://openweathermap.org/img/wn/' +
                          item.weatherIcon +
                          '.png'
                        }
                      />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="center aligned">
                    <td key={item.id} className="center aligned six wide">
                      {item.dt}
                    </td>
                    <td className="center aligned six wide">{item.temp}</td>
                    <td className="center aligned six wide">{item.weather}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
        <Link
          to={{
            pathname: '/current',
            state: { fetchWeatherData: this.state.fetchWeatherData }
          }}
        >
          current weather
        </Link>
      </div>
    );
  }
}

export default HourlyWeather;

/*
 

*/
