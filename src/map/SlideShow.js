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


  renderSlide = () =>
    <div className='img_wrapper'>
      <span className='prev' onClick={this.scrollLeft}>&#10094;</span>
        <img src={this.props.pictures[this.state.currentPic]}  alt="alternative" />
       <span className='next' onClick={this.scrollRight}>&#10095;</span>
    </div>

  renderSingleImage = () => <div className='img_wrapper'>
                              <img src={this.props.pictures[this.state.currentPic]}  alt="alternative" />
                            </div>

  renderPlaceHolder = () => <div className='img_wrapper'>
                              <img src='/placeholder.jpg'  alt="alternative" />
                            </div>

  renderImage = () => {
    if (this.props.pictures.length === 0) {
      return this.renderPlaceHolder()
    } else if (this.props.pictures.length === 1) {
      return this.renderSingleImage()
    }
    return this.renderSlide()
  }

  render() {
    return (
      <div className='slider'>
        {this.renderImage()}
      </div>
    );
  }
}

function mod(n, m) {
    return ((n % m) + m) % m;
  }

export default SlideShow
