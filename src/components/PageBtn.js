/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledBtn = styled.div`
  margin: auto 2rem;
  font-weight: 0.1rem;
  color: white;
  //   border: solid white;

  &:hover {
    cursor: pointer;
    border-bottom: solid white 0.05rem;
  }
`;

const PageBtn = ({ name }) => {
  return (
    <StyledBtn>
      <p>{name}</p>
    </StyledBtn>
  );
};

export default PageBtn;
