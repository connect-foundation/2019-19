import React from 'react';
import MainThumbNail from '../components/MainThumbNail';
import Scroll from '../components/infinite_scroll/Scroll';

const Home = () => {
  const requestCategories = [
    '스포츠',
    '교육',
    '음악',
    '과학기술',
    '엔터테인먼트',
    '코미디',
    '여행',
    // '뷰티/패션',
    // '영화/애니메이션',
    // '노하우/스타일',
    // '뉴스/정치',
    // '애완동물/동물',
  ];

  return (
    <>
      <MainThumbNail />
      <Scroll categoryList={requestCategories} />
    </>
  );
};

export default Home;
