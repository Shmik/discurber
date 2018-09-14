import React from 'react';
import PropTypes from 'prop-types';

import CategoriesDetail from './CategoriesDetail';
import SlideShow from './SlideShow';
import TimeDetail from './TimeDetail';
import './MobilePinDetail.css';

const MobilePinDetail = ({ toggleShowMap, toggleShowDetail, pin }) => {
  const handleOnClick = (e) => {
    e.stopPropagation()
    toggleShowDetail(false);
  };

  if (pin) {
    return (
      <div className='mobile_detail__outer'>
        <div className='x' onClick={() => toggleShowDetail(false)} />
        <div className='mobile_detail__inner'>
          <SlideShow outerClass='slider__mobile_detail' pictures={pin.pictures} />
          <TimeDetail timeDifference={pin.time_since_created} />
          <CategoriesDetail categories={pin.categories} />
          <div className='address_detail'>
            <i className="fa fa-map-marker" aria-hidden="true"></i> {pin.formatted_address}
          </div>
        </div>
      </div>
    );
  }
  return (<div></div>);
};

MobilePinDetail.propTypes = {
  toggleShowDetail: PropTypes.func,
  pin: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
};

export default MobilePinDetail;
