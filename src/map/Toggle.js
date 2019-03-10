import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Toggle extends Component {
  constructor (props) {
    super(props);
    this.state = {
      on: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle () {
    this.setState({
      on: !this.state.on,
    });
  }

  render () {
    const { children } = this.props;
    return children(this.state.on, this.toggle);
  }
}

Toggle.propTypes = {
  children: PropTypes.func.isRequired,
};
