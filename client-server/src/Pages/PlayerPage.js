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
  const [played, setPlayed] = useState(0); // played는 0-1 사이의 값
  const [seeking, setSeeking] = useState(false);

  /* Lifecycle method */
  useEffect(() => {
    setShowNav(false);
  }, []);

  /* Event handler */
  const playAndPause = () => {
    setPlaying(!playing);
  };

  const setDurationTime = inputDuration => {
    setDuration(inputDuration);
  };

  const onPro = state => {
    console.log('onProg:', state);
  };

  const onSek = e => {
    console.log('onSek:', e);
  };

  // Seeking Slider
  const handleSeekMouseDown = e => {
    setSeeking(true);
  };

  const handleSeekChange = e => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseUp = e => {
    setSeeking(false);
    player.current.seekTo(parseFloat(e.target.value));
  };

  // Seeking Button
  const seekBefore = () => {};
  const seekAfter = () => {};

  /* Render */
  return (
    <>
      <Title>비디오ID URL파라미터로 받기 - {match.params.videoId}</Title>
      <ReactPlayer
        width="100%"
        height="100vh"
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        playing={playing}
        onDuration={setDurationTime}
        // onProgress={onPro}
        // onSeek={onSek}
        ref={player}
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
      <WhiteDiv id="totalTime" className="total_time">
        Remaining타임 = {Time.convertToTime(duration * (1 - played))}
      </WhiteDiv>
      <input
        type="range"
        min={0}
        max={1}
        step="any"
        value={played}
        onMouseDown={handleSeekMouseDown}
        onChange={handleSeekChange}
        onMouseUp={handleSeekMouseUp}
      />
      <progress max={1} value={played} />
    </>
  );
};

export default Player;
