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
  width: 24rem;
  height: 30rem;
  border: solid lightgray 0.06rem;
  background-color: rgba(20, 20, 20, 0.9);
  overflow: scroll;
  animation: srr 800ms ease;
  @keyframes srr {
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
        },
      })
      .then(res => {
        setRecommededContents(res.data);
        setOnLoading(false);
      });
  }, []);

  if (onLoading) return null;

  return (
    <DropdownContainer>
      {recommededContents.map(content => (
        <RecommendedContent
          category={content._source.category}
          title={content._source.name}
          date={content._source.reg_date.slice(0, 10)}
          thumbnailImg={content._source.thumbnail_img_url}
        />
      ))}
    </DropdownContainer>
  );
};

export default Dropdown;
