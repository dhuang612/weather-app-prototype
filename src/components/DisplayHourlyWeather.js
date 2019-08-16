import React, { Component } from 'react';
import { isTemplateElement } from '@babel/types';
import { Link } from 'react-router-dom';
import DisplayWeather from './DisplayWeather';
//refactor the dataset so that there are less pieces of state
class HourlyWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HourlyWeather: this.props.hourlyWeather,
      HourlyData: [],

      currentforecast: this.props.currentforecast,
      currenttime: this.props.currenttime,
      currentweather: this.props.currentweather,

      weatherIcon: this.props.weatherIcon
    };
  }

  componentDidMount() {
    console.log(this.state.HourlyWeather);
    //if removed this makes hourly not display
    this.sortHourlyData();
  }

  sortHourlyData = data => {
    //getting info from state and putting information into array.
    const dataSet = this.props.hourlyWeather.map(item => ({
      day: item.dt_txt,
      dt: item.dt,
      temp: item.temp,
      weather: item.weather.main,
      weatherIcon: item.weatherIcon
    }));
    /*
    const AddIdToSortedData = dataSet.forEach((item, i) => {
      item.id = i + 1;

      console.log(dataSet);
    });
*/
    this.setState({ HourlyData: dataSet });

    //next steps get data from new object and sort into arrays to save in state.
  };

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
      </div>
    );
  }
}

export default HourlyWeather;

/*
 

*/
