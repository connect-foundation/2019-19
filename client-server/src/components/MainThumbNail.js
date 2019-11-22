import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import MainButton from './MainButton';
import MainText from './MainText';

const axios = require('axios');

const ImgUrl = 'https://picsum.photos/1600/640';
const apiServer = 'http://localhost:8000';

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
  const [thumbNailTitle, setThumbNailTitle] = useState('로딩중');

  useEffect(() => {
    axios.get(`${apiServer}/video/main-thumbnail-video`).then(thumbNailData => {
      setThumbNailTitle(thumbNailData.data.name);
      axios
        .get(thumbNailData.data.thumbnail_img_url, {
          responseType: 'arraybuffer',
        })
        .then(img => {
          const blob = new Blob([img.data], {
            type: img.headers['content-type'],
          });
          const thumbNailImage = URL.createObjectURL(blob);
          setOnLoading(false);
          setThumbNailImg(thumbNailImage);
          setHide(1);
        })
        .catch(err => console.log(err));
    });
  }, []);

  return (
    <>
      <ClipLoader
        css={css`
          margin: 20% 48%;
        `}
        sizeUnit="rem"
        size={5}
        color="lightgray"
        loading={onLoading}
      />
      <StyledThumbNail bg={thumbNailImg} hide={hide}>
        <MainText name={thumbNailTitle} />
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
