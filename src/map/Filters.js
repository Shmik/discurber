import React, { Component } from 'react';
import './Filters.css'

class Filters extends Component{
    constructor(){
        super()
        this.state = {
          categories: '',
          description: '',
        }
    }
    handleInputChange = (event) =>{
      const target = event.target;
      const name = target.name;
      const value = target.value;

      this.setState({
        [name]: value
      });
    }

    setFilters = () => {
      this.props.setFilters(
        this.state
      )
    }

    render(){
      return (
        <div className='filters'>
          <select name='categories' value={this.state.categories} onChange={this.handleInputChange}>
            <option value='' disabled>Category </option>
            <option value='chairs'>Chairs</option>
            <option value='tables'>Tables</option>
            <option value='tools'>Tools</option>
            <option value='games'>Games</option>
            <option value='kitchen'>Kitchen</option>
            <option value='electronics'>Electronics</option>
          </select>
          <input name='description' onChange={this.handleInputChange} placeholder='Desctription' />
          <button  onClick={this.setFilters}>GO</button>
        </div>
      );
    }


}

export default Filters;