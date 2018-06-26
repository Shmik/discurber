import React, { Component } from 'react';
import './App.css';
import Locations from './map/Locations';
import axios from 'axios';


class App extends Component {
  render() {
    return (
     <Locations />
    );
  }
}

export default App;
