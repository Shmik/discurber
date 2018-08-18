import React from 'react';
import Categories from './Categories';
import Description from './Description';
import SlideShow from './SlideShow'
import TimeDifference from './TimeDifference'
import './PinDetail.css'
const PinDetail = ({pin}) => {
    if (pin){
      return (
          <div className='pin_detail'>
                <SlideShow outerClass='slider__pin_detail' pictures={pin.pictures}/>
                <Categories categories={pin.categories}/>
                <Description description={pin.formatted_address} />
                <Description description={pin.description} />
                <TimeDifference timeDifference={pin.time_since_created} />
          </div>
      );
    }
    return(<div>No detail pin</div>)
}

export default PinDetail;