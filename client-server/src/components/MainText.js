import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledText = styled.div`
  padding: 0.75em 2.3em;
  border-radius: 0.2vw;
  box-shadow: none;
  font-size: 1.1vw;
  margin-bottom: 0.75em;
  color: white;
  top: 50px;
  width: 30%;
  margin-left: 5%;
`;

const MainText = ({ name }) => {
  return (
    <StyledText>
      <h2>{name}</h2>
    </StyledText>
  );
};

MainText.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MainText;
