import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../StyledComponents/GirdContentBox';

const ContentBox = ({
  videoId,
  title,
  thumbnailImg,
  thumbnailVideo,
  streamingLink,
}) => {
  const userHoverImage = () => {
    document.getElementById(videoId).play();
  };

  const userLeaveImage = () => {
    document.getElementById(videoId).pause();
  };

  const Grid = styled.div`
    margin: 1rem 0rem;
    position: relative
    border: 0;
    padding: 0;

    video {
      opacity: 1;
      position: absolute;
      width: 17.7rem;
      height: 11rem;
      object-fit: fill;
      
      top: 0%;
      opacity: 0;
      padding: 0;
      z-index: 4;
    }
    video:hover {
        transform: scale(1.4);
        opacity: 1;
        transition: 1000ms;
        border: solid 0.05rem rgba(125,125,125,0.1);
        border-radius: 0.25rem;
        cursor: pointer;
    }

    &:hover + video {
        opacity: 1;
        z-index: 4;
    }
  `;

  return (
    <Grid>
      <Box className="thumbnail__image" imgUrl={thumbnailImg}>
        <h2 className="content-title">{title}</h2>
      </Box>
      <video
        id={videoId}
        src={thumbnailVideo} // thumbnail_video_url
        alt="thumbnail-video"
        poster={null}
        onMouseOver={userHoverImage}
        onFocus={userHoverImage}
        onMouseLeave={userLeaveImage}
        onBlur={userLeaveImage}
      >
        <track kind="captions" />
      </video>
    </Grid>
  );
};

ContentBox.propTypes = {
  videoId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
  thumbnailVideo: PropTypes.string.isRequired,
  streamingLink: PropTypes.string.isRequired,
};

export default ContentBox;
