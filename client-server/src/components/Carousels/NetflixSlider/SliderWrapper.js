import React from 'react';
import PropTypes from 'prop-types';
import './SliderWrapper.scss';

const SliderWrapper = ({ children }) => (
  <div className="slider-wrapper">{children}</div>
);

SliderWrapper.propTypes = {
  children: PropTypes.any.isRequired,
};

export default SliderWrapper;
