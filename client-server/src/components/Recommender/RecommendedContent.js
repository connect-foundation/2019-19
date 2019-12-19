import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
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
    font-size: small;
    font-weight: bold;
  }
`;

const StyledLink = {
  display: 'contents',
  textDecoration: 'none',
  padding: '0',
  color: 'inherit',
};

const RecommendedContent = ({ id, category, title, date, thumbnailImg }) => {
  const [userClicked, setUserClicked] = useState(false);
  const handleTagClick = () => {
    setUserClicked(true);
  };
  return (
    <Link to={`/Player/${id}`} style={StyledLink}>
      <ContentContainer onClick={handleTagClick}>
        <ContentImage src={thumbnailImg} />
        <TextArea>
          <div className="commentary">{`취향저격 ${category} 컨텐츠`}</div>
          <div className="title">{title}</div>
          <div className="date">{date}</div>
        </TextArea>
      </ContentContainer>
    </Link>
  );
};

RecommendedContent.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
};

export default RecommendedContent;
