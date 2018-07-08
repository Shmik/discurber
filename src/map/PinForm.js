import React from 'react';
import axios from 'axios';

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
    this.handleGeocode = this.handleGeocode.bind(this)
    this.geocodeAddress = this.geocodeAddress.bind(this)
    this.validate_address = this.validate_address.bind(this)
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

  handleGeocode(event) {
    event.preventDefault();
    this.geocodeAddress(this.geocoder, this.props.map)
  }

  geocodeAddress(geocoder, resultsMap) {
    let self = this
    let address = this.state.address
    geocoder.geocode({'address': address}, this.validate_address);
  }

  validate_address(results, status){
      if (status === 'OK') {
        console.log(results[0])
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
    debugger
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
    console.log('submitted')
  }
  handlePictureUpload = (event) => {
    this.setState({
      pictures: [...this.state.pictures, event.target.files[0]]
    })
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pin Description
          <input
            name="description"
            type="text"
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Address
          <input
            name="address"
            type="text"
            value={this.state.parsedAddress}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <input name="pictures" id='pictures' type="file" onChange={this.handlePictureUpload}/>
        <button id='geocode' onClick={this.handleGeocode}> Geocode </button>
        <input type='submit' id='submit' value='Submit' />
      </form>

    );
  }
}

export default PinForm
