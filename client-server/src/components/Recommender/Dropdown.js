import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import RecommendedContent from './RecommendedContent';
import LoginContext from '../../loginContextApi/context';
import axios from 'axios';
import ENV from '../../../env';

const apiServer = ENV.apiServer;

const DropdownContainer = styled.div`
  padding: 0;
  position: absolute;
  right: 6rem;
  width: 36rem;
  height: 30rem;
  border: solid lightgray 0.1rem;
  background-color: rgba(20, 20, 20, 0.8);
  overflow: scroll;
  scrollbar-width: none;
  scrollbar-color: dark;

  animation: srr-recommender 800ms ease;
  @keyframes srr-recommender {
    0% {
      height: 0%;
      opacity: 0;
    }
    100% {
      height: 30rem;
      opacity: 1;
    }
  }
`;

const Dropdown = () => {
  const { userId } = useContext(LoginContext);
  const [recommededContents, setRecommededContents] = useState(null);
  const [onLoading, setOnLoading] = useState(true);
  useEffect(() => {
    axios
      .post(`${apiServer}/video/recommend`, {
        params: {
          userId,
          videoId: 'vJxE5MaKuCEc',
        },
      })
      .then(res => {
        setRecommededContents(res.data);
        setOnLoading(false);
      });
  }, []);

  if (onLoading) return null;

  return (
    <>
      {RecommendedContent.length && (
        <DropdownContainer>
          {recommededContents.map((content, index) => (
            <RecommendedContent
              id={content.video_id}
              category={content.category}
              title={content.name}
              date={content.reg_date.slice(0, 10)}
              thumbnailImg={content.thumbnail_img_url}
              key={index}
            />
          ))}
        </DropdownContainer>
      )}
    </>
  );
};

export default Dropdown;
