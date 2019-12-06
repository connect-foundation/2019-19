import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginContext from '../loginContextApi/context';
import Slider from '../components/Carousels/NetflixSlider';
import ENV from '../../env';

const { apiServer } = ENV;

const MyVideos = () => {
  const { userInfo } = useContext(LoginContext);
  const [myVideoList, setMyVideoList] = useState([]);
  const [toBeRendered, setToBeRendered] = useState([]);
  const [onLoading, setOnLoading] = useState(true);
  const [numOfContentsInEachRaw, setNumOfContentsInEachRaw] = useState(5);
  const [sliceIndexArray, setSliceIndexArray] = useState([]);

  useEffect(() => {
    if (userInfo) {
      axios
        .post(`${apiServer}/mylist/my-videos`, {
          id: userInfo,
        })
        .then(res => {
          setMyVideoList(res.data);
          const numOfMyVideos = res.data.length;
          if (res.data.length === 0) return; // 유저가 찜한 컨텐츠가 없다는 view 표시해야
          const raws = Math.ceil(numOfMyVideos / numOfContentsInEachRaw);
          const temp = [];
          for (let i = 0; i < raws; i++) {
            temp.push(i);
          }
          setSliceIndexArray(temp);
          setOnLoading(false);
        });
    }
  }, userInfo);

  if (onLoading) return null;

  return (
    <>
      {sliceIndexArray.map(e => {
        return (
          <Slider>
            {myVideoList
              .slice(
                e * numOfContentsInEachRaw,
                (e + 1) * numOfContentsInEachRaw,
              )
              .map(content => {
                if (content)
                  return <Slider.Item movie={content} key={content.video_id} />;
              })}
          </Slider>
        );
      })}
    </>
  );
};

export default MyVideos;
