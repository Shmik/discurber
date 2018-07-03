import React from 'react';

class PinForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        address: ''
      };
    this.props = props
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.geocodeAddress = this.geocodeAddress.bind(this)
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

  handleSubmit(event) {
    console.log('geocode submitted')
    event.preventDefault();
    this.geocodeAddress(this.geocoder, this.props.map)
  }

  geocodeAddress(geocoder, resultsMap) {
    let self = this
    let address = this.state.address
    console.log(this.props.setNewPin)
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
         self.props.setNewPin(results[0].geometry.location)
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pin Description
          <input
            name="Description"
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
        <input type="file" />
        <input id="submit" type="submit" value="Geocode" />
      </form>
    );
  }
}

export default PinForm

