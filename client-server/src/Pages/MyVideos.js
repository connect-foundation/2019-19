import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import LoginContext from '../loginContextApi/context';
import GridContainer from '../components/StyledComponents/GridContainer';
import ContentBox from '../components/Grid/ContentBox';
import ENV from '../../env';

const { apiServer } = ENV;

const MyVideos = () => {
  const { userInfo } = useContext(LoginContext);
  const [myVideoList, setMyVideoList] = useState([]);
  const [onLoading, setOnLoading] = useState(true);

  useEffect(() => {
    if (userInfo) {
      axios
        .post(`${apiServer}/mylist/my-videos`, {
          id: userInfo,
        })
        .then(res => {
          console.log(res.data);
          setMyVideoList(res.data);
          setOnLoading(false);
        });
    }
  }, userInfo);

  if (onLoading) return null;

  return (
    <GridContainer>
      {myVideoList.length
        ? myVideoList.map(content => (
            <ContentBox
              title={content.name}
              thumbnailImg={content.thumbnail_img_url}
              thumbnailVideo={content.thumbnail_video_url}
              streamingLink={content.streaming_url}
            />
          ))
        : null}
      <ContentBox
        title="간다라마ㅏ"
        thumbnailImg="https://picsum.photos/id/22/1600/640"
        thumbnailVideo="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
        streamingLink="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
      />
      {/* <ContentBox />
      <ContentBox />
      <ContentBox />
      <ContentBox />
      <ContentBox />
      <ContentBox />
      <ContentBox /> */}
    </GridContainer>
  );
};

export default MyVideos;
