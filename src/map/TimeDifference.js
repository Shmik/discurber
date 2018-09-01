import React from 'react';
import PropTypes from 'prop-types';

import './TimeDifference.css';

const TimeDifference = (props) => {
  return (
    <div className='time_difference'>
      {props.timeDifference}
    </div>
  );
};

TimeDifference.propTypes = {
  timeDifference: PropTypes.string
};

export default TimeDifference;
