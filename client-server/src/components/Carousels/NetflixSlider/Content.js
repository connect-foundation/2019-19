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
  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <video
          src={movie.thumbnail_video_url}
          //   src="https://saltsyffjqrf3006180.cdn.ntruss.com//root/videos/vcl4-StMGYAw.mp4"
          className="content__background__image"
          autoPlay
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
            <PlayButton name="▶  재생" videoId={movie.video_id} />
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
