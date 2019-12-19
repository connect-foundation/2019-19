import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import IconCross from './iconSvg';
import CheckBoxLabel from '../StyledComponents/CheckBoxLabel';
import CheckBox from '../StyledComponents/CheckBox';
import ENV from '../../../env';
const axios = require('axios');
const apiServer = ENV.apiServer;

const LikeBtn = ({ userId, thumbNailId }) => {
  const [likedOnLoading, setLikedOnLoading] = useState(true);
  const [Clicked, setClicked] = useState(false);
  const [Like, setLike] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(0);
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
            setLikedOnLoading(false);
            document.getElementById(`like-${thumbNailId}`).checked = true;
            setNumOfLikes(res.data[0].likes);
            return;
          }
          setLike(false);
          setLikedOnLoading(false);
          setNumOfLikes(res.data[0].likes);
          document.getElementById(`like-${thumbNailId}`).checked = false;
        });
    }
  }, [userId, thumbNailId]);

  useEffect(() => {
    if (Like && Clicked) {
      PostData(userId, thumbNailId, 'like-video');
      setNumOfLikes(numOfLikes + 1);
    }
    if (!Like && Clicked) {
      PostData(userId, thumbNailId, 'unlike-video');
      setNumOfLikes(numOfLikes - 1);
    }
  }, [Like]);

  const PostData = (userId, thumbNailId, URL) => {
    setLikedOnLoading(true);
    axios
      .post(`${apiServer}/like/${URL}`, {
        params: {
          userId: `${userId}`,
          videoId: thumbNailId,
        },
      })
      .then(res => {
        setLikedOnLoading(false);
        document.getElementById(`like-${thumbNailId}`).checked = Like;
      })
      .catch(error => {
        console.log(error);
        alert(errer);
      });
  };

  const handleLikeClicked = () => {
    if (likedOnLoading) return;
    if (!Clicked) setClicked(true);
    setLike(!Like);
  };

  if (likedOnLoading)
    return (
      <ClipLoader
        css={css`
          margin: 2% 2%;
        `}
        sizeUnit="rem"
        size={2}
        color="lightgray"
        loading={likedOnLoading}
      />
    );

  return (
    <>
      <CheckBox
        id={`like-${thumbNailId}`}
        type="checkbox"
        onClick={handleLikeClicked}
      />
      <CheckBoxLabel padding={'0.5rem 1rem'} htmlFor={`like-${thumbNailId}`}>
        <IconCross />
        <span
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0',
          }}
        >
          <h5 style={{ margin: '0' }}>&nbsp; 좋아요 {contentText}</h5>
          <h5 className="num-of-likes">&nbsp;{numOfLikes.toLocaleString()}</h5>
        </span>
      </CheckBoxLabel>
    </>
  );
};

LikeBtn.propTypes = {
  userId: PropTypes.string,
  thumbNailId: PropTypes.string,
  URL: PropTypes.string,
};

export default LikeBtn;
