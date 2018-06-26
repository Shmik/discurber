import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from './map/Map';
import axios from 'axios';


class App extends Component {
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
     <Map
       pinLocations={this.state.locations}
       googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyAAuujf3qwBlQG1WIbQNqGbpjJdgjKFdx4"
       loadingElement={<div style={{ height: `100%` }} />}
       containerElement={<div style={{ height: `400px` }} />}
       mapElement={<div style={{ height: `100%` }} />}
     />
    );
  }
}

export default App;
