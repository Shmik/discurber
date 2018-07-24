import React from 'react';
import './SlidingInput.css'

const SlidingInput = (props) =>
    <div className="sliding-input">
        <div className='sliding-input__inner'>
            <i className= {"fa fa-3x fa-" + props.fa_icon}  ></i>
            <input
                type="text" name={props.name}
                onChange={props.onChange}
                value={props.value}
                placeholder='Please enter a location'
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                      props.handleEnter()
                    }
                  }}
                />
        </div>
    </div>

export default SlidingInput
