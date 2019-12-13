import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ContentContainer = styled.div`
  min-height: 4rem;
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
const RecommendedContent = ({ category, title, date, thumbnailImg }) => {
  return (
    <ContentContainer>
      <ContentImage src={thumbnailImg} />
      <TextArea>
        <div className="commentary">{`취향저격 ${category} 컨텐츠`}</div>
        <div className="title">{title}</div>
        <div className="date">{date}</div>
      </TextArea>
    </ContentContainer>
  );
};

RecommendedContent.propTypes = {
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
};

export default RecommendedContent;
