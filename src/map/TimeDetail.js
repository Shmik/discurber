import React from 'react';

import './TimeDetail.css'

const TimeDetail = (props) => {
  return (
    <div className='time_detail'>
      Listed {props.timeDifference} ago
    </div>
  );
}

export default TimeDetail;