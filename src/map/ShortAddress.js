import React from 'react';

import './ShortAddress.css'

const ShortAddress = (props) => {
  return (
    <div className='short_address'>
      {props.suburb}, {props.state} {props.postcode}
    </div>
  );
}

export default ShortAddress;