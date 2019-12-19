import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FakeUI from '../components/infinite_scroll/ScrollFakeUI';
import Slider from '../components/Carousels/NetflixSlider';
import MessageOnCenter from '../components/StyledComponents/MessageOnCenter';

import ENV from '../../env';

const { apiServer } = ENV;

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

  if (onLoading) return <FakeUI numOfContents={5} />;

  return (
    <>
      {noContents || !myVideoList.length ? (
        <MessageOnCenter>검색 결과가 없습니다.</MessageOnCenter>
      ) : (
        sliceIndexArray.map((content1, index1) => {
          return (
            <Slider key={index1}>
              {myVideoList
                .slice(
                  content1 * numOfContentsInEachRaw,
                  (content1 + 1) * numOfContentsInEachRaw,
                )
                .map((content2, index2) => {
                  if (content2)
                    return (
                      <Slider.Item
                        movie={content2._source}
                        key={content2._source.video_id + index2}
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
