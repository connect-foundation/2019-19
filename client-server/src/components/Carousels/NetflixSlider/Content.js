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
  const { userInfo } = useContext(LoginContext);
  const [tags, setTags] = useState(null);
  const [tagsOnLoading, setTagsOnLoading] = useState(true);
  const [videoId, setVideoId] = useState(movie.video_id);

  useEffect(() => {
    setDetailPreviewPlaying(true);
  }, []);

  useEffect(() => {
    // 유저가 브라우저 탭이나 창을 벗어나면 재생중인 미리보기 동영상이 일시정지, 화면 복귀시 다시 재생
    document.addEventListener('visibilitychange', e => {
      const contentVideo = document.getElementById(`content-${movie.video_id}`);
      if (contentVideo.paused) contentVideo.play();
      else if (contentVideo.paused === false) contentVideo.pause();
    });
    setTagsOnLoading(true);
    if (sessionStorage.getItem(`tag-${movie.video_id}`)) {
      // sessionStorage에서 태그 정보 가져옴
      const TEN_MIN = 10 * 60 * 1000;
      const now = new Date(Date.now());
      const tags = JSON.parse(sessionStorage.getItem(`tag-${movie.video_id}`));
      const elapsedTime = Date.parse(now) - Date.parse(tags.timeStamp);
      if (elapsedTime > TEN_MIN) {
        sessionStorage.removeItem(`tag-${movie.video_id}`);
      } else {
        setRenderingTag(tags);
      }
    }
    if (sessionStorage.getItem(`tag-${movie.video_id}`) === null) {
      // axios 요청
      axios.get(`${apiServer}/video/tags/${movie.video_id}`).then(response => {
        response.timeStamp = new Date(Date.now());
        setRenderingTag(response);
        sessionStorage.setItem(
          `tag-${movie.video_id}`,
          JSON.stringify(response),
        );
      });
    }
  }, [movie]);

  const setRenderingTag = tags => {
    setTags(tags.data);
    setTagsOnLoading(false);
  };

  return (
    <div className="content">
      <div className="content__background">
        <div className="content__background__shadow" />
        <video
          id={`content-${movie.video_id}`}
          src={`https://${movie.thumbnail_video_url}`}
          className="content__background__image"
          poster={movie.thumbnail_img_url}
          autoPlay
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
              {tags &&
              tags.slice(0, 30).map((tag, index) => <Tag name={tag.name} key={index} />)}
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
        <button
          className="content__close"
          onClick={() => {
            document.getElementById(`content-${movie.video_id}`).pause();
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
