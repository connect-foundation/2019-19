import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBtn = styled.div`
  margin: auto 2rem;
  font-weight: 0.1rem;
  color: white;
  display: inline-block;

  &:hover {
    cursor: pointer;
    color: lightgray;
  }
`;

const PageBtn = ({ name }) => {
  return (
    <StyledBtn>
      <p>{name}</p>
    </StyledBtn>
  );
};

PageBtn.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PageBtn;
