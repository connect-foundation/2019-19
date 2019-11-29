/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import IconArrowDown from '../Icons/IconArrowDown';
import './SlideButton.scss';

const SlideButton = ({ onClick, type }) => (
  <button className={`slide-button slide-button--${type}`} onClick={onClick}>
    <span>
      <IconArrowDown />
    </span>
  </button>
);

SlideButton.propTypes = {
  onClick: PropTypes.any.isRequired,
  type: PropTypes.any.isRequired,
};

export default SlideButton;
