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
  useEffect(() => {
    Axios.get(movie.thumbnail_img_url).then(() => {
      setImageUrl(movie.thumbnail_img_url);
    });
  }, []);
  return (
    <SliderContext.Consumer>
      {({ onSelectSlide, currentSlide, elementRef }) => {
        const isActive = currentSlide && currentSlide.id === movie.id;
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
            {hover ? (
              <>
                <video
                  src={movie.thumbnail_video_url} // thumbnail_video_url
                  alt="thumbnail-video"
                  poster={movie.thumbnail_img_url}
                  autoPlay
                >
                  <track kind="captions" />
                </video>
              </>
            ) : (
              <>
                <div className="content-info">{movie.name}</div>
                <img src={imageUrl} alt="" />
              </>
            )}
            <ShowDetailsButton onClick={() => onSelectSlide(movie)} />
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
