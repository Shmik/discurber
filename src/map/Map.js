import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const Map = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    center={props.center}
    defaultZoom={13}
  >
    {props.pinLocations.map(pin => <Marker key={pin.id}
      icon={(pin.id === props.activePin)
        ? 'green-dot.png'
        : 'blue-dot.png'
      }
      onClick={() => { props.setPinDetail(pin.id); }}
      shape={
        {
          coords: [1, 1, 1, 20, 18, 20, 18, 1],
          type: 'poly',
          rand: 'rbadomstuff'
        }
      }
      position={{ lat: pin.lat, lng: pin.lng }} />)}
    {props.newPin.exists && <Marker position={{ lat: props.newPin.lat, lng: props.newPin.lng }} />}
  </GoogleMap>
));

export default Map;
