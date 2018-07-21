import React from 'react';
import SlidingInput from './SlidingInput'

const ActionButtons = (props) =>
    <div className="action-buttons">
        <SlidingInput fa_icon='plus-square' />
        <SlidingInput fa_icon='search'/>
    </div>

export default ActionButtons