import React from 'react';
import PropTypes from 'prop-types';

import './Categories.css';

const Categories = (props) => {
  return (
    <div className='categoriesList'>
      {props.categories.map((category, index) => <div key={index} className='categoryItem'> {category} </div>)}
    </div>
  );
};

Categories.propTypes = {
  categories: PropTypes.object
};

export default Categories;
