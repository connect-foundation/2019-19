import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.h3`
  display: inline-block;
  border: solid 0.1rem white;
  border-radius: 0.2rem;
  background-color: rgba(20, 20, 20, 0.5);
  color: white;
  padding: 0.5rem;
  margin: auto;

  &:hover {
    cursor: pointer;
    color: lightgray;
  }
`;

const Tag = ({ name }) => {
  return <Container>{`#${name}`}</Container>;
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  name: '',
};

export default Tag;
