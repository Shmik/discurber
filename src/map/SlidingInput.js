import React from 'react';
import './SlidingInput.css'

const SlidingInput = (props) =>
    <div className="sliding-input">
        <div className='sliding-input__inner'>
            <i className= {"fa fa-3x fa-" + props.fa_icon}  ></i>
            <input type="text" placeholder='Please enter a location' />
        </div>
    </div>

export default SlidingInput
