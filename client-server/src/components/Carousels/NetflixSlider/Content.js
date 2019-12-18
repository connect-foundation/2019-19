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
import { PreviewPlayContext } from '../../../contexts/PreviewPlayContext';
import TagsContainer from '../../StyledComponents/TagsContainer';
import Tag from '../../Tag/Tag';
import ENV from '../../../../env';
import './Content.scss';

const apiServer = ENV.apiServer;

const Content = ({ movie, onClose }) => {
  const { setDetailPreviewPlaying } = useContext(PreviewPlayContext);
  setDetailPreviewPlaying(true);
  const { userInfo } = useContext(LoginContext);
  const [tags, setTags] = useState(null);
  const [tagsOnLoading, setTagsOnLoading] = useState(true);
  const [videoId, setVideoId] = useState(movie.video_id);

  useEffect(() => {
    // 유저가 브라우저 탭이나 창을 벗어나면 재생중인 미리보기 동영상이 일시정지, 화면 복귀시 다시 재생
    document.addEventListener('visibilitychange', e => {
      const contentVideo = document.getElementById(`content-${videoId}`);
      contentVideo.paused ? contentVideo.play() : contentVideo.pause();
    });
    axios.get(`${apiServer}/video/tags/${videoId}`).then(tagsData => {
      setTags(tagsData.data);
      setTagsOnLoading(false);
    });
    // Bind the event listener
    document.getElementById(`content-${videoId}`).addEventListener(
      'loadedmetadata',
      function() {
        this.play();
      },
      false,
    );
  }, []);

  useEffect(() => {
    setTagsOnLoading(true);
    axios.get(`${apiServer}/video/tags/${movie.video_id}`).then(tagsData => {
      setVideoId(movie.video_id);
      setTags(tagsData.data);
      setTagsOnLoading(false);
    });
  }, [movie]);

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
            <PlayButton name="▶  재생" videoId={videoId} />
            {userInfo && [
              <LikeBtn userId={userInfo} thumbNailId={videoId} />,
              <MylistBtn userId={userInfo} thumbNailId={videoId} />,
            ]}
          </div>
        </div>
        <button
          className="content__close"
          onClick={() => {
            document.getElementById(`content-${videoId}`).pause();
            onClose();
          }}
        >
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
