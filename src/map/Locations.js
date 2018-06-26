import React, { Component } from 'react';
import Map from './Map';
import LocationList from './LocationList'
import axios from 'axios';

class Locations extends Component {
  state = {
    locations: []
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:5000/locations')
      .then(response => {
        const locations = response.data.locations
        this.setState({ locations })
      })
      .catch(function (error) {
        console.log(error);
      });

  }

  render() {
    return (
      <div>
        <Map
          pinLocations={this.state.locations}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAuujf3qwBlQG1WIbQNqGbpjJdgjKFdx4"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
        <LocationList pinLocations={this.state.locations} />
     </div>
    );
  }
}

export default Locations;
