import React from 'react';
import styled from 'styled-components';

const StyledBtn = styled.div`
  margin: auto 2rem;
  font-weight: 0.1rem;
  color: white;
  display: inline-block;

  &:hover {
    cursor: pointer;
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
