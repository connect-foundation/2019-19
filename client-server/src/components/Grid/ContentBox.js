import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from '../StyledComponents/GirdContentBox';
import ShowDetailButton from '../Carousels/NetflixSlider/ShowDetailsButton';
import ContentDetail from './ContentDetail';

const ContentBox = ({
  videoId,
  title,
  thumbnailImg,
  thumbnailVideo,
  streamingLink,
}) => {
  const [detailClicked, setDetailClicked] = useState(false);
  const playVideo = () => {
    document.getElementById(videoId).play();
  };

  const pauseVideo = () => {
    document.getElementById(videoId).pause();
  };

  const showContentDetail = () => {
    setDetailClicked(true);
  };

  const handleClose = () => {
    setDetailClicked(false);
  };

  const Grid = styled.div`
    margin: 1rem 0rem;
    position: relative
    border: 0;
    padding: 0;

    video {
        position: absolute;
        width: 17.7rem;
        height: 11rem;
        object-fit: fill;
        top: 0%;
        padding: 0;
        z-index: 4;
    }

    .video__area {
      position: absolute;
      width: 17.7rem;
      height: 11rem;
      object-fit: fill;
      top: 0%;
      opacity: 0;
      padding: 0;
      z-index: 4;
    }
    .video__area:hover {
        transform: scale(1.4);
        opacity: 1;
        transition: 1000ms;
        border: solid 0.05rem rgba(125,125,125,0.1);
        border-radius: 0.25rem;
    }
    .video__area:hover > .show-details-button {
        z-index: 6;
        opacity: 1;
    }
    .show-details-button:hover {
        animation: shake 1s cubic-bezier(.36,.07,.19,.97) both;
    }
    @keyframes shake {
        10%, 90% {
          transform: translate3d(0, -0.1rem, 0);
        }
        
        20%, 80% {
          transform: translate3d(0, 0.2rem, 0);
        }
      
        30%, 50%, 70% {
          transform: translate3d(0, -0.4rem, 0);
        }
      
        40%, 60% {
          transform: translate3d(0, 0.4rem, 0);
        }
      }
  `;

  return (
    <Grid>
      <Box className="thumbnail__image" imgUrl={thumbnailImg}>
        <h2 className="content-title">{title}</h2>
      </Box>
      <div
        className="video__area"
        onMouseOver={playVideo}
        onFocus={playVideo}
        onMouseLeave={pauseVideo}
        onBlur={pauseVideo}
      >
        <video
            id={videoId}
            src={thumbnailVideo} // thumbnail_video_url
            alt="thumbnail-video"
          poster={null}
        >
          <track kind="captions" />
        </video>
        <ShowDetailButton onClick={showContentDetail} />
      </div>
      {detailClicked &&
        ContentDetail(
          { video_id: 2933, name: 'ajwioef', thumbnail_video_url: 'naver.com' },
          handleClose,
        )}
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
