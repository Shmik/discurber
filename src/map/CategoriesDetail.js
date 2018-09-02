import React from 'react';
import PropTypes from 'prop-types';

import './CategoriesDetail.css';

const CategoriesDetail = (props) => {
  return (
    <div className='categoriesList__detail'>
      {props.categories.map((category, index) => <div key={index} className='categoryItem__detail'> {category} </div>)}
    </div>
  );
};

CategoriesDetail.propTypes = {
  categories: PropTypes.array
};

export default CategoriesDetail;
