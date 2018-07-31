import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList'
import PinForm from './PinForm'
import './Locations.css'
import axios from 'axios';

class Locations extends Component {
  state = {
    showMap: true,
    showLocationList: true,
    showForm: false,
    locations: [],
    newPin: {exists: false},
    center: { lat: -33.858669, lng: 151.204593 },
    activePin: ""
  }

  green_icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'

  constructor(props){
    super(props);
    this.setNewPin = this.setNewPin.bind(this)
    this.clearNewPin = this.clearNewPin.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
  }
  handleMouseEnter(e) {
    this.setState({
      activePin: e.currentTarget.id
    })
  }
  handleMouseLeave() {
    this.setState({
      activePin: ''
    })
  }
  componentDidMount() {
    axios.get('/api/')
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
  setNewCenter = (location) => {
    let lat = location.lat()
    let lng = location.lng()
    this.setState({center: {lat: lat, lng: lng}})
  }
  clearNewPin(){
    this.setState({newPin: {exists: false, lat: '', lng: ''}})
  }
  handleToggle(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: !this.state[name]
    });
  }

  render() {
    return (
      <div>
        <div className='app_layout'>
          <div className='nav_bar__outer'>
            <div className='nav_bar__inner'>
            <img src='/Logo.png' />
            <button name='showMap' style={{float:'right'}} onClick={this.handleToggle}>Toggle Map</button>
            <button name='showLocationList' style={{float:'right'}} onClick={this.handleToggle}>Toggle LocationList</button>
            <button name='showForm' style={{float:'right'}} onClick={this.handleToggle}>Toggle Form</button>
            </div>
          </div>
          {this.state.showLocationList && <LocationList
          pinLocations={this.state.locations}
          handleMouseEnter={this.handleMouseEnter}
          handleMouseLeave={this.handleMouseLeave} />}
          {this.state.showMap &&
          <div className="map_outer">
          <div className="map_inner">
          <Map
          center = {this.state.center}
          newPin = {this.state.newPin}
          activePin = {this.state.activePin}
          pinLocations={this.state.locations}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAuujf3qwBlQG1WIbQNqGbpjJdgjKFdx4"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `800px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          /></div></div>}
          {this.state.showForm && <PinForm
            setNewPin={this.setNewPin}
            setNewCenter={this.setNewCenter}
            clearNewPin={this.state.clearNewPin}
            />}
        </div>
     </div>
    );
  }
}

export default Locations;
