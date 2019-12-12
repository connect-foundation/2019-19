import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBtn = styled.div`
  margin: auto 0.5rem;
  font-weight: 0.1rem;
  color: white;
  display: inline-block;

  &:hover {
    cursor: pointer;
    color: lightgray;
  }
`;

const SearchIcon = ({ onClick }) => {
  return <StyledBtn onClick={onClick}>🔍</StyledBtn>;
};

SearchIcon.propTypes = {
  onClick: PropTypes.func,
};

SearchIcon.defaultProps = {
  onClick() {},
};

export default SearchIcon;
