import React, { useState, useEffect, useContext } from 'react';
import { css } from '@emotion/core';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';
import PlayButton from './PlayButton';
import MainText from './MainText';
import LikeBtn from './like/like';
import MylistBtn from './like/mylist';
import Tag from '../components/Tag/Tag';
import TagsContainer from './StyledComponents/TagsContainer';
import LoginContext from '../loginContextApi/context';
import ENV from '../../env';

const axios = require('axios');

const apiServer = ENV.apiServer;

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
  justify-content: space-evenly;
  animation: fade-in-thumbnail 1000ms ease;

  @keyframes fade-in-thumbnail {
    0% {
      -webkit-filter: blur(1.17rem);
      -o-filter: blur(1.17rem);
      -ms-filter: blur(1.17rem);
      filter: blur(1.17rem);
    }
    100% {
      -webkit-filter: blur(0);
      -o-filter: blur(0);
      -ms-filter: blur(0);
      filter: blur(0);
    }
  }
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35%;
  height: 8%;
  margin-left: 5%;
`;

const MainThumbNail = ({ requestUrl }) => {
  const [onLoading, setOnLoading] = useState(true);
  const [thumbNailImg, setThumbNailImg] = useState();
  const [hide, setHide] = useState(0);
  const [thumbNailTitle, setThumbNailTitle] = useState('로딩중');
  const [thumbNailTags, setThumbNailTags] = useState(null);
  const [thumbNailId, setThumbNailId] = useState();

  const { userInfo } = useContext(LoginContext);

  useEffect(() => {
    axios.get(`${apiServer}/video/${requestUrl}`).then(thumbNailData => {
      if (thumbNailData.data._source) {
        thumbNailData.data = thumbNailData.data._source;
      }
      setThumbNailId(thumbNailData.data.video_id);
      setThumbNailTitle(thumbNailData.data.name);
      setThumbNailImg(thumbNailData.data.thumbnail_img_url);
      axios
        .get(`${apiServer}/video/tags/${thumbNailData.data.video_id}`)
        .then(tagResponse => {
          setThumbNailTags(tagResponse.data);
          setHide(1);
          setOnLoading(false);
        });
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
          <PlayButton name="▶  재생" videoId={thumbNailId} />
          {userInfo && [
            <LikeBtn
              userId={userInfo}
              thumbNailId={thumbNailId}
              key={`${thumbNailId}1`}
            />,
            <MylistBtn
              userId={userInfo}
              thumbNailId={thumbNailId}
              key={`${thumbNailId}2`}
            />,
          ]}
        </StyledButtonsContainer>
        {thumbNailTags && (
          <TagsContainer marginLeft={5}>
            {thumbNailTags.map((tagObject, index) => (
              <Tag name={tagObject.name} key={index} />
            ))}
          </TagsContainer>
        )}
      </StyledThumbNail>
    </>
  );
};

export default MainThumbNail;
