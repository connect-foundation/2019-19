import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import SliderContext from './context';
import ShowDetailsButton from './ShowDetailsButton';
import Mark from './Mark';
import useHover from './useHover';
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
            onMouseLeave={() => setHover(false)}
          >
            {hover ? (
              <>
                <div className={'content-info'}>{'hello'}</div>
                <video
                  src={
                    'https://connect.or.kr/connectfoundation_/video/home_bg.mp4'
                  } // thumbnail_video_url
                  alt="thumbnail-video"
                  poster={movie.image} // thumbnail_img_url | poster 속성에 이미지 넣어둬야 부드럽게 전환
                  autoPlay={true}
                />
              </>
            ) : (
              <img src={movie.image} /> // thumbnail_img_url
            )}
            <ShowDetailsButton onClick={() => onSelectSlide(movie.id)} />
            {isActive && <Mark />}
          </div>
        );
      }}
    </SliderContext.Consumer>
  );
};

Item.propTypes = {
  movie: PropTypes.string.isRequired,
};

export default Item;
