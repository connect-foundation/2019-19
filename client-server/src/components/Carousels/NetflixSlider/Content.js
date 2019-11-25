/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import IconCross from '../Icons/IconCross';
import MainButton from '../../MainButton';
import './Content.scss';

const Content = ({ movie, onClose }) => {
  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <video
          src="https://connect.or.kr/connectfoundation_/video/home_bg.mp4"
          className="content__background__image"
          autoPlay
        >
          <track kind="captions" />
        </video>
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{movie.title}</div>
          <div className="content__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque et euismod ligula. Morbi mattis pretium eros, ut mollis
            leo tempus eget. Sed in dui ac ipsum feugiat ultricies. Phasellus
            vestibulum enim quis quam congue, non fringilla orci placerat.
            Praesent sollicitudin
          </div>
          <div className="content__btns__container">
            <MainButton name="▶  Play" />
            <MainButton name="✅  My List" />
            <MainButton name="좋아요" />
          </div>
        </div>
        <button className="content__close" onClick={onClose}>
          <IconCross />
        </button>
      </div>
    </div>
  );
};
Content.propTypes = {
  movie: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default Content;
