import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconCross from './iconSvg';
import CheckBoxLabel from '../StyledComponents/CheckBoxLabel';
import CheckBox from '../StyledComponents/CheckBox';
import ENV from '../../../env';

const axios = require('axios');

const apiServer = ENV.apiServer;

const PostData = (userId, thumbNailId, URL) => {
  axios.post(`${apiServer}/like/${URL}`, {
    params: {
      userId: `${userId}`,
      videoId: thumbNailId,
    },
  });
};

const LikeBtn = ({ userId, thumbNailId }) => {
  const [Clicked, setClicked] = useState(false);
  const [Like, setLike] = useState(false);
  const contentText = Like ? '취소' : '';

  useEffect(() => {
    if (thumbNailId && userId) {
      axios
        .post(`${apiServer}/like/isLiked`, {
          params: {
            userId,
            videoId: thumbNailId,
          },
        })
        .then(res => {
          if (res.data.like_id) {
            setLike(true);
            document.getElementById(`like-${thumbNailId}`).checked = true;
          }
        });
    }
  }, [userId, thumbNailId]);

  useEffect(() => {
    if (Like && Clicked) PostData(userId, thumbNailId, 'like-video');
    if (!Like && Clicked) PostData(userId, thumbNailId, 'unlike-video');
  }, [Like]);

  const handleLikeClicked = () => {
    if (!Clicked) setClicked(true);
    setLike(!Like);
  };

  return (
    <div>
      <CheckBox
        id={`like-${thumbNailId}`}
        type="checkbox"
        onClick={handleLikeClicked}
      />
      <CheckBoxLabel htmlFor={`like-${thumbNailId}`}>
        <IconCross />
        &nbsp; 좋아요 {contentText}
      </CheckBoxLabel>
    </div>
  );
};

LikeBtn.propTypes = {
  userId: PropTypes.string,
  thumbNailId: PropTypes.string,
  URL: PropTypes.string,
};

export default LikeBtn;
