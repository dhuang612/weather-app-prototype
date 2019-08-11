import React from 'react';
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedWeatherdata: this.props.fetchedWeatherdata
    };
  }
  onSubmit = e => {
    e.preventDefault();
    this.setState({ fetchedWeatherdata: !this.state.fetchedWeatherdata });
  };
  render() {
    console.log(this.props.loadWeather);
    return (
      <form onSubmit={(this.props.loadWeather, this.onSubmit)}>
        Please enter US city name for weather information <br />
        <label htmlFor="cityname">City name</label>
        <input type="text" name="city" placeholder="City.." />
        <label htmlFor="country">Country</label>
        <input type="text" name="country" placeholder="Country.." />
        <button>Get weather</button>
      </form>
    );
  }
}

export default Form;
