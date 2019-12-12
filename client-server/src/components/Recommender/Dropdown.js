import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import RecommendedContent from './RecommendedContent';

const DropdownContainer = styled.div`
  padding: 0;
  position: absolute;
  right: 6rem;
  width: 24rem;
  height: 30rem;
  border: solid lightgray 0.1rem;
  background-color: rgba(20, 20, 20, 0.9);
  overflow: scroll;
  animation: srr 800ms ease;
  @keyframes srr {
    0% {
      height: 0%;
      opacity: 0;
    }
    100% {
      height: 30rem;
      opacity: 1;
    }
  }
`;

const Dropdown = () => {
  return (
    <DropdownContainer>
      <RecommendedContent />
      <RecommendedContent />
      <RecommendedContent />
      <RecommendedContent />
      <RecommendedContent />
    </DropdownContainer>
  );
};

Dropdown.propTypes = {};

export default Dropdown;
