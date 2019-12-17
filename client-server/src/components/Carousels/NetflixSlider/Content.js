/* eslint-disable react/button-has-type */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { css } from '@emotion/core';
import IconCross from '../Icons/IconCross';
import PlayButton from '../../PlayButton';

import LikeBtn from '../../like/like';
import MylistBtn from '../../like/mylist';
import LoginContext from '../../../loginContextApi/context';
import TagsContainer from '../../StyledComponents/TagsContainer';
import Tag from '../../Tag/Tag';
import ENV from '../../../../env';
import './Content.scss';

const apiServer = ENV.apiServer;

const Content = ({ movie, onClose }) => {
  const { userInfo } = useContext(LoginContext);
  const [tags, setTags] = useState(null);
  const [tagsOnLoading, setTagsOnLoading] = useState(true);
  useEffect(() => {
    axios.get(`${apiServer}/video/tags/${movie.video_id}`).then(tagsData => {
      setTags(tagsData.data);
      setTagsOnLoading(false);
    });
    // Bind the event listener
    document.getElementById(`content-${movie.video_id}`).addEventListener(
      'loadedmetadata',
      function() {
        this.play();
        // console.log(this.currentTime);
        // console.log(this.currentTime);
        // console.log(this.readyState);
        // setTimeout(() => {
        //   this.currentTime = this.duration / 2;
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
          <TagsContainer>
            {tagsOnLoading ? (
              <ClipLoader
                css={css`
                  margin: 2% 48%;
                `}
                sizeUnit="rem"
                size={3}
                color="lightgray"
                loading={tagsOnLoading}
              />
            ) : (
              tags.slice(0, 30).map(tag => <Tag name={tag.name} />)
            )}
          </TagsContainer>
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
