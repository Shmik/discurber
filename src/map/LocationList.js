import React from 'react';
import './LocationList.css'
const LocationList = (props) =>
<div className='grid-container'>
    {props.pinLocations.map((pin)=> <li className='grid-item'> {pin.data.name} </li>)}
</div>





export default LocationList
