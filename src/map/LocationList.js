import React from 'react';
import './LocationList.css'
import SlideShow from './SlideShow';

const LocationList = (props) =>
<div className='location_list'>
    <div className='grid-container'>
        {props.pinLocations.map((pin)=>
            <div className='grid-item' key={pin.id} id={pin.id} onMouseEnter={props.handleMouseEnter} onMouseLeave={props.handleMouseLeave}>
                <div className='content'>
                    <SlideShow pictures={pin.pictures}/>
                    {pin.categories.map((category, index)=><div key={index}>{category}</div>)}
                    <p>{pin.description}</p>
                </div>
            </div>
        )}
</div>
</div>
export default LocationList
