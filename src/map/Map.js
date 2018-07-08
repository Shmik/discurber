import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    center = {props.center}
    defaultZoom={13}
  >
    {props.pinLocations.map(pin => <Marker key={pin.id} position={{ lat: pin.lat, lng: pin.lng}} />)}
    {props.newPin.exists && <Marker position={{ lat: props.newPin.lat, lng: props.newPin.lng}} />}
  </GoogleMap>
))

export default Map
