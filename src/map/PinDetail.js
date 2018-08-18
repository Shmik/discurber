import React from 'react';
import SlideShow from './SlideShow';

const PinDetail = (props) => {

    return (
        <div className='pin_detail'>
            <div>
                <SlideShow pictures={props.pictures}/>
            </div>
        </div>
    );
}

export default PinDetail;