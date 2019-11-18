import React from 'react';
import styled from 'styled-components';
import MainButton from './MainButton';
import MainText from './MainText';
const axios = require('axios');

// Make a request for a user with a given ID
axios
  .get('https://picsum.photos/1600/640')
  .then(function(response) {
    console.log(response);
  })
  .catch(function(error) {
    console.log(error);
  });

const ImgFile = 'https://picsum.photos/1600/640';

const StyledThumbNail = styled.div`
  height: 40rem;
  width: 100%;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  width: 35%;
  margin-left: 5%;
`;

const MainThumbNail = () => {
  return (
    <StyledThumbNail bg={ImgFile}>
      <MainText
        name="너의 결혼식"
        contents="첫눈에 반하면 뭐해, 엇갈리고 또 엇갈리는데. 고등학교 시절 첫 사랑 승희와 원치않는 이별을 한 우연"
      />
      <StyledButtonsContainer>
        <MainButton name="▶  Play" />
        <MainButton name="✅  My List" />
        <MainButton name="ⓘ  Learn More" />
      </StyledButtonsContainer>
    </StyledThumbNail>
  );
};

export default MainThumbNail;
