import React, { Component } from 'react';
import Form from '../components/form';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedweatherdata: this.props.children.props.fetchedweatherdata,
      city: this.props.children.props.city,
      country: this.props.children.props.country
    };
  }
  componentDidMount() {
    console.log(this.state.fetchedweatherdata);
    this.resetState();
  }

  resetState = () => {
    this.setState(
      { fetchedweatherdata: !this.state.fetchedweatherdata },
      console.log(this.state.fetchedweatherdata)
    );
  };

  render() {
    //const { fetchedweatherdata, handleChange, onSubmit } = this.props;
    //checking for how to find onChange and onSubmit
    console.log(
      //this.props.children.props.onChange,
      //this.props.children.props.onSubmit,
      this.props.children.props.fetchedweatherdata,
      this.props.children.props.city
    );
    return (
      <div>
        {!this.state.fetchedweatherdata ? (
          <div>
            <button onClick={this.resetState}>return to form</button>
          </div>
        ) : (
          <Form
            onChange={this.props.children.props.onChange}
            {...this.props}
            onSubmit={this.props.children.props.onSubmit}
            //fetchedweatherdata={!this.props.children.props.fetchedweatherdata}
          />
        )}
      </div>
    );
  }
}
export default Navbar;
