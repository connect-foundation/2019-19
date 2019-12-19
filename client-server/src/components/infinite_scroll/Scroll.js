/* eslint-disable react/forbid-prop-types */
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import Slider from '../Carousels/NetflixSlider';

import ENV from '../../../env';

const InfinityScroll = ({ categoryList, contentsType }) => {
  let currentScroll = 0; // 현재 스크롤 위치
  let presentView = 1; // 현재까지 보여진 케로셀 갯수
  const sliceamount = 3; // 새로 만들 케로셀 갯수

  const [curList, setCurList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [arr2, setArr2] = useState({});

  const handleInfinity = debounce(() => {
    if (isEnd) {
      return;
    }
    if (
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 500 // 스크롤 여유
    ) {
      currentScroll = document.documentElement.scrollTop; // 데이터 요청후 스크롤바 위치 조정
      const sliceCategory = categoryList.slice(
        presentView,
        presentView + sliceamount,
      );

      sliceCategory.forEach((e, i) => {
        axios
          .get(`${ENV.apiServer}/video/${sliceCategory[i]}${contentsType}`)
          .then(response => {
            setArr2(prevState => {
              return { ...prevState, [e]: response.data };
            });
            if (i === sliceCategory.length - 1) setLoading(true);
            setCurList(preState => [...preState, e]);
          });
      });

      if (
        categoryList.slice(presentView, presentView + sliceamount).length <
        sliceamount
      )
        setIsEnd(true);
      presentView += sliceamount;
      document.documentElement.scrollTop = currentScroll;
    }
  }, 1000);

  useEffect(() => {
    window.addEventListener('scroll', handleInfinity);
    return () => {
      window.removeEventListener('scroll', handleInfinity);
    };
  }, []);
  return (
    <>
      <ClipLoader
        css={css`
          margin: 2% 48%;
        `}
        sizeUnit="rem"
        size={5}
        color="lightgray"
        loading={!loading}
      />
      {loading ? (
        <>
          {curList.map((e, i) => {
            return (
              <Slider categoryName={e} key={i}>
                {Object.values(arr2)[i].map((content, index) => (
                  <Slider.Item
                    movie={content._source}
                    key={content._source.video_id + index}
                  />
                ))}
              </Slider>
            );
          })}
          {!isEnd && (
            <ClipLoader
              css={css`
                margin: 2% 48%;
              `}
              sizeUnit="rem"
              size={5}
              color="lightgray"
              loading={loading}
            />
          )}
        </>
      ) : (
        <ClipLoader
          css={css`
            // margin: 2% 48%;
          `}
          sizeUnit="rem"
          size={5}
          color="lightgray"
          loading={loading}
        />
      )}
    </>
  );
};

InfinityScroll.propTypes = {
  categoryList: PropTypes.array.isRequired,
};

export default InfinityScroll;
