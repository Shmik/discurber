import React from 'react';
import axios from 'axios';
import SlidingInput from './SlidingInput'

import './PinForm.css'
class PinForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        address: '',
        description: '',
        formatted_address:'',
        lat: '',
        lng: '',
        pictures: []
      };
    this.props = props
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGeocodeNewPin = this.handleGeocodeNewPin.bind(this)
    this.handleGeocodeSearch = this.handleGeocodeSearch.bind(this)
    this.displayNewPin = this.displayNewPin.bind(this)
    this.setNewCenter = this.setNewCenter.bind(this)
  }

  componentDidMount(){
    let self = this
    self.geocoder = null
    let map_getter =  setInterval(
      function(){
       if (window.google != null){
          self.geocoder = new window.google.maps.Geocoder();
          clearInterval(map_getter);
       }
      }, 100)
  };

  handleGeocodeNewPin(event) {
    let address = this.state.address;
    this.geocoder.geocode({'address': address}, this.displayNewPin);
  }

  displayNewPin(results, status){
      if (status === 'OK') {
        this.props.setNewPin(results[0].geometry.location)
        this.setState({
          formatted_address: results[0].formatted_address,
          lat: results[0].geometry.location.lat().toFixed(6),
          lng: results[0].geometry.location.lng().toFixed(6)
        })
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
        this.props.clearNewPin()
        this.setState({
          formatted_address: '',
          lat: '',
          lng: ''
        })

      }
  }

  handleGeocodeSearch(event) {
    let address = this.state.searchAddress;
    this.geocoder.geocode({'address': address}, this.setNewCenter);
  }

  setNewCenter(results, status){
    if (status === 'OK') {
      this.props.setNewCenter(results[0].geometry.location)
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }
  handleSubmit = (event) => {
    event.preventDefault()
    let form_data = new FormData()

    let data_fields = ['description', 'formatted_address', 'lat', 'lng']
    for (const key of data_fields){
      form_data.append(key, this.state[key])
    }
    for (const pic of this.state.pictures){
      form_data.append('pictures', pic)
    }
    axios.post('http://127.0.0.1:8000', form_data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  handlePictureUpload = (event) => {
    this.setState({
    pictures: [...this.state.pictures, event.target.files[0]]
  })
  }
  render() {
    return (
      <div>
        <form className='pin_form' onSubmit={this.handleSubmit}>
          <label> {this.state.formatted_address} </label>
          <label> Pin Description </label>
          <input
            name="description"
            type="text"
            onChange={this.handleInputChange} />
          <input
            name="pictures"
            id='pictures'
            type="file"
            ref={ref => this.fileInput = ref}
            onChange={this.handlePictureUpload}/>
          <button type='button' onClick={() => this.fileInput.click()}> Add pictures </button>
          <ul>{this.state.pictures.map((file, index) => <li key={index}>{file.name}</li>)}</ul>
          <input type='submit' id='submit' value='Submit' />
        </form>
        {/* <div className="action-buttons">
          <SlidingInput
            fa_icon='plus-square'
            value={this.state.parsedAddress}
            onChange={this.handleInputChange}
            handleEnter={this.handleGeocodeNewPin}
            name='address' />
          <SlidingInput
            fa_icon='search'
            onChange={this.handleInputChange}
            handleEnter={this.handleGeocodeSearch}
            name='searchAddress' />
        </div> */}
      </div>
    );
  }
}

export default PinForm
