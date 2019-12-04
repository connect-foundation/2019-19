/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Slider from '../Carousels/NetflixSlider';

const apiServer = 'http://localhost:8000';

const InfinityScroll = ({ categoryList }) => {
  let currentScroll = 0; // 현재 스크롤 위치
  let presentView = 0; // 현재까지 보여진 케로셀 갯수
  const sliceamount = 3; // 새로 만들 케로셀 갯수

  const [curList, setCurList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [arr2, setArr2] = useState({});

  const handleInfinity = debounce(() => {
    if (isEnd) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 100 // 스크롤 여유
    ) {
      currentScroll = document.documentElement.scrollTop; // 데이터 요청후 스크롤바 위치 조정
      const sliceCategory = categoryList.slice(
        presentView,
        presentView + sliceamount,
      );

      sliceCategory.forEach((e, i) => {
        axios.get(`${apiServer}/video/${sliceCategory[i]}`).then(response => {
          setArr2(prevState => {
            return { ...prevState, [e]: response.data };
          });
          if (i === sliceCategory.length - 1) setLoading(true);
          setCurList(preState => [...preState, e]);
        });
      });

      if (categoryList.slice(presentView, presentView + sliceamount) === [])
        setIsEnd(true);
      presentView += sliceamount;
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
      {loading ? (
        <div>
          {curList.map((e, i) => {
            return (
              <Slider categoryName={e}>
                {Object.values(arr2)[i].map(content => (
                  <Slider.Item
                    movie={content._source}
                    key={content._source.video_id}
                  />
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
};

InfinityScroll.propTypes = {
  categoryList: PropTypes.array.isRequired,
};

export default InfinityScroll;
