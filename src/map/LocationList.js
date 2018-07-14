import React from 'react';
import './LocationList.css'
import SlideShow from './SlideShow';

const LocationList = (props) =>
 <div>
<div className='grid-container'>
    {props.pinLocations.map((pin)=>
        <div className='grid-item' key={pin.id} id={pin.id} onMouseEnter={props.handleMouseEnter} onMouseLeave={props.handleMouseLeave}>
            <div className='content'>
                <p>{pin.description}</p>
                <SlideShow pictures={pin.pictures}/>
            </div>
        </div>
    )}
</div>
</div>
export default LocationList
