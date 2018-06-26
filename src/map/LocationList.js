import React from 'react';

const LocationList = (props) => props.pinLocations.map(
    (pin)=> <li> {pin.data.name} </li>
    )

export default LocationList
