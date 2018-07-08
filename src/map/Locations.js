import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList'
import PinForm from './PinForm'
import axios from 'axios';

class Locations extends Component {
  state = {
    locations: [],
    newPin: {exists: false},
    center: { lat: -33.858669, lng: 151.204593 }
  }
  constructor(props){
    super(props);
    this.setNewPin = this.setNewPin.bind(this)
    this.clearNewPin = this.clearNewPin.bind(this)
  }
  handleMouseEnter(e) {
    console.log(e.target.id)
  }
  componentDidMount() {
    axios.get('http://127.0.0.1:8000')
      .then(response => {
        const locations = response.data
        this.setState({ locations })
      })
      .catch(function (error) {
        console.log(error);
      });

  }
  setNewPin(location){
    let lat = location.lat()
    let lng = location.lng()
    this.setState({newPin: {exists: true, lat: lat, lng: lng}})
    this.setState({center: {lat: lat, lng: lng}})
  }
  clearNewPin(){
    this.setState({newPin: {exists: false, lat: '', lng: ''}})
  }
  render() {
    return (
      <div>
        <Map
          center = {this.state.center}
          newPin = {this.state.newPin}
          pinLocations={this.state.locations}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAuujf3qwBlQG1WIbQNqGbpjJdgjKFdx4"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <LocationList
          pinLocations={this.state.locations}
          handleMouseEnter={this.handleMouseEnter} />
        <PinForm
          setNewPin={this.setNewPin}
          clearNewPin={this.state.clearNewPin}
          />
     </div>
    );
  }
}

export default Locations;
