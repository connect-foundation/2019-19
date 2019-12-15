/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconCross from '../Icons/IconCross';
import PlayButton from '../../PlayButton';
import LikeBtn from '../../like/like';
import MylistBtn from '../../like/mylist';
import LoginContext from '../../../loginContextApi/context';
import ENV from '../../../../env';
import './Content.scss';

const axios = require('axios');

const apiServer = ENV.apiServer;

const Content = ({ movie, onClose }) => {
  const { userInfo } = useContext(LoginContext);
  useEffect(() => {
    // Bind the event listener
    document.getElementById(`content-${movie.video_id}`).addEventListener(
      'loadedmetadata',
      function() {
        console.log(this.currentTime);

        console.log(this.currentTime);
        console.log(this.readyState);
        this.play();
        // setTimeout(() => {
        //   //   this.currentTime = this.duration / 2;
        //   this.play();
        // }, 2000);
      },
      false,
    );
  }, []);

  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <video
          id={`content-${movie.video_id}`}
          src={`https://${movie.thumbnail_video_url}`}
          className="content__background__image"
          poster={movie.thumbnail_img_url}
        >
          <track kind="captions" />
        </video>
      </div>
      <div className="content__area">
        <div className="content__area__container">
          <div className="content__title">{movie.name}</div>
          <div className="content__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque et euismod ligula. Morbi mattis pretium eros, ut mollis
            leo tempus eget. Sed in dui ac ipsum feugiat ultricies. Phasellus
            vestibulum enim quis quam congue, non fringilla orci placerat.
            Praesent sollicitudin
          </div>
          <div className="content__btns__container">
            <PlayButton name="▶  재생" />
            {userInfo && [
              <LikeBtn userId={userInfo} thumbNailId={movie.video_id} />,
              <MylistBtn userId={userInfo} thumbNailId={movie.video_id} />,
            ]}
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
