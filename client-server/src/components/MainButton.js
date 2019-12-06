import React from 'react';
import PropTypes from 'prop-types';
import PlayBtn from './StyledComponents/CheckBoxLabel';
import CheckBox from './StyledComponents/CheckBox';

const MainButton = ({ name }) => {
  return (
    <div>
      <CheckBox />
      <PlayBtn>{name}</PlayBtn>
    </div>
  );
};

MainButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MainButton;
