import React from 'react';
import './CategoriesDetail.css'
const Categories = (props) => {
    return (
        <div className='categoriesList__detail'>
            {props.categories.map((category, index)=> <div key={index} className='categoryItem__detail'> {category} </div>)}
        </div>
    );
}

export default Categories;