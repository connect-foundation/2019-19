import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MainButton from './MainButton';
import MainText from './MainText';
const axios = require('axios');
import { css, jsx } from '@emotion/core';

import { ClipLoader } from 'react-spinners';

const ImgUrl = 'https://picsum.photos/1600/640';

const StyledThumbNail = styled.div`
  height: 40rem;
  width: 100%;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: top 0px;
  display: flex;
  opacity: ${props => props.hide};
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
  const [onLoading, setOnLoading] = useState(true);
  const [thumbNailImg, setThumbNailImg] = useState(null);
  const [hide, setHide] = useState(0);

  useEffect(() => {
    axios
      .get(ImgUrl, { responseType: 'arraybuffer' })
      .then(response => {
        const blob = new Blob([response.data], {
          type: response.headers['content-type'],
        });
        const thumbNailImg = URL.createObjectURL(blob);
        setOnLoading(false);
        setThumbNailImg(thumbNailImg);
        setHide(1);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <ClipLoader
        css={css`
          margin: 20% 48%;
        `}
        sizeUnit={'rem'}
        size={5}
        color={'lightgray'}
        loading={onLoading}
      />
      <StyledThumbNail bg={thumbNailImg} hide={hide}>
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
    </>
  );
};

export default MainThumbNail;
