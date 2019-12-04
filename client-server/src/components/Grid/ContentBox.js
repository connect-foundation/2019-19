import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '../StyledComponents/GirdContentBox';

const ContentBox = ({ title, thumbnailImg, thumbnailVideo, streamingLink }) => {
  const [hover, setHover] = useState(false);
  const [opacity, setOpacity] = useState(1);

  const userHoverImage = () => {
    setHover(true);
    setOpacity(0);
  };
  const userLeaveImage = () => {
    setHover(false);
    setOpacity(1);
  };
  return (
    <Box
      imgUrl={thumbnailImg}
      opacity={opacity}
      onMouseOver={userHoverImage}
      onFocus={userHoverImage}
      onMouseLeave={userLeaveImage}
      onBlur={userLeaveImage}
    >
      <h2 className="content-title">{title}</h2>
    </Box>
  );
};

ContentBox.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnailImg: PropTypes.string.isRequired,
  thumbnailVideo: PropTypes.string.isRequired,
  streamingLink: PropTypes.string.isRequired,
};

export default ContentBox;
