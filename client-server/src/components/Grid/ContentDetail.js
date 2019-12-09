import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DetailContainer = styled.div`
  position: relative;
  width: 100%;
  height: 15vh;
  border: solid white 0.1rem;
`;

const DetailView = styled.div`
  position: relative;
  width: 10vw;
  height: 100%;
  border: solid 0.1rem blue;
`;

const ContentDetail = () => {
  return (
    <DetailContainer>
      <DetailView />
    </DetailContainer>
  );
};

ContentDetail.propTypes = {};

export default ContentDetail;
