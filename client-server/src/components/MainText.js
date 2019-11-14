import React from 'react';
import styled from 'styled-components';

const StyledText = styled.p`
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

const MainText = ({ name, contents }) => {
  return (
    <StyledText>
      <h2>{name}</h2>
      <p>{contents}</p>
    </StyledText>
  );
};

export default MainText;
