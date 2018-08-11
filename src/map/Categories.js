import React from 'react';
import './Categories.css'
const Categories = (props) => {
    return (
        <div className='categoriesList'>
            {props.categories.map((category, index)=> <div key={index} className='categoryItem'> {category} </div>)}
        </div>
    );
}

export default Categories;