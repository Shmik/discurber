import React from 'react';
import PropTypes from 'prop-types';

import './TimeDetail.css';

const TimeDetail = (props) => {
  return (
    <div className='time_detail'>
      Listed {props.timeDifference} ago
    </div>
  );
};

TimeDetail.propTypes = {
  timeDifference: PropTypes.string
};

export default TimeDetail;
