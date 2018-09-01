import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './Filters.css';

class Filters extends Component {
  constructor (props) {
    super(props);
    this.state = {
      address: '',
      categories: '',
      description: '',
      lat: '',
      lng: ''
    };
  }
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  setFilters = () => {
    this.props.setFilters(
      this.state
    );
  }
  handleSubmit = () => {
    let address = this.state.address;
    this.props.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        this.props.setNewCenter(results[0].geometry.location);
        this.setState({
          lat: results[0].geometry.location.lat().toFixed(6),
          lng: results[0].geometry.location.lng().toFixed(6),
          address: results[0].formatted_address,
        }, this.setFilters());
      } else {
        this.setState({
          lat: '',
          lng: '',
        }, this.setFilters());
      }
    });
  }

  render () {
    return (
      <div className='filters__outer'>
        <div className='filters__inner'>
          <input name='address' value={this.state.address} onChange={this.handleInputChange} placeholder='Location' />
          <input name='description' value={this.state.description} onChange={this.handleInputChange} placeholder='Desctription' />
          <select name='categories' value={this.state.categories} onChange={this.handleInputChange}>
            <option value='' disabled>Category </option>
            <option value='chairs'>Chairs</option>
            <option value='tables'>Tables</option>
            <option value='tools'>Tools</option>
            <option value='games'>Games</option>
            <option value='kitchen'>Kitchen</option>
            <option value='electronics'>Electronics</option>
          </select>
          <button onClick={this.handleSubmit}>GO!</button>
        </div>
      </div>
    );
  }
}

Filters.propTypes = {
  setFilters: PropTypes.func,
  geocoder: PropTypes.func,
  setNewCenter: PropTypes.func
};

export default Filters;
