import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../components/Carousels/NetflixSlider';
import FakeUI from '../components/infinite_scroll/ScrollFakeUI';
import ENV from '../../env';

const { apiServer } = ENV;

const Popular = () => {
  const [popularVideoList, setPopularVideoList] = useState([]);
  const [onLoading, setOnLoading] = useState(true);
  const [numOfContentsInEachRaw, setNumOfContentsInEachRaw] = useState(5);
  const [sliceIndexArray, setSliceIndexArray] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem('popular-contents')) {
      const FIVE_MIN = 5 * 60 * 1000;
      const now = new Date(Date.now());
      const popularContents = JSON.parse(
        sessionStorage.getItem('popular-contents'),
      );
      const elapsedTime =
        Date.parse(now) - Date.parse(popularContents.timeStamp);
      if (elapsedTime > FIVE_MIN) {
        sessionStorage.removeItem('popular-contents');
      } else {
        setRenderingContents(popularContents);
      }
    }
    if (sessionStorage.getItem('popular-contents') === null) {
      axios.get(`${apiServer}/video/popular-videos`).then(response => {
        response.timeStamp = new Date(Date.now());
        sessionStorage.setItem('popular-contents', JSON.stringify(response));
        setRenderingContents(response);
      });
    }
  }, []);

  const setRenderingContents = contents => {
    setPopularVideoList(contents.data);
    const numOfMyVideos = contents.data.length;
    if (contents.data.length === 0) return; // 유저가 찜한 컨텐츠가 없다는 view 표시해야
    const raws = Math.ceil(numOfMyVideos / numOfContentsInEachRaw);
    const temp = [];
    for (let i = 0; i < raws; i++) {
      temp.push(i);
    }
    setSliceIndexArray(temp);
    setOnLoading(false);
  };

  if (onLoading) return <FakeUI numOfContents={5} />;

  return (
    <>
      {sliceIndexArray.map(e => {
        return (
          <Slider>
            {popularVideoList
              .slice(
                e * numOfContentsInEachRaw,
                (e + 1) * numOfContentsInEachRaw,
              )
              .map(content => {
                if (content)
                  return (
                    <Slider.Item
                      movie={content._source}
                      key={content._source.video_id}
                    />
                  );
              })}
          </Slider>
        );
      })}
    </>
  );
};

export default Popular;
