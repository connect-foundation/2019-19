/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import IconArrowDown from '../Icons/IconArrowDown';
import './ShowDetailsButton.scss';

const ShowDetailsButton = ({ onClick }) => (
  <button onClick={onClick} className="show-details-button">
    <span>
      <IconArrowDown />
    </span>
  </button>
);

ShowDetailsButton.propTypes = {
  onClick: PropTypes.any.isRequired,
};

export default ShowDetailsButton;
