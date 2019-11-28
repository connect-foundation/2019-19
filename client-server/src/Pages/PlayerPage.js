import React, { createRef, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { NavbarContext } from '../contexts/NavbarContext';
import Time from '../utils/Time';

const Title = styled.h2`
  color: white;
  display: none;
`;

const WhiteDiv = styled.div`
  color: white;
`;

const Player = ({ match }) => {
  /* Context */
  const { setShowNav } = useContext(NavbarContext);

  /* Reference */
  const player = createRef();

  /* State */
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [played, setPlayed] = useState(0); // played는 0 ~ duration 사이의 값
  const [seeking, setSeeking] = useState(false);

  /* Lifecycle method */
  useEffect(() => {
    setShowNav(false);
  }, []);

  /* Event handler */
  const handlePlayAndPause = () => {
    setPlaying(!playing);
  };

  const handleDuration = dur => {
    setDuration(dur);
  };

  // Seeking Slider
  const handleSeekMouseDown = e => {
    setSeeking(true);
  };

  const handleSeekChange = e => {
    setPlayed(e.target.value);
  };

  const handleSeekMouseUp = e => {
    setSeeking(false);
    player.current.seekTo(e.target.value);
  };

  // Seeking Button
  const handleSeekBackward = () => {
    setSeeking(true);
    setPlayed(played - 10);
    setSeeking(false);
    player.current.seekTo(played);
  };

  const handleSeekForward = () => {
    setSeeking(true);
    setPlayed(played + 10);
    setSeeking(false);
    player.current.seekTo(played);
  };

  /* Render */
  return (
    <>
      <Title>비디오ID URL파라미터로 받기 - {match.params.videoId}</Title>
      <ReactPlayer
        ref={player}
        width="100%"
        height="100vh"
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        playing={playing}
        onDuration={handleDuration}
        // onProgress={onPro}
        // onSeek={onSek}
      />
      <button type="button" onClick={handlePlayAndPause}>
        {playing ? 'pause' : 'play'}
      </button>
      <button type="button" onClick={handleSeekBackward}>
        10초전
      </button>
      <button type="button" onClick={handleSeekForward}>
        10초후
      </button>
      <WhiteDiv>[남은시간]</WhiteDiv>
      <WhiteDiv id="totalTime" className="total_time">
        {Time.convertToTime(duration - played)}
      </WhiteDiv>
      <WhiteDiv>[탐색바]</WhiteDiv>
      <input
        type="range"
        min={0}
        max={duration}
        step="any"
        value={played}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
      <progress max={duration} value={played} />
      <WhiteDiv>[볼륨]</WhiteDiv>
    </>
  );
};

export default Player;
