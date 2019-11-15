import React from 'react';
import './index.css';
import styled from 'styled-components';
import Routes from './components/Routes';
import CarouselItem from './components/CarouselItem';

const StyledContainer = styled.div`
  display: flex;
  padding: 0 55px;

  &:hover - & {
    transform: translateX(-25%);
  }
`;

const Root = () => {
  return (
    <>
      <Routes />
      <StyledContainer>
        <CarouselItem name="1" />
        <CarouselItem name="2" />
        <CarouselItem name="3" />
        <CarouselItem name="4" />
        <CarouselItem name="5" />
      </StyledContainer>
    </>
  );
};

export default Root;
