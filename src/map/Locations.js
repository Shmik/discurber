import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList';
import PinForm from './PinForm';
import Filters from './Filters'
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
    activePin: '',
    filterString: ''
  }

  green_icon='http://maps.google.com/mapfiles/ms/icons/green-dot.png'

  constructor(props){
    super(props);
    this.setNewPin = this.setNewPin.bind(this)
    this.clearNewPin = this.clearNewPin.bind(this)
    this.handleToggle = this.handleToggle.bind(this)
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.fetchData = this.fetchData.bind(this)
    this.setFilters = this.setFilters.bind(this)
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

  fetchData() {
    axios.get('/api/',
      {
      params: this.state.filters
    })
    .then(response => {
      const locations = response.data
      this.setState({ locations })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  componentDidMount() {
    this.fetchData()
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
  setFilters(filters){
    this.setState({
      filters: filters
    }, this.fetchData)
  }
  handleToggle(event) {
    const target = event.target;
    const name = target.name;
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  }

  toggleShowForm = (TurnOn) => {
    if (TurnOn){
      this.setState({
        showForm: true,
        showLocationList: false,
      });
    } else {
      this.setState({
        showForm: false,
        showLocationList: true,
      });
    }
  }

  render() {
    return (
      <div>
        <div className='app_layout'>
          <div className='nav_bar__outer'>
            <div className='nav_bar__inner'>
             <img src='/Logo.png' />
            </div>
          </div>
            <div className='left_outer'>
            <Filters setFilters={this.setFilters}/>
            {
              this.state.showLocationList &&
              <LocationList
              pinLocations={this.state.locations}
              handleMouseEnter={this.handleMouseEnter}
              handleMouseLeave={this.handleMouseLeave} />
            }
            <PinForm
            fetchData={this.fetchData}
            toggleShowForm={this.toggleShowForm}
            showForm={this.state.showForm}
            setNewPin={this.setNewPin}
            setNewCenter={this.setNewCenter}
            clearNewPin={this.state.clearNewPin}
            />
            </div>
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
          containerElement={<div style={{ height: `800px`, width: `40%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          /></div></div>}

        </div>
            <button name='showMap' style={{float:'right'}} onClick={this.handleToggle}>Toggle Map</button>
            <button name='showLocationList' style={{float:'right'}} onClick={this.handleToggle}>Toggle LocationList</button>
            <button name='showForm' style={{float:'right'}} onClick={this.handleToggle}>Toggle Form</button>
     </div>
    );
  }
}

export default Locations;
