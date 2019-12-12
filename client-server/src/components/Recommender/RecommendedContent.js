import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-bottom: solid lightgray 0.1rem;
  padding: 1rem;
  &:hover {
    background-color: rgba(20, 20, 20, 1);
  }
`;

const ContentImage = styled.img`
  border-radius: 0.5rem;
  height: 60px;
  width: 96px;
`;

const TextArea = styled.div`
  display: flex;
  margin-left: 1rem;
  flex-direction: column;
  justify-content: space-between;

  .commentary {
    color: white;
  }

  .title {
    color: white;
    font-weight: bold;
  }

  .date {
    font-size: x-small;
  }
`;
const RecommendedContent = () => {
  return (
    <ContentContainer>
      <ContentImage src="https://occ-0-988-993.1.nflxso.net/art/3a065/cbec3e76347fd7ff3b03de1ad78f78e255a3a065.jpg" />
      <TextArea>
        <div className="commentary">취향저격 스포츠 컨텐츠</div>
        <div className="title">{`디파티드`}</div>
        <div className="date">2019.08.22</div>
      </TextArea>
    </ContentContainer>
  );
};

RecommendedContent.propTypes = {};

export default RecommendedContent;
