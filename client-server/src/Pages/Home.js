import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainThumbNail from '../components/MainThumbNail';
import Slider from '../components/Carousels/NetflixSlider';
import movies from '../components/Carousels/data/movie';
import Scroll from '../components/infinite_scroll/Scroll';

const apiServer = 'http://localhost:8000';

const Home = () => {
  // const requestCategories = [
  //   '스포츠',
  //   '음악',
  //   '교육',
  //   // '영화/애니메이션',
  //   '과학기술',
  //   '엔터테인먼트',
  //   '코미디',
  //   // '뷰티/패션',
  //   '여행',
  //   // '노하우/스타일',
  //   // '뉴스/정치',
  //   // '애완동물/동물',
  // ];
  // const [sportsContents, setSportsContents] = useState([]);
  // const [eduContents, setEduContents] = useState([]);
  // const [musicContents, setMusicContents] = useState([]);
  // const [contentsOnLoading, setContentsOnLoading] = useState(true);

  // useEffect(() => {
  //   axios.get(`${apiServer}/video/스포츠`).then(sportsResponse => {
  //     console.log(sportsResponse);
  //     setSportsContents(sportsResponse.data);
  //     axios.get(`${apiServer}/video/교육`).then(eduResponse => {
  //       setEduContents(eduResponse.data);
  //       axios.get(`${apiServer}/video/음악`).then(musicResponse => {
  //         setMusicContents(musicResponse.data);
  //         setContentsOnLoading(false);
  //       });
  //     });
  //   });
  // }, []);

  // if (contentsOnLoading) return <MainThumbNail />;

  return (
    <>
      <MainThumbNail />
      <Slider>
        {movies.map(movie => (
          <Slider.Item movie={movie} key={movie.id} />
        ))}
      </Slider>
      <Scroll />
    </>
  );
};

export default Home;
