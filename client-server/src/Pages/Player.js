import React, {
  createRef,
  useState,
  useContext,
  useEffect,
  useRef,
} from 'react';
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
import PigselModal from '../components/Player/PigselModal';
import Volume from '../components/Player/VolumeButton';
import VolumeModal from '../components/Player/VolumeModal';
import Fullscreen from '../components/Player/Fullscreen';
import BackButton from '../components/BackButton';
import Time from '../utils/Time';
import CharCode from '../utils/CharCode';
import ENV from '../../env';

const axios = require('axios');

const apiServer = ENV.apiServer;

/* Styled Component */
const Wrapper = styled.div`
  color: white;
  cursor: ${props => (props.isActive ? '' : 'none')};
  animation: player-fade-in 2000ms ease;
  @keyframes player-fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
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

const PigselWrapper = styled.div`
  position: relative;
`;

const TitleSpan = styled.span`
  margin: 0 1.2em;
`;

const BottomButtons = styled.div`
  display: flex;
  align-items: center;
`;

const CenterEffect = styled.div`
  position: absolute;
  opacity: 0;
  left: ${props => props.left}%;
  top: 50%;
  transform: translate(-50%, -50%);
  animation: comes-and-goes 400ms ease;
  @keyframes comes-and-goes {
    0% {
      opacity: 0;
      transform: scale(1);
      transform: translate(-50%, -50%);
    }
    50% {
      opacity: 1;
      transform: scale(3);
      transform: translate(-50%, -50%);
    }
    100% {
      opacity: 0;
      transform: scale(5);
      transform: translate(-50%, -50%);
    }
  }
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
  let player;
  /* Context */
  const { showNav, setShowNav } = useContext(NavbarContext);
  /* History */
  const history = useHistory();
  history.listen(() => {
    window.onkeyup = null;
    if (!showNav) {
      setShowNav(true);
    }
  });

  /* Reference */
  const ReactPlayerRef = createRef();

  /* State */
  const [isActive, setIsActive] = useState(true);
  const [duration, setDuration] = useState(0); // 영상의 총 길이
  const [playing, setPlaying] = useState(false); // 재생중 여부
  const [effectVisible, setEffectVisible] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0); // playedSeconds는 0 ~ duration 사이의 값
  const [loadedSeconds, setLoadedSeconds] = useState(0); // loadedSeconds는 0 ~ duration 사이의 값
  const [volume, setVolume] = useState(0.8);
  const [effectLeft, setEffectLeft] = useState(50);
  const [prevVolume, setPrevVolume] = useState(0);
  const [effectContext, setEffectContext] = useState();
  const [hoverName, setHoverName] = useState('');
  const videoId = window.location.href.split('Player/')[1];
  const [pigsel, setPigsel] = useState('720p');
  const [videoUrl, setVideoUrl] = useState(
    `https://saltsyffjqrf3006180.cdn.ntruss.com//root/videos/${videoId}/${pigsel}.stream.m3u8`,
  );
  const [altVideoUrl, setAltVideoUrl] = useState(
    `https://saltsyffjqrf3006180.cdn.ntruss.com//root/videos/${videoId}.mp4`,
  );
  const [videoTitle, setVideoTitle] = useState(null);
  /* Lifecycle method */
  // Hide, Show Navbar & 비디오 타이틀 불러오기
  useEffect(() => {
    player = document.getElementById('video-player').children[0];
    window.onkeyup = function(e) {
      //   console.log(player.current);
      //   e.preventDefault();
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
        case CharCode.spaceCode:
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
    setShowNav(false);
    axios
      .post(`${apiServer}/video/get-name-by-vid`, {
        params: {
          videoId,
        },
      })
      .then(res => {
        setVideoTitle(res.data[0].name);
      });
  }, []);

  useEffect(() => {
    ReactPlayerRef.current.seekTo(playedSeconds);
    setPlaying(!playing);
  }, [pigsel]);

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
    const player = document.getElementById('video-player').children[0];
    setEffectLeft(50);
    player.paused ? fireEffect('►') : fireEffect('||');
    player.paused ? player.play() : player.pause();
    setPlaying(!player.paused);
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
    ReactPlayerRef.current.seekTo(e.target.value);
    toggleSeeking();
  };

  // Seeking Button
  const handleSeekButtonBackward = () => {
    setEffectLeft(10);
    fireEffect('<<');
    const player = document.getElementById('video-player').children[0];
    handleMouseMove();
    const playedSeconds = player.currentTime;
    toggleSeeking();
    const prev = playedSeconds - 10 <= 0 ? 0 : playedSeconds - 10;
    player.currentTime = prev;
    setPlayedSeconds(prev);
    toggleSeeking();
  };

  const handleSeekButtonForward = () => {
    setEffectLeft(90);
    fireEffect('>>');
    const player = document.getElementById('video-player').children[0];
    handleMouseMove();
    const duration = player.duration;
    const playedSeconds = player.currentTime;
    toggleSeeking();
    const next = playedSeconds + 10 >= duration ? duration : playedSeconds + 10;
    player.currentTime = next;
    setPlayedSeconds(next);
    toggleSeeking();
  };

  // Volume Slider
  const handleVolumeChange = e => {
    setVolume(parseFloat(e.target.value));
  };

  const handleVolumeUp = () => {
    setEffectLeft(50);
    fireEffect('Volume Up');
    if (player.volumne + 0.1 >= 1) player.volume = 1;
    else player.volume += 0.1;
    setVolume(player.volume);
  };

  const handleVolumeDown = () => {
    setEffectLeft(50);
    fireEffect('Volume Down');
    if (player.volume - 0.1 <= 0) player.volumne = 0;
    else player.volume -= 0.1;
    setVolume(player.volume);
  };

  const handleMute = () => {
    const player = document.getElementById('video-player').children[0];
    if (player.volume > 0) {
      setEffectLeft(50);
      fireEffect('Mute');
      player.volume = 0;
      setVolume(0);
      return;
    }
    setEffectLeft(50);
    fireEffect('Volume On');
    player.volume = 0.5;
    setVolume(0.5);
  };

  // Fullscreen Button
  const handleClickFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  const fireEffect = symbolString => {
    setEffectVisible(true);
    setEffectContext(symbolString);
    setTimeout(() => {
      setEffectVisible(false);
    }, 200);
  };

  /* Render */
  return (
    <Wrapper
      onClick={handleWrapperPlayAndPause}
      isActive={isActive}
      onMouseMove={handleMouseMove}
    >
      <ReactPlayer
        id="video-player"
        ref={ReactPlayerRef}
        width="100%"
        height="100vh"
        style={{ display: 'flex', position: 'relative' }}
        url={[videoUrl, altVideoUrl]}
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
            <TitleSpan>{videoTitle}</TitleSpan>
            <PigselWrapper>
              <PigselModal
                setPigsels={setPigsel}
                setVideoUrls={setVideoUrl}
                playedSeconds={Number(playedSeconds)}
                setPlayedSeconds={setPlayedSeconds}
                videoId={videoId}
              />
            </PigselWrapper>
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
      {effectVisible && (
        <CenterEffect left={effectLeft}>
          <div
            style={{
              backgroundColor: 'rgba(20,20,20,0.5)',
              borderRadius: '2rem',
              padding: '2rem',
              fontWeight: '30rem',
              fontSize: 'xx-large',
            }}
          >
            {effectContext}
          </div>
        </CenterEffect>
      )}
    </Wrapper>
  );
};

Player.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default Player;
