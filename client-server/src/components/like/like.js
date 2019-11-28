import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import IconCross from './iconSvg';
import CheckBoxLabel from '../StyledComponents/CheckBoxLabel';
import CheckBox from '../StyledComponents/CheckBox';

const axios = require('axios');

const apiServer = 'http://localhost:8000';

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
            // 나중엔 컨텐츠 고유 id 갖다 넣고 갖다 넣어야댐
            document.getElementById('like').checked = true;
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
      <CheckBox id="like" type="checkbox" onClick={handleLikeClicked} />
      <CheckBoxLabel htmlFor="like">
        <IconCross />
        &nbsp; 좋아요 {contentText}
      </CheckBoxLabel>
    </div>
  );
};

LikeBtn.propTypes = {
  userId: PropTypes.string.isRequired,
  thumbNailId: PropTypes.number.isRequired,
};

export default LikeBtn;
