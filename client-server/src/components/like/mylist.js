import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import CheckBoxLabel from '../StyledComponents/CheckBoxLabel';
import CheckBox from '../StyledComponents/CheckBox';
import ENV from '../../../env';

const axios = require('axios');

const apiServer = ENV.apiServer;

const PostData = (userId, videoId, URL) => {
  axios.post(`${apiServer}/mylist/${URL}`, {
    params: {
      userId: `${userId}`,
      videoId,
    },
  });
};
const MylistBtn = ({ userId, thumbNailId }) => {
  const [Clicked, setClicked] = useState(false);
  const [mylist, setMylist] = useState(false);
  const [zzimedOnLoading, setZzimedOnLoading] = useState(true);
  const contentText = mylist ? '✔ 찜한 컨텐츠 취소' : '✚ 내가 찜한 컨텐츠';

  useEffect(() => {
    if (thumbNailId && userId) {
      axios
        .post(`${apiServer}/mylist/is-zzimed`, {
          params: {
            userId,
            videoId: thumbNailId,
          },
        })
        .then(res => {
          if (res.data.my_video_id) {
            setMylist(true);
            setZzimedOnLoading(false);
            document.getElementById(`${thumbNailId}jjim`).checked = true;
            return;
          }
          setMylist(false);
          setZzimedOnLoading(false);
          document.getElementById(`${thumbNailId}jjim`).checked = false;
        });
    }
  }, [userId, thumbNailId]);

  useEffect(() => {
    if (mylist && Clicked) PostData(userId, thumbNailId, 'mylist-video');
    if (!mylist && Clicked) PostData(userId, thumbNailId, 'unMylist-video');
  }, [mylist]);

  const handleMylistClicked = () => {
    if (!Clicked) setClicked(true);
    setMylist(!mylist);
  };

  if (zzimedOnLoading)
    return (
      <ClipLoader
        css={css`
          margin: 2% 2%;
        `}
        sizeUnit="rem"
        size={2}
        color="lightgray"
        loading={zzimedOnLoading}
      />
    );
  return (
    <div>
      <CheckBox
        id={`${thumbNailId}jjim`}
        type="checkbox"
        onClick={handleMylistClicked}
      />
      <CheckBoxLabel htmlFor={`${thumbNailId}jjim`}>
        {contentText}
      </CheckBoxLabel>
    </div>
  );
};

MylistBtn.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default MylistBtn;
