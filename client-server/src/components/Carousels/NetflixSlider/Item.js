import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SliderContext from './context';
import ShowDetailsButton from './ShowDetailsButton';
import Mark from './Mark';
import './Item.scss';

const Item = ({ movie }) => {
  const [hover, setHover] = useState(false);
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
                  src="https://connect.or.kr/connectfoundation_/video/home_bg.mp4" // thumbnail_video_url
                  alt="thumbnail-video"
                  poster={movie.image}
                  autoPlay
                >
                  <track kind="captions" />
                </video>
              </>
            ) : (
              <>
                <div className="content-info">{movie.title}</div>
                <img src={movie.image} alt={movie.title} />
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
