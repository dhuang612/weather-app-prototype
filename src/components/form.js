import React from 'react';
import { fetchWeatherData } from '../App';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedWeatherdata: this.props.fetchedWeatherdata,
      city: '',
      country: ''
    };
  }
  handleCityChange = e => {
    this.setState({ city: e.target.value });
  };
  handleCountryChange = e => {
    this.setState({ country: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      fetchedWeatherdata: !this.state.fetchedWeatherdata
    });
  };

  render() {
    console.log(this.state.city, this.state.country);
    return (
      <form
        onSubmit={this.onSubmit}
        loadWeather={(this.state.city, this.state.country)}
      >
        Please enter US city name for weather information <br />
        <label htmlFor="cityname">City name</label>
        <input
          type="text"
          name="city"
          value={this.state.city}
          placeholder="City.."
          onChange={this.handleCityChange}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          defaultValue={this.state.country}
          value={this.state.country}
          placeholder="Country.."
          onChange={this.handleCountryChange}
        />
        <button>Get weather</button>
      </form>
    );
  }
}

export default Form;

/*
 




, this.onSubmit)
*/
