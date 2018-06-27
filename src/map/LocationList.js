import React from 'react';
import './LocationList.css'
const LocationList = (props) =>
<div className='grid-container'>
    {props.pinLocations.map((pin)=>
        <li className='grid-item'
            key={pin.id}
            id={pin.id}
            onMouseEnter={props.handleMouseEnter}
        > {pin.data.name} </li>)}
</div>

export default LocationList
