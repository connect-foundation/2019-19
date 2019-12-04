import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import movies from '../Carousels/data/movie';
import Slider from '../Carousels/NetflixSlider';

function Hi1() {
  let currentScroll = 0;
  let presentView = 0;
  const categoryList = [
    '스포츠',
    '음악',
    '교육',
    '영화/애니메이션',
    '과학기술',
    '엔터테인먼트',
    '코미디',
    '뷰티/패션',
    '여행',
    '노하우/스타일',
    '뉴스/정치',
    '애완동물/동물',
  ];
  let currentList = [];

  const [flag, setFlag] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [arr, setArr] = useState([]);

  const handleInfinity = debounce(() => {
    if (isEnd) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 100 // 숫자 100 수정하자.
    ) {
      currentScroll = document.documentElement.scrollTop; // 데이터 요청후 스크롤바 위치 조정
      console.log('loading~~');
      // axios.get(bookAPI).then(res => {
      //   const result = res.data.slice(preItems, items);
      //   console.log(result);
      //   document.documentElement.scrollTop = currentScroll;
      //   // setPreItems(items);
      //   // setItems(items + 20);
      //   preItems = items;
      //   items += 20;

      //   console.log(items);
      //   return result;
      // });

      currentList = currentList.concat(
        categoryList.slice(presentView, presentView + 3),
      );
      setArr(currentList);
      if (categoryList.slice(presentView, presentView + 3) === [])
        setIsEnd(true);
      presentView += 3;
      setFlag(true);
      document.documentElement.scrollTop = currentScroll;
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener('scroll', handleInfinity);
    return () => {
      window.addEventListener('scroll', handleInfinity);
    };
  }, []);

  return (
    <>
      {flag ? (
        <div>
          {arr.map(() => {
            return (
              <Slider>
                {movies.map(movie => (
                  <Slider.Item movie={movie} key={movie.id} />
                ))}
              </Slider>
            );
          })}
        </div>
      ) : (
        <div />
      )}
    </>
  );
}
export default Hi1;
