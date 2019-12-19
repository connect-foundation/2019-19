import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import LoginContext from '../loginContextApi/context';
import { PreviewPlayContext } from '../contexts/PreviewPlayContext';
import Slider from '../components/Carousels/NetflixSlider';
import MessageOnCenter from '../components/StyledComponents/MessageOnCenter';
import ENV from '../../env';

const { apiServer } = ENV;

const MyVideos = () => {
  const { userInfo } = useContext(LoginContext);
  const { detailPreviewPlaying, setDetailPreviewPlaying } = useContext(
    PreviewPlayContext,
  );
  const [myVideoList, setMyVideoList] = useState([]);
  const [onLoading, setOnLoading] = useState(true);
  const [numOfContentsInEachRaw, setNumOfContentsInEachRaw] = useState(5);
  const [sliceIndexArray, setSliceIndexArray] = useState([]);

  useEffect(() => {
    if (detailPreviewPlaying) setDetailPreviewPlaying(false);
    if (userInfo) {
      axios
        .post(`${apiServer}/mylist/my-videos`, {
          id: userInfo,
        })
        .then(res => {
          if (res.data.length) {
            setMyVideoList(res.data);
            const numOfMyVideos = res.data.length;
            if (res.data.length === 0) return; // 유저가 찜한 컨텐츠가 없다는 view 표시해야
            const raws = Math.ceil(numOfMyVideos / numOfContentsInEachRaw);
            const temp = [];
            for (let i = 0; i < raws; i++) {
              temp.push(i);
            }
            setSliceIndexArray(temp);
          }
          setOnLoading(false);
        });
    }
  }, [userInfo]);

  if (onLoading)
    return (
      <ClipLoader
        css={css`
          margin: 4% 48%;
        `}
        sizeUnit="rem"
        size={5}
        color="lightgray"
        loading={onLoading}
      />
    );

  return (
    <>
      {myVideoList.length ? (
        sliceIndexArray.map((e, index) => {
          return (
            <Slider key={index}>
              {myVideoList
                .slice(
                  e * numOfContentsInEachRaw,
                  (e + 1) * numOfContentsInEachRaw,
                )
                .map(content => {
                  if (content)
                    return (
                      <Slider.Item movie={content} key={content.video_id} />
                    );
                })}
            </Slider>
          );
        })
      ) : (
        <MessageOnCenter>찜한 컨텐츠가 없습니다.</MessageOnCenter>
      )}
    </>
  );
};

export default MyVideos;
