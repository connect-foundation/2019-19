import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginContext from '../loginContextApi/context';
import Slider from '../components/Carousels/NetflixSlider';
import ENV from '../../env';

const { apiServer } = ENV;

const SearchResults = props => {
  const { userInfo } = useContext(LoginContext);
  const [myVideoList, setMyVideoList] = useState([]);
  const [toBeRendered, setToBeRendered] = useState([]);
  const [onLoading, setOnLoading] = useState(true);
  const [numOfContentsInEachRaw, setNumOfContentsInEachRaw] = useState(5);
  const [sliceIndexArray, setSliceIndexArray] = useState([]);

  const { keyword } = props.match.params;

  useEffect(() => {
    if (userInfo) {
      axios.get(`${apiServer}/video/${keyword}`).then(res => {
        console.log(res.data.length);
        if (res.data.length > 0) {
          console.log(res);
          setMyVideoList(res.data);
          const numOfMyVideos = res.data.length;
          if (res.data.length === 0) return; // 유저가 찜한 컨텐츠가 없다는 view 표시해야
          const raws = Math.ceil(numOfMyVideos / numOfContentsInEachRaw);
          const temp = [];
          for (let i = 0; i < raws; i++) {
            temp.push(i);
          }
          setSliceIndexArray(temp);
          setOnLoading(false);
        }
      });
    }
  }, [userInfo, keyword]);

  if (onLoading) return null;

  return (
    <>
      {sliceIndexArray.map(e => {
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
      })}
    </>
  );
};

export default SearchResults;
