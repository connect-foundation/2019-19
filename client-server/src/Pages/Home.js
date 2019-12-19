import React, { useState, useEffect, useContext } from 'react';
import MainThumbNail from '../components/MainThumbNail';
import Scroll from '../components/infinite_scroll/Scroll';
import Slider from '../components/Carousels/NetflixSlider';
import axios from 'axios';
import ENV from '../../env';
import { PreviewPlayContext } from '../contexts/PreviewPlayContext';

const Home = () => {
  const { detailPreviewPlaying, setDetailPreviewPlaying } = useContext(
    PreviewPlayContext,
  );
  const [movieData, setMovieData] = useState(null);
  const [onLoading, setOnLoading] = useState(true);

  useEffect(() => {
    if (detailPreviewPlaying) setDetailPreviewPlaying(false);
    axios.get(`${ENV.apiServer}/video/영화애니메이션`).then(res => {
      setMovieData(res.data);
      setOnLoading(false);
    });
  }, []);

  const requestCategories = [
    '교육',
    '음악',
    '과학기술',
    '엔터테인먼트',
    '코미디',
    '여행',
    '뷰티패션',
    '스포츠',
    '노하우스타일',
    '뉴스정치',
    '애완동물동물',
  ];
  if (onLoading)
    return <MainThumbNail requestUrl={'popular-thumbnail-video'} />;
  return (
    <>
      <MainThumbNail requestUrl={'popular-thumbnail-video'} />
      {movieData.length && (
        <>
          <Slider categoryName={'영화애니메이션'}>
            {movieData.map(content => (
              <Slider.Item
                movie={content._source}
                key={content._source.video_id}
              />
            ))}
          </Slider>
        </>
      )}
      <Scroll categoryList={requestCategories} />
    </>
  );
};

export default Home;
