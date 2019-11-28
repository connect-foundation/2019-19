/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import IconCross from '../Icons/IconCross';
import MainButton from '../../MainButton';
import LikeBtn from '../../like/like';
import MylistBtn from '../../like/mylist';
import LoginContext from '../../../loginContextApi/context';
import './Content.scss';

const axios = require('axios');

const apiServer = 'http://localhost:8000';

const Content = ({ movie, onClose }) => {
  const { userInfo } = useContext(LoginContext);
  const [thumbNailId, setThumbNailId] = useState(null);

  useEffect(() => {
    axios.get(`${apiServer}/video/main-thumbnail-video`).then(thumbNailData => {
      setThumbNailId(thumbNailData.data.video_id);
    });
  }, []);

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
            <MainButton name="▶  재생" />
            {userInfo && [
              <LikeBtn userId={userInfo} thumbNailId={thumbNailId} />,
              <MylistBtn userId={userInfo} thumbNaild={thumbNailId} />,
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
