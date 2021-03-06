import React from 'react';
import PropTypes from 'prop-types';
import ReactLoading from 'react-loading';
import axios from 'axios';
import SlidingInput from './SlidingInput';

import './PinForm.css';
class PinForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      address: '',
      description: '',
      formatted_address: '',
      lat: '',
      lng: '',
      pictures: [],
      categories: [],
      loading: false,
    };
    this.props = props;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGeocodeNewPin = this.handleGeocodeNewPin.bind(this);
    this.displayNewPin = this.displayNewPin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  handleGeocodeNewPin (event) {
    event.preventDefault();
    let address = this.state.address;
    this.props.geocoder.geocode({ 'address': address }, this.displayNewPin);
    this.props.toggleShowForm(true);
  }
  showForm(){
    this.props.toggleShowForm(true);
  }
  displayNewPin (results, status) {
    if (status === 'OK') {
      this.props.setNewPin(results[0].geometry.location);
      this.setState({
        formatted_address: results[0].formatted_address,
        lat: results[0].geometry.location.lat().toFixed(6),
        lng: results[0].geometry.location.lng().toFixed(6),
        suburb: results[0].address_components[2].short_name,
        state: results[0].address_components[4].short_name,
        postcode: results[0].address_components[6].short_name
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
      this.props.clearNewPin();
      this.setState({
        formatted_address: '',
        lat: '',
        lng: ''
      });
    }
  }
  handleSearch = () => {
    this.props.handleGeocodeSearch(this.state.searchAddress);
  }

  handleInputChange (event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleMultipleSelect = (event) => {
    this.setState({
      [event.target.name]: [...event.target.options].filter(options => options.selected).map(options => options.value)
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    let form = new FormData();

    let dataFields = ['description', 'formatted_address', 'lat', 'lng', 'suburb', 'state', 'postcode'];
    for (const key of dataFields) {
      form.append(key, this.state[key]);
    }
    for (const pic of this.state.pictures) {
      form.append('pictures', pic);
    }
    for (const category of this.state.categories) {
      form.append('categories', category);
    }
    axios.post('/api/', form, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((result) => {
        this.props.fetchData();
        this.props.clearNewPin();
        this.props.toggleShowForm(false);
        this.setState({ loading: false });
      })
      .catch((error) => {
        // TODO: Add validation
        console.log(error);
        this.setState({ loading: false });
      });
  }
  handlePictureUpload = (event) => {
    this.setState({
      pictures: [...this.state.pictures, event.target.files[0]]
    });
  }
  render () {
    return (
      <div>
        {this.props.showForm &&
          <form className='pin_form' onSubmit={this.handleSubmit}>
            <div className='x' onClick={() => this.props.toggleShowForm(false)} />
            <div className='pin_form__inner'>
              <label>Address</label>
              <div className='address_input'>
                <input
                  name='address'
                  type="text"
                  onChange={this.handleInputChange} />
                <button onClick={this.handleGeocodeNewPin}>Locate</button>
              </div>
              <label> {this.state.formatted_address} </label>
              <label> Categories </label>
              <select multiple name='categories' size='6' value={this.state.categories} onChange={this.handleMultipleSelect}>
                <option value='Chairs'>Chairs</option>
                <option value='Tables'>Tables</option>
                <option value='Tools'>Tools</option>
                <option value='Games'>Games</option>
                <option value='Kitchen'>Kitchen</option>
                <option value='Electronics'>Electronics</option>
              </select>
              <br />
              <label>Description</label>
              <input
                name="description"
                type="text"
                onChange={this.handleInputChange} />
              <input
                name="pictures"
                id='pictures'
                type="file"
                ref={ref => { this.fileInput = ref; }}
                onChange={this.handlePictureUpload} />
              <button type='button' onClick={() => this.fileInput.click()}> Add pictures </button>
              <ul>{this.state.pictures.map((file, index) => <li key={index}>{file.name}</li>)}</ul>
              {this.state.loading
                ? <ReactLoading type={'spin'} color={'blue'} className='spinner'/>
                : <input type='submit' id='submit' value='GO!' />
              }
            </div>
          </form>
        }
        <div className="action-buttons">
          <div className='action_item' onClick={this.showForm}>
            <i className='fa fa-3x fa-plus-square'></i>
          </div>
          <SlidingInput
            fa_icon='search'
            onChange={this.handleInputChange}
            handleEnter={this.handleSearch}
            name='searchAddress' />
        </div>
      </div>
    );
  }
}

PinForm.propTypes = {
  geocoder: PropTypes.object,
  toggleShowForm: PropTypes.func,
  setNewPin: PropTypes.func,
  clearNewPin: PropTypes.func,
  handleGeocodeSearch: PropTypes.func,
  showForm: PropTypes.bool,
};

export default PinForm;
