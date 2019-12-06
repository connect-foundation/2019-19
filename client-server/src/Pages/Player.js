import React, { createRef, useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import PropTypes from 'prop-types';
import { NavbarContext } from '../contexts/NavbarContext';
import SeekSlider from '../components/Player/SeekSlider';
import Button from '../components/Player/Button';
import Play from '../components/Player/Play';
import Pause from '../components/Player/Pause';
import Forward from '../components/Player/Forward';
import Backward from '../components/Player/Backward';
import Volume from '../components/Player/VolumeButton';
import VolumeModal from '../components/Player/VolumeModal';
import Fullscreen from '../components/Player/Fullscreen';
import BackButton from '../components/BackButton';
import Time from '../utils/Time';
import CharCode from '../utils/CharCode';

/* Styled Component */
const Wrapper = styled.div`
  color: white;
  cursor: ${props => (props.isActive ? '' : 'none')};
`;

const ControllerWrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  visibility: ${props => (props.isActive ? 'visible' : 'hidden')};
  opacity: ${props => (props.isActive ? 1 : 0)};
  transition: opacity ease 0.2s;
`;

const BackWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  ::after {
    content: '뒤로 가기';
    font-size: ${props => (props.hoverName === 'back' ? '1em' : '0.7em')};
    margin-left: ${props => (props.hoverName === 'back' ? '0' : '-1em')};
    visibility: ${props => (props.hoverName === 'back' ? 'visible' : 'hidden')};
    opacity: ${props => (props.hoverName === 'back' ? 1 : 0)};
    transition: opacity ease 0.2s, margin-left ease 0.2s, font-size ease 0.2s;
  }
`;

const BottomProgressWrapper = styled.div`
  display: flex;
  margin: 0 1em;
  align-items: center;
  visibilty: ${props => (props.hoverName === 'volume' ? 'visible' : 'block')};
  opacity: ${props => (props.hoverName === 'volume' ? 0 : 1)};
  transition: opacity ease 0.2s;
`;

const TimeSpan = styled.time`
  margin-left: 1em;
  font-size: 0.9em;
`;

const BottomControllerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%
  padding-bottom: 0.5em;
`;

const VolumeWrapper = styled.div`
  position: relative;
`;

const TitleSpan = styled.span`
  margin: 0 1.2em;
`;

const BottomButtons = styled.div`
  display: flex;
  align-items: center;
`;

/* Seeking Variable */
let seeking = false; // seeking slider를 움직이는 중인지?
const toggleSeeking = () => {
  seeking = !seeking;
};

/* Hover Variable */
let countdown;
const changeCountdown = (callback, hoverName) => {
  callback(true);
  clearTimeout(countdown);
  if (hoverName === '') {
    countdown = setTimeout(() => {
      if (hoverName === '') {
        callback(false);
      }
    }, 4000);
  }
};

/* Component */
const Player = ({ match }) => {
  /* Context */
  const { showNav, setShowNav } = useContext(NavbarContext);

  /* History */
  const history = useHistory();
  history.listen(() => {
    if (!showNav) {
      setShowNav(true);
    }
  });

  /* Reference */
  const player = createRef();

  /* State */
  const [isActive, setIsActive] = useState(true);
  const [duration, setDuration] = useState(0); // 영상의 총 길이
  const [playing, setPlaying] = useState(false); // 재생중 여부
  const [playedSeconds, setPlayedSeconds] = useState(0); // playedSeconds는 0 ~ duration 사이의 값
  const [loadedSeconds, setLoadedSeconds] = useState(0); // loadedSeconds는 0 ~ duration 사이의 값
  const [volume, setVolume] = useState(0.8);
  const [prevVolume, setPrevVolume] = useState(0);
  const [hoverName, setHoverName] = useState('');

  /* Lifecycle method */
  // Hide, Show Navbar
  useEffect(() => {
    setShowNav(false);
  }, []);

  /* Mouse Hover Event */
  const handleMouseMove = () => {
    changeCountdown(setIsActive, hoverName);
  };

  /* Click Event handler */
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

  const handleWrapperPlayAndPause = e => {
    const { tagName } = e.target;
    if (
      tagName === 'BUTTON' ||
      tagName === 'svg' ||
      tagName === 'use' ||
      tagName === 'INPUT'
    ) {
      return;
    }
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
    const next = playedSeconds - 10 <= 0 ? 0 : playedSeconds - 10;
    player.current.seekTo(next);
    setPlayedSeconds(next);
    toggleSeeking();
  };

  const handleSeekButtonForward = () => {
    toggleSeeking();
    const next = playedSeconds + 10 >= duration ? duration : playedSeconds + 10;
    setPlayedSeconds(next);
    player.current.seekTo(next);
    toggleSeeking();
  };

  // Volume Slider
  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };

  const handleVolumeUp = () => {
    if (volume + 0.1 >= 1) setVolume(1);
    else setVolume(volume + 0.1);
  };

  const handleVolumeDown = () => {
    if (volume - 0.1 <= 0) setVolume(0);
    else setVolume(volume - 0.1);
  };

  const handleMute = () => {
    setPrevVolume(volume);
    setVolume(prevVolume);
  };

  // Fullscreen Button
  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  /* Keyboard Event Handler */
  const handleKeyDownEvent = e => {
    e.preventDefault();
    switch (e.keyCode) {
      case CharCode.leftArrowCode:
        handleSeekButtonBackward();
        break;
      case CharCode.rightArrowCode:
        handleSeekButtonForward();
        break;
      case CharCode.upArrodCode:
        handleVolumeUp();
        break;
      case CharCode.downArrowCode:
        handleVolumeDown();
        break;
      case CharCode.enterCode:
        handlePlayAndPause();
        break;
      case CharCode.FCode:
      case CharCode.fCode:
        handleClickFullscreen();
        break;
      case CharCode.MCode:
      case CharCode.mCode:
        handleMute();
        break;
      default:
    }
  };

  const handleKeyUpEvent = e => {
    e.preventDefault();
    switch (e.keyCode) {
      case CharCode.spaceCode:
        handlePlayAndPause();
        break;
      default:
    }
  };

  /* Render */
  return (
    <Wrapper
      onKeyDown={handleKeyDownEvent}
      onKeyUp={handleKeyUpEvent}
      onMouseMove={handleMouseMove}
      isActive={isActive}
      onClick={handleWrapperPlayAndPause}
    >
      <ReactPlayer
        ref={player}
        width="100%"
        height="100vh"
        style={{ display: 'flex', position: 'relative' }}
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        playing={playing}
        volume={volume}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />
      <ControllerWrapper isActive={isActive}>
        <BackWrapper hoverName={hoverName}>
          <Button
            name="back"
            onClick={handleHistoryBack}
            hoverName={hoverName}
            setHoverName={setHoverName}
          >
            <BackButton />
          </Button>
        </BackWrapper>
        <BottomControllerWrapper>
          <BottomProgressWrapper hoverName={hoverName}>
            <SeekSlider
              duration={duration}
              playedSeconds={Number(playedSeconds)}
              handleSeekSliderMouseDown={handleSeekSliderMouseDown}
              handleSeekSliderChange={handleSeekSliderChange}
              handleSeekSliderMouseUp={handleSeekSliderMouseUp}
            />
            <TimeSpan id="totalTime" className="total_time">
              {Time.convertToTime(duration - playedSeconds)}
            </TimeSpan>
          </BottomProgressWrapper>
          <BottomButtons>
            <Button
              name={playing ? 'pause' : 'play'}
              onClick={handlePlayAndPause}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              {playing ? <Pause /> : <Play />}
            </Button>
            <Button
              name="backward"
              onClick={handleSeekButtonBackward}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              <Backward />
            </Button>
            <Button
              name="forward"
              onClick={handleSeekButtonForward}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              <Forward />
            </Button>
            <VolumeWrapper>
              <VolumeModal
                volume={volume}
                handleVolumeChange={handleVolumeChange}
                hoverName={hoverName}
                setHoverName={setHoverName}
              />
              <Button
                name="volume"
                onClick={handleMute}
                hoverName={hoverName}
                setHoverName={setHoverName}
              >
                <Volume volume={volume} />
              </Button>
            </VolumeWrapper>
            <TitleSpan>타이틀</TitleSpan>
            <Button
              name="fullscreen"
              onClick={handleClickFullscreen}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              <Fullscreen />
            </Button>
          </BottomButtons>
        </BottomControllerWrapper>
      </ControllerWrapper>
    </Wrapper>
  );
};

Player.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default Player;
