import React, { useState, useEffect } from 'react';
import MainThumbNail from '../components/MainThumbNail';
import Scroll from '../components/infinite_scroll/Scroll';
import Slider from '../components/Carousels/NetflixSlider';
import axios from 'axios';
import ENV from '../../env';

const Recent = () => {
  const [musicContentsData, setMusicContentsData] = useState(null);
  const [onLoading, setOnLoading] = useState(true);
  useEffect(() => {
    axios.get(`${ENV.apiServer}/video/음악/recent`).then(res => {
      setMusicContentsData(res.data);
      setOnLoading(false);
    });
  }, []);
  const requestCategories = [
    '교육',
    '스포츠',
    '과학기술',
    '엔터테인먼트',
    '코미디',
    '여행',
    '뷰티패션',
    '영화애니메이션',
    '노하우스타일',
    '뉴스정치',
    '애완동물동물',
  ];
  if (onLoading) return <MainThumbNail requestUrl={'recent-thumbnail-video'} />;
  return (
    <>
      <MainThumbNail requestUrl={'recent-thumbnail-video'} />
      {musicContentsData.length && (
        <Slider categoryName={'음악'}>
          {musicContentsData.map(content => (
            <Slider.Item
              movie={content._source}
              key={content._source.video_id}
            />
          ))}
        </Slider>
      )}
      <Scroll categoryList={requestCategories} contentsType={'/recent'} />
    </>
  );
};

export default Recent;
