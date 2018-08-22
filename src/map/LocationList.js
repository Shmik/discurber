import React from 'react';
import './LocationList.css'
import SlideShow from './SlideShow';
import Categories from './Categories';
import Description from './Description';
import TimeDifference from './TimeDifference';

const LocationList = (props) =>
<div className='location_list'>
    <div className='grid-container'>
        {props.pinLocations.map((pin)=>
            <div
                className='grid-item'
                key={pin.id} id={pin.id}
                onClick = {props.handleOnClick}
                onMouseEnter={props.handleMouseEnter}
                onMouseLeave={props.handleMouseLeave}
                >
                <div className='content'>
                    <SlideShow outerClass='slider__location_list' pictures={pin.pictures}/>
                    <Categories categories={pin.categories}/>
                    <Description description={pin.description} />
                    <TimeDifference timeDifference={pin.time_since_created} />
                </div>
            </div>
        )}
</div>
</div>
export default LocationList
