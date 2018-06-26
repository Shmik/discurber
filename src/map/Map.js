import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={{ lat: -33.858669, lng: 151.204593 }}
  >
    {props.pinLocations.map(pin => <Marker key={pin.id} position={{ lat: pin.lat, lng: pin.lng}} />)}
  </GoogleMap>
))

export default Map
