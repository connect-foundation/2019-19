import React, { createRef, useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
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
  const [volume, setVolume] = useState(0.8);

  /* Lifecycle method */
  useEffect(() => {
    setShowNav(false);
  }, []);

  /* Event handler */
  // Initialize duration of video
  const handleDuration = dur => {
    setDuration(dur);
  };

  // Play(Pause) Button
  const handlePlayAndPause = () => {
    setPlaying(!playing);
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

  // Volume Slider
  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };

  // Fullscreen Button
  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request(player.current.getInternalPlayer());
    }
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
        volume={volume}
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
      <button type="button" onClick={handleClickFullscreen}>
        전체화면
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
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={volume}
        onChange={handleVolumeChange}
      />
    </>
  );
};

export default Player;
