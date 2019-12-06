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
              videoId={content.video_id}
              title={content.name}
              thumbnailImg={content.thumbnail_img_url}
              thumbnailVideo={content.thumbnail_video_url}
              streamingLink={content.streaming_url}
            />
          ))
        : null}
    </GridContainer>
  );
};

export default MyVideos;
