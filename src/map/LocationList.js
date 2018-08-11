import React from 'react';
import './LocationList.css'
import SlideShow from './SlideShow';
import Categories from './Categories';
import ShortAddress from './ShortAddress';
import Description from './Description';

const LocationList = (props) =>
<div className='location_list'>
    <div className='grid-container'>
        {props.pinLocations.map((pin)=>
            <div className='grid-item' key={pin.id} id={pin.id} onMouseEnter={props.handleMouseEnter} onMouseLeave={props.handleMouseLeave}>
                <div className='content'>
                    <SlideShow pictures={pin.pictures}/>
                    <Categories categories={pin.categories}/>
                    <Description description={pin.description} />
                    <ShortAddress suburb={pin.suburb} state={pin.state} postcode={pin.postcode} />
                </div>
            </div>
        )}
</div>
</div>
export default LocationList
