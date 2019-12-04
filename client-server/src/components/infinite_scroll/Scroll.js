/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import axios from 'axios';
import Slider from '../Carousels/NetflixSlider';

const apiServer = 'http://localhost:8000';

const InfinityScroll = ({ categoryList }) => {
  let currentScroll = 0;
  let presentView = 0;
  const sliceamount = 3;

  const [curList, setCurList] = useState([]);
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [arr2, setArr2] = useState({});

  const handleInfinity = debounce(() => {
    if (isEnd) return;
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 100 // 숫자 100 수정하자.
    ) {
      currentScroll = document.documentElement.scrollTop; // 데이터 요청후 스크롤바 위치 조정
      console.log('loading~~');
      const sliceCategory = categoryList.slice(
        presentView,
        presentView + sliceamount,
      );

      sliceCategory.forEach((e, i) => {
        axios.get(`${apiServer}/video/${sliceCategory[i]}`).then(response => {
          setArr2(prevState => {
            return { ...prevState, [e]: response.data };
          });
          if (i === sliceCategory.length - 1) setFlag2(true);
          setCurList(preState => [...preState, e]);
        });
      });

      if (categoryList.slice(presentView, presentView + sliceamount) === [])
        setIsEnd(true);
      presentView += sliceamount;
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
      {flag && flag2 ? (
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
