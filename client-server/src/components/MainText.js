import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledText = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 1rem;
  border-radius: 0.2vw;
  box-shadow: none;
  font-size: 4rem
  margin-bottom: 0.2rem;
  color: white;
  width: 40%;
  margin-left: 5%;
  animation: title-blur 4000ms ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }

  @keyframes title-blur {
    0% {
        background-color: rgba(0, 0, 0, 0.9);
    }
    100% {
        background-color: rgba(0, 0, 0, 0.3);
    }
  }
`;

const MainText = ({ name }) => {
  return <StyledText>{name}</StyledText>;
};

MainText.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MainText;
