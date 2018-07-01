import React from "react";

class SlideShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {currentPic: 0};
    this.scrollLeft = this.scrollLeft.bind(this);
  }
  scrollLeft() {
    this.setState(prevState=>({
      currentPic: mod(prevState.currentPic -1,   this.props.pictures.length)
    }));
  }

  render() {
    return (
      <div>
      <span onClick={this.scrollLeft}>LEFT</span>
        <img src={this.props.pictures[this.state.currentPic]} />
      <span>RIGHT</span>
      </div>
    );
  }
}

function mod(n, m) {
    return ((n % m) + m) % m;
  }

export default SlideShow
