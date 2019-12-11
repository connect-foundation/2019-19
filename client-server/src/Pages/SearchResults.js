import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from '../components/Carousels/NetflixSlider';
import styled from 'styled-components';

import ENV from '../../env';

const { apiServer } = ENV;

const MessageOnCenter = styled.h1`
  position: absolute;
  color: white;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
`;

const SearchResults = props => {
  const [myVideoList, setMyVideoList] = useState([]);
  const [onLoading, setOnLoading] = useState(true);
  const [numOfContentsInEachRaw, setNumOfContentsInEachRaw] = useState(5);
  const [sliceIndexArray, setSliceIndexArray] = useState([]);
  const [noContents, setNoContents] = useState(false);

  const { keyword } = props.match.params;

  useEffect(() => {
    setOnLoading(true);
    axios.get(`${apiServer}/video/search/${keyword}`).then(res => {
      if (res.data.length) {
        const numOfMyVideos = res.data.length;
        // 유저가 찜한 컨텐츠가 없다는 view 표시해야
        const raws = Math.ceil(numOfMyVideos / numOfContentsInEachRaw);
        let temp = [];
        for (let i = 0; i < raws; i++) {
          temp.push(i);
        }
        setSliceIndexArray(temp);
        setMyVideoList(res.data);
        setOnLoading(false);
        setNoContents(false);
      } else {
        setNoContents(true);
        setOnLoading(false);
      }
    });
  }, [keyword]);

  if (onLoading) return null;

  return (
    <>
      {noContents ? (
        <MessageOnCenter>검색 결과가 없습니다.</MessageOnCenter>
      ) : (
        sliceIndexArray.map(e => {
          return (
            <Slider>
              {myVideoList
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
        })
      )}
      {}
    </>
  );
};

export default SearchResults;
