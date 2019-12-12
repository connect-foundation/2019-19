import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SliderContext from './context';
import ShowDetailsButton from './ShowDetailsButton';
import Mark from './Mark';
import './Item.scss';
import Axios from 'axios';

const Item = ({ movie }) => {
  const [hover, setHover] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    'https://mir-s3-cdn-cf.behance.net/project_modules/disp/b6e0b072897469.5bf6e79950d23.gif',
  );

  const playVideo = () => {
    document.getElementById(movie.video_id).play();
  };

  const pauseVideo = () => {
    document.getElementById(movie.video_id).pause();
  };
  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef }) => {
        const isActive = currentSlide && currentSlide.id === movie.video_id;
        return (
          <div
            ref={elementRef}
            className={cx('item', {
              'item--open': isActive,
            })}
            onMouseOver={() => setHover(true)}
            onFocus={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onBlur={() => setHover(false)}
          >
            <>
              <div
                className="video-area"
                onMouseOver={playVideo}
                onFocus={playVideo}
                onMouseLeave={pauseVideo}
                onBlur={pauseVideo}
              >
                <video
                  id={movie.video_id}
                  //   src={movie.thumbnail_video_url} // thumbnail_video_url
                  src="https://saltsyffjqrf3006180.cdn.ntruss.com//root/videos/vcl4-StMGYAw.mp4"
                  alt="thumbnail-video"
                  poster={movie.thumbnail_img_url}
                >
                  <track kind="captions" />
                </video>
                <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
              </div>
              <div className="content-info">{movie.name}</div>
              <img src={movie.thumbnail_img_url} alt="" />
            </>

            {isActive && <Mark />}
          </div>
        );
      }}
    </SliderContext.Consumer>
  );
};

Item.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default Item;
