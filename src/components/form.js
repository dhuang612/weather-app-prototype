import React from 'react';

class Form extends React.Component {
  constructor(props) {
    super(props);
  }
  /*
  handleChange = e => {
    this.setState({
      [e.target.city]: e.target.value,
      [e.target.country]: e.target.value
    });
  };*/

  onSubmit = e => {
    e.preventDefault();
    // alert('state of city and country:' + this.state.city, this.state.country);
    //alert('a form was submitted!');
    this.setState(
      {
        fetchedWeatherdata: !this.state.fetchedWeatherdata
      },
      console.log(this.state.fetchedWeatherdata)
    );
  };

  render() {
    const { country, city } = this.props;

    return (
      <form
        onSubmit={this.props.onSubmit}
        //loadWeather={(this.state.city, this.state.country)}
      >
        Please enter US city name for weather information <br />
        <label htmlFor="cityname">City name</label>
        <input
          type="text"
          name="city"
          value={this.props.city}
          placeholder="City.."
          onChange={this.props.onChange}
        />
        <label htmlFor="country">Country</label>
        <input
          type="text"
          name="country"
          value={this.props.country}
          placeholder="Country.."
          onChange={this.props.onChange}
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
