import React from "react";
import './SlideShow.css'

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPic: 0};
    this.scrollLeft = this.scrollLeft.bind(this);
    this.scrollRight = this.scrollRight.bind(this);
  }
  scrollLeft() {
    this.setState(prevState=>({
      currentPic: mod(prevState.currentPic -1,   this.props.pictures.length)
    }));
  }
  scrollRight() {
    this.setState(prevState=>({
      currentPic: mod(prevState.currentPic + 1,   this.props.pictures.length)
    }));
  }

  render() {
    return (
      <div className='slider'>
      <span className='prev' onClick={this.scrollLeft}>&#10094;</span>
        <img src={this.props.pictures[this.state.currentPic]} alt={this.props.pictures[this.state.currentPic].split('/').pop()} />
      <span className='next' onClick={this.scrollRight}>&#10095;</span>
      </div>
    );
  }
}

function mod(n, m) {
    return ((n % m) + m) % m;
  }

export default SlideShow
