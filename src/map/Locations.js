import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList';
import PinForm from './PinForm';
import Filters from './Filters';
import './Locations.css';
import axios from 'axios';
import PinDetail from './PinDetail';

class Locations extends Component {
  constructor (props) {
    super(props);
    this.setNewPin = this.setNewPin.bind(this);
    this.clearNewPin = this.clearNewPin.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.setFilters = this.setFilters.bind(this);
    this.state = {
      showMap: true,
      showLocationList: true,
      showForm: false,
      showFilters: true,
      showDetail: true,
      locations: [],
      newPin: { exists: false },
      center: { lat: -33.858669, lng: 151.204593 },
      activePin: '',
      detailPin: '',
      filterString: '',
      geocoder: null
    };
  }

  fetchData () {
    axios.get('/api/',
      {
        params: this.state.filters
      })
      .then(response => {
        const locations = response.data;
        this.setState({ locations });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount () {
    let self = this;
    let mapGetter = setInterval(
      function () {
        if (window.google != null) {
          self.setState({
            google: window.google,
            geocoder: new window.google.maps.Geocoder()
          });
          clearInterval(mapGetter);
        }
      }, 100);
    this.fetchData();
  }
  handleOnClick = (e) => {
    this.setPinDetail(e.currentTarget.id);
  }
  handleMouseEnter (e) {
    this.setState({
      activePin: parseInt(e.currentTarget.id)
    });
  }
  handleMouseLeave () {
    this.setState({
      activePin: ''
    });
  }
  // GEOCODING
  handleGeocodeSearch (address) {
    this.geocoder.geocode({ 'address': address }, (results, status) => {
      if (status === 'OK') {
        this.setNewCenter(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  setNewCenter = (location) => {
    let lat = location.lat();
    let lng = location.lng();
    this.setState({ center: { lat: lat, lng: lng } });
  }

  setNewPin (location) {
    let lat = location.lat();
    let lng = location.lng();
    this.setState({ newPin: { exists: true, lat: lat, lng: lng } });
    this.setState({ center: { lat: lat, lng: lng } });
  }
  clearNewPin () {
    this.setState({ newPin: { exists: false, lat: '', lng: '' } });
  }

  setPinDetail = (id) => {
    const intId = parseInt(id);
    const detailPin = this.state.locations.filter((pin) => (pin.id === intId));
    if (detailPin.length > 0) {
      this.setState({
        activePin: intId,
        detailPin: detailPin[0]
      });
    }
    this.toggleShowDetail(true);
  }

  setFilters (filters) {
    this.setState({
      filters: filters
    }, this.fetchData);
  }
  handleToggle (event) {
    const target = event.target;
    const name = target.name;
    this.setState(prevState => ({
      [name]: !prevState[name]
    }));
  }
  toggleShowDetail = (TurnOn) => {
    if (TurnOn) {
      this.setState({
        showDetail: true,
        showFilters: false,
        showForm: false,
        showLocationList: false,
      });
    } else {
      this.setState({
        activePin: '',
        showDetail: false,
        showForm: false,
        showLocationList: true,
        showFilters: true,
      });
    }
  }

  toggleShowForm = (TurnOn) => {
    if (TurnOn) {
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

  render () {
    return (
      <div>
        <div className='app_layout'>
          <div className='nav_bar__outer'>
            <div className='nav_bar__inner'>
              <img src='/Logo.png' alt='Discurber' />
            </div>
          </div>
          <div className='left_outer'>
            {this.state.showDetail &&
              <PinDetail
                pin={this.state.detailPin}
                toggleShowDetail={this.toggleShowDetail} />
            }

            {this.state.showFilters &&
              <Filters
                geocoder={this.state.geocoder}
                setFilters={this.setFilters}
                setNewCenter={this.setNewCenter}
              />
            }
            {
              this.state.showLocationList &&
              <LocationList
                pinLocations={this.state.locations}
                handleMouseEnter={this.handleMouseEnter}
                handleMouseLeave={this.handleMouseLeave}
                handleOnClick={this.handleOnClick}
              />
            }
            <PinForm
              handleGeocodeSearch={this.handleGeocodeSearch}
              geocoder={this.state.geocoder}
              fetchData={this.fetchData}
              toggleShowForm={this.toggleShowForm}
              showForm={this.state.showForm}
              setNewPin={this.setNewPin}
              setNewCenter={this.setNewCenter}
              clearNewPin={this.clearNewPin}
            />
          </div>
          {this.state.showMap &&
            <div className="map_outer">
              <div className="map_inner">
                <Map
                  setPinDetail={this.setPinDetail}
                  center={this.state.center}
                  newPin={this.state.newPin}
                  activePin={this.state.activePin}
                  pinLocations={this.state.locations}
                  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAuujf3qwBlQG1WIbQNqGbpjJdgjKFdx4"
                  loadingElement={<div style={{ height: '100%' }} />}
                  containerElement={<div style={{ height: '800px', width: '40%' }} />}
                  mapElement={<div style={{ height: '100%' }} />}
                /></div></div>}

        </div>
        <button name='showMap' style={{ float: 'right' }} onClick={this.handleToggle}>Toggle Map</button>
        <button name='showLocationList' style={{ float: 'right' }} onClick={this.handleToggle}>Toggle LocationList</button>
        <button name='showForm' style={{ float: 'right' }} onClick={this.handleToggle}>Toggle Form</button>
      </div>
    );
  }
}

export default Locations;
