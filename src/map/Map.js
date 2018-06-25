import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 54.0924, lng: 12.0991 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 54.0924, lng: 12.0991}} />}
  </GoogleMap>
))

export default Map
