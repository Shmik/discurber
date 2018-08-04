import React from 'react';

let drop = () => {

}

const Dropdown = (props) => (
    <div className="dropdown">
    <button onClick={drop} className="dropbtn">Dropdown</button>
    <div id="myDropdown" className="dropdown-content">
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
    </div>
</div>
);

export default Dropdown;props