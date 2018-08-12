import React from 'react';

import './TimeDifference.css'

const TimeDifference = (props) => {
  return (
    <div className='time_difference'>
      {props.timeDifference}
    </div>
  );
}

export default TimeDifference;