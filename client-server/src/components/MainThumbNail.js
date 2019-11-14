import React from 'react';
import styled from 'styled-components';
import MainButton from './MainButton';
import MainText from './MainText';

const ImgFile =
  'https://occ-0-988-993.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABb5HRu2dtp88SpmzDcRP87WRPBfaN82JOATtZo2qN36C6qcdREWP0UtTj277Oda1GomjOdvhgVbNJmy4_8wZSlD5_yHg.webp?r=8c8';

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
  justify-content: space-between;
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
