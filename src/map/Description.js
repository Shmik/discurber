import React from 'react';
import './Description.css'

const Description = (props) => {
    return (
        <div className='description'>
            {props.description}
        </div>
    );
}

export default Description;