import React from 'react';
import PropTypes from 'prop-types';

import CategoriesDetail from './CategoriesDetail';
import SlideShow from './SlideShow';
import TimeDetail from './TimeDetail';
import './PinDetail.css';
const PinDetail = ({ toggleShowDetail, pin }) => {
  if (pin) {
    return (
      <div className='pin_detail__outer'>
        <i className='fa fa-times fa-5x close_detail' onClick={() => toggleShowDetail(false)} />
        <div className='pin_detail__inner'>
          <SlideShow outerClass='slider__pin_detail' pictures={pin.pictures} />
          <TimeDetail timeDifference={pin.time_since_created} />
          <CategoriesDetail categories={pin.categories} />
          <div className='address_detail'>
            <i className="fa fa-map-marker" aria-hidden="true"></i> {pin.formatted_address}
          </div>
          <div className='description_detail'>
            {pin.description}
          </div>
        </div>
      </div>
    );
  }
  return (<div>No detail pin</div>);
};

PinDetail.propTypes = {
  toggleShowDetail: PropTypes.func,
  pin: PropTypes.object
};

export default PinDetail;
