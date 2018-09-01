import React from 'react';
import PropTypes from 'prop-types';

import './ShortAddress.css';

const ShortAddress = (props) => {
  return (
    <div className='short_address'>
      {props.suburb}, {props.state} {props.postcode}
    </div>
  );
};

ShortAddress.propTypes = {
  suburb: PropTypes.string,
  state: PropTypes.string,
  postcode: PropTypes.string,
};

export default ShortAddress;
