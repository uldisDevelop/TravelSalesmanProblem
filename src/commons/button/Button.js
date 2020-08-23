import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.scss';

export default class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node
  };

  static defaultProps = {
    onClick: () => {},
    children: ''
  };

  render() {
    const { children, onClick } = this.props;

    return (
      <button
        type='button'
        onClick={onClick}
        data-test='buttonComponent'
        className={styles.button}
      >
        {children}
      </button>
    );
  }
}
