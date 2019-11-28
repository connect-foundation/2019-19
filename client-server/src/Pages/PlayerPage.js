import React, { createRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

let seeking = false; // seeking slider를 움직이는 중인지?
const toggleSeeking = () => {
  seeking = !seeking;
};

const Player = ({ match }) => {
  /* Context */
  const { showNav, setShowNav } = useContext(NavbarContext);

  /* History */
  const history = useHistory();
  history.listen(() => {
    if (showNav === false) {
      setShowNav(true);
    }
  });

  /* Reference */
  const player = createRef();

  /* State */
  const [duration, setDuration] = useState(0); // 영상의 총 길이
  const [playing, setPlaying] = useState(false); // 재생중 여부
  const [playedSeconds, setPlayedSeconds] = useState(0); // playedSeconds는 0 ~ duration 사이의 값
  const [loadedSeconds, setLoadedSeconds] = useState(0); // loadedSeconds는 0 ~ duration 사이의 값
  const [volume, setVolume] = useState(0.8);

  /* Lifecycle method */
  // Hide, Show Navbar
  useEffect(() => {
    setShowNav(false);
  }, []);

  /* Event handler */
  // Initialize duration of video
  const handleDuration = dur => {
    setDuration(dur);
  };

  // History Back Button
  const handleHistoryBack = () => {
    history.goBack();
  };

  // Play(Pause) Button
  const handlePlayAndPause = () => {
    setPlaying(!playing);
  };

  // Progress Slider
  const handleProgress = progress => {
    // We only want to update time slider if we are not currently seeking
    if (!seeking) {
      setPlayedSeconds(progress.playedSeconds);
      setLoadedSeconds(progress.loadedSeconds);
    }
  };

  // Seeking Slider
  const handleSeekSliderMouseDown = () => {
    toggleSeeking();
  };

  const handleSeekSliderChange = e => {
    setPlayedSeconds(e.target.value);
  };

  const handleSeekSliderMouseUp = e => {
    player.current.seekTo(e.target.value);
    toggleSeeking();
  };

  // Seeking Button
  const handleSeekButtonBackward = () => {
    toggleSeeking();
    player.current.seekTo(playedSeconds - 10);
    setPlayedSeconds(playedSeconds - 10);
    toggleSeeking();
  };

  const handleSeekButtonForward = () => {
    toggleSeeking();
    setPlayedSeconds(playedSeconds + 10);
    player.current.seekTo(playedSeconds + 10);
    toggleSeeking();
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
        onProgress={handleProgress}
      />
      <button type="button" onClick={handlePlayAndPause}>
        {playing ? 'pause' : 'play'}
      </button>
      <button type="button" onClick={handleSeekButtonBackward}>
        10초전
      </button>
      <button type="button" onClick={handleSeekButtonForward}>
        10초후
      </button>
      <button type="button" onClick={handleClickFullscreen}>
        전체화면
      </button>
      <button type="button" onClick={handleHistoryBack}>
        뒤로가기
      </button>
      <WhiteDiv>[남은시간]</WhiteDiv>
      <WhiteDiv id="totalTime" className="total_time">
        {Time.convertToTime(duration - playedSeconds)}
      </WhiteDiv>
      <WhiteDiv>[탐색바]</WhiteDiv>
      <input
        type="range"
        min={0}
        max={duration}
        step="any"
        value={playedSeconds}
        onMouseDown={handleSeekSliderMouseDown}
        onChange={handleSeekSliderChange}
        onMouseUp={handleSeekSliderMouseUp}
      />
      <progress max={duration} value={playedSeconds} />
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
