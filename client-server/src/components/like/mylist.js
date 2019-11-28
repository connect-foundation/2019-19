import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CheckBoxLabel from '../StyledComponents/CheckBoxLabel';
import CheckBox from '../StyledComponents/CheckBox';

const axios = require('axios');

const apiServer = 'http://localhost:8000';
const PostData = ({ userId, thumbNailImg, URL }) => {
  axios.post(`${apiServer}/${URL}`, {
    params: {
      userId: `${userId}`,
      thumbNailImg: `${thumbNailImg}`,
    },
  });
};
const MylistBtn = ({ userId, thumbNailImg }) => {
  const [mylist, setMylist] = useState(false);
  const contentText = mylist ? '✔ 찜한 컨텐츠 취소' : '✚ 내가 찜한 컨텐츠';

  useEffect(() => {
    if (thumbNailImg && userId) {
      if (mylist) {
        PostData(userId, thumbNailImg, 'like-video');
      } else {
        PostData(userId, thumbNailImg, 'unlike-video');
      }
    }
  }, [userId, thumbNailImg, mylist]);

  return (
    <div>
      <CheckBox id="zzim" type="checkbox" onClick={() => setMylist(!mylist)} />
      <CheckBoxLabel htmlFor="zzim">{contentText}</CheckBoxLabel>
    </div>
  );
};

MylistBtn.propTypes = {
  userId: PropTypes.string.isRequired,
  thumbNailImg: PropTypes.string.isRequired,
};

export default MylistBtn;
