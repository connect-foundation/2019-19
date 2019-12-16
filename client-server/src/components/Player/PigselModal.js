import React, { useState } from 'react';
import styled from 'styled-components';

const ControlPigsel = styled.ul`
  background-color:black;
  text-decoration:none;
  display:none;  
  height:auto;
  padding:0px;
  margin:auto;
  border:none
  position:absolute;
  width:150px;
  z-index:99;
`;

const ControlPigselWrapper = styled.ul`
  text-decoration: none;
  &:hover ul {
    display: block;
    cursor: pointer;
  }
`;

const ControlPigselList = styled.span`
  list-style: none;
`;

const PigselModal = ({
  setPigsels,
  setVideoUrls,
  playedSeconds,
  setPlayedSeconds,
  videoId,
}) => {
  const [pigsel, setPigsel] = useState('720p'); // 초기 값 720p

  const handleClick = (e, prop) => {
    e.preventDefault();
    setPigsel(prop);
    setPigsels(prop);
    setPlayedSeconds(playedSeconds);
    setVideoUrls(
      `https://saltsyffjqrf3006180.cdn.ntruss.com//root/videos/${videoId}/${prop}.stream.m3u8`,
    );
  };

  return (
    <>
      <ControlPigselWrapper>
        <ControlPigsel>
          <ControlPigselList onClick={e => handleClick(e, '360p')}>
            360p &ensp;
          </ControlPigselList>
          <ControlPigselList onClick={e => handleClick(e, '480p')}>
            480p &ensp;
          </ControlPigselList>
          <ControlPigselList onClick={e => handleClick(e, '720p')}>
            720p &nbsp;
          </ControlPigselList>
        </ControlPigsel>
        {pigsel}
      </ControlPigselWrapper>
    </>
  );
};

export default PigselModal;
