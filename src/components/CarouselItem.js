/* eslint-disable react/prop-types */
import React from 'react';
import styled from 'styled-components';

const StyledItem = styled.div`
  background: green;
  flex: 0 0 19.7%;
  text-align: center;
  margin: 0 2px;
  transition: transform 300ms ease 100ms;

  &:hover + & {
    transform: translateX(25%);
  }
  &:hover {
    transform: scale(1.5) !important;
  }
`;

const CarouselItem = ({ name }) => {
  return <StyledItem>{name}</StyledItem>;
};

export default CarouselItem;
