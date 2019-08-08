import React, { Component } from 'react';
import { isTemplateElement } from '@babel/types';
import { Link } from 'react-router-dom';
import DisplayWeather from './DisplayWeather';
//refactor the dataset so that there are less pieces of state
class HourlyWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HourlyWeather: this.props,
      HourlyData: [],
      showCurrentWeather: false
    };
  }
  //if removed this makes hourly not display
  componentDidMount() {
    this.sortHourlyData();
  }

  sortHourlyData = data => {
    //getting info from state and putting information into array.
    const dataSet = Object.entries(this.state.HourlyWeather).map(
      ([key, value]) => {
        {
          const DataSorted = [].concat(value);
          // storedData.push(DataSorted);

          return DataSorted;
        }
      }
    );

    const AddIdToSortedData = dataSet[0].forEach((item, i) => {
      item.id = i + 1;

      console.log(dataSet);
    });

    this.setState({ HourlyData: dataSet[0] });

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
    console.log(this.state.currentweather);
    const { HourlyData, showCurrentWeather } = this.state;
    {
      return this.state.hourlyWeather !== '' ? (
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
                      <td className="center aligned six wide">
                        {item.weather}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            );
          })}
          )
        </div>
      ) : (
        <Link to="/current">Go back to current</Link>
      );
    }
  }
}
export default HourlyWeather;

/*
 {HourlyData.map((item, index) => {
            return (

currenttime={this.state.currenttime}
          currentforecast={this.state.currentforecast}
          currentweather={this.state.currentweather}
button shouldn't be reloading

<div>
          <DisplayWeather />
        </div>

*/
