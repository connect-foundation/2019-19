import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: rgba(51, 51, 51, 0.4);
  border-width: 0;
  padding: 0.75em 2.3em;
  border-radius: 0.2vw;
  box-shadow: none;
  font-size: 1.1vw;
  margin-bottom: 0.75em;
  color: white;
  margin-top: 10%;
  margin-left: 3%;
  &:hover {
    cursor: pointer;
  }
`;

const MainButton = ({ name }) => {
  return <StyledButton>{name}</StyledButton>;
};

export default MainButton;
