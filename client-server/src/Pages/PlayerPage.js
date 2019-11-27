import React, { createRef, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { NavbarContext } from '../contexts/NavbarContext';

const Title = styled.h2`
  color: white;
  display: none;
`;

const WhiteDiv = styled.div`
  color: white;
`;

const Player = ({ match }) => {
  // Context
  const { setShowNav } = useContext(NavbarContext);

  // State
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0);

  // Reference
  const player = createRef();

  // Lifecycle method
  useEffect(() => {
    setShowNav(false);
  }, []);

  // Util function
  const convertToTime = seconds => {
    const hour = parseInt(seconds / 3600, 10);
    const minute = parseInt((seconds % 3600) / 60, 10);
    const second = parseInt(seconds % 60, 10);
    return `${hour}:${minute}:${second}`;
  };

  // Event handler
  const playAndPause = () => {
    setPlaying(!playing);
  };

  const setDurationTime = inputDuration => {
    console.log('onDuration!', inputDuration);
    setDuration(inputDuration);
  };

  const seekBefore = () => {
    console.log('dur:', player.current.getDuration());
    console.log('cur:', player.current.getCurrentTime());
  };
  const seekAfter = () => {};

  // Render
  return (
    <>
      <Title>비디오ID URL파라미터로 받기 - {match.params.videoId}</Title>
      <ReactPlayer
        width="100%"
        height="100vh"
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        playing={playing}
        ref={player}
        onDuration={setDurationTime}
      />
      <button type="button" onClick={playAndPause}>
        {playing ? 'pause' : 'play'}
      </button>
      <button type="button" onClick={seekBefore}>
        10초전
      </button>
      <button type="button" onClick={seekAfter}>
        10초후
      </button>
      <WhiteDiv id="currentTime" className="current_time">
        00:00
      </WhiteDiv>
      <WhiteDiv id="totalTime" className="total_time">
        {convertToTime(duration)}
      </WhiteDiv>
      <WhiteDiv id="progress" className="progress">
        <WhiteDiv className="bar" id="progressBar" />
      </WhiteDiv>
    </>
  );
};

export default Player;
