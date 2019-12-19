import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const Container = styled.h5`
  display: inline-block;
  border: solid 0.05rem lightgray;
  border-radius: 0.2rem;
  background-color: rgba(20, 20, 20, 0.7);
  color: lightgray;
  padding: 0.3rem;
  margin: 0.2rem;
  margin-left: 0;

  &:hover {
    cursor: pointer;
    color: white;
  }
`;

const Tag = ({ name }) => {
  const history = useHistory();
  const searchByTagName = () => {
    history.push(`/search/${name}`);
  };
  const history = useHistory();
  return (
    <>
      <Container onClick={searchByTagName}>{`#${name}`}</Container>
    </>
  );
};

Tag.propTypes = {
  name: PropTypes.string.isRequired,
};

Tag.defaultProps = {
  name: '',
};

export default Tag;
