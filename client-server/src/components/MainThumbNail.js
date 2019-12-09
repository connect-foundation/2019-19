import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/core';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import MainButton from './MainButton';
import MainText from './MainText';
import LikeBtn from './like/like';
import MylistBtn from './like/mylist';
import LoginContext from '../loginContextApi/context';
<<<<<<< HEAD

const axios = require('axios');

const apiServer = 'http://localhost:8000';
=======
import ENV from '../../env';

const axios = require('axios');

const apiServer = ENV.apiServer;
>>>>>>> 7d103901d5f63078c32a9c5e700affd191b780b9

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
  justify-content: space-between;
  align-items: center;
  width: 35%;
  height: 8%;
  margin-left: 5%;
`;

const MainThumbNail = () => {
  const [onLoading, setOnLoading] = useState(true);
  const [thumbNailImg, setThumbNailImg] = useState(null);
  const [hide, setHide] = useState(0);
  const [thumbNailTitle, setThumbNailTitle] = useState('로딩중');
  const [thumbNailId, setThumbNailId] = useState(null);
  const { userInfo } = useContext(LoginContext);

  useEffect(() => {
    axios.get(`${apiServer}/video/main-thumbnail-video`).then(thumbNailData => {
<<<<<<< HEAD
      console.log(thumbNailData);
      setThumbNailId(thumbNailData.data.video_id);
      setThumbNailTitle(thumbNailData.data.name);
      setThumbNailImg(thumbNailData.data.thumbnail_img_url);
      setHide(1);
      setOnLoading(false);
=======
      setThumbNailId(thumbNailData.data.video_id);
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
>>>>>>> 7d103901d5f63078c32a9c5e700affd191b780b9
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
          <MainButton name="▶  재생" />
          {userInfo && [
            <LikeBtn userId={userInfo} thumbNailId={thumbNailId} />,
            <MylistBtn userId={userInfo} thumbNailId={thumbNailId} />,
          ]}
        </StyledButtonsContainer>
      </StyledThumbNail>
    </>
  );
};

export default MainThumbNail;
