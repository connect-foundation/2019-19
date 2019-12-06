import React, { createRef, useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ReactPlayer from "react-player";
import screenfull from "screenfull";
import PropTypes from "prop-types";
import { NavbarContext } from "../contexts/NavbarContext";
import PlayerSeekSlider from "../components/Player/PlayerSeekSlider";
import PlayerButton from "../components/Player/PlayerButton";
import PlayerPlay from "../components/Player/PlayerPlay";
import PlayerPause from "../components/Player/PlayerPause";
import PlayerForward from "../components/Player/PlayerForward";
import PlayerBackward from "../components/Player/PlayerBackward";
import PlayerVolume from "../components/Player/PlayerVolume";
import VolumeModal from "../components/Player/VolumeModal";
import PlayerFullscreen from "../components/Player/PlayerFullscreen";
import BackButton from "../components/BackButton";
import Time from "../utils/Time";
import CharCode from "../utils/CharCode";

/* Styled Component */
const Wrapper = styled.div`
  color: white;
  cursor: ${props => (props.isActive ? "" : "none")};
`;

/* Component */
const Player = ({ match }) => {
  /* Reference */
  const player = createRef();

  /* State */
  const [playing, setPlaying] = useState(false); // 재생중 여부

  /* Click Event handler */
  // Play(Pause) Button
  const handlePlayAndPause = () => {
    setPlaying(!playing);
  };

  const handleWrapperPlayAndPause = e => {
    const { tagName } = e.target;
    if (
      tagName === "BUTTON" ||
      tagName === "svg" ||
      tagName === "use" ||
      tagName === "INPUT"
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
        style={{ display: "flex", position: "relative" }}
        url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
        playing={playing}
        volume={volume}
        onDuration={handleDuration}
        onProgress={handleProgress}
      />
      <ControllerWrapper isActive={isActive}>
        <BackWrapper hoverName={hoverName}>
          <PlayerButton
            name="back"
            onClick={handleHistoryBack}
            hoverName={hoverName}
            setHoverName={setHoverName}
          >
            <BackButton />
          </PlayerButton>
        </BackWrapper>
        <BottomControllerWrapper>
          <BottomProgressWrapper hoverName={hoverName}>
            <PlayerSeekSlider
              duration={duration}
              playedSeconds={playedSeconds}
              handleSeekSliderMouseDown={handleSeekSliderMouseDown}
              handleSeekSliderChange={handleSeekSliderChange}
              handleSeekSliderMouseUp={handleSeekSliderMouseUp}
            />
            <TimeSpan id="totalTime" className="total_time">
              {Time.convertToTime(duration - playedSeconds)}
            </TimeSpan>
          </BottomProgressWrapper>
          <BottomButtons>
            <PlayerButton
              name={playing ? "pause" : "play"}
              onClick={handlePlayAndPause}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              {playing ? <PlayerPause /> : <PlayerPlay />}
            </PlayerButton>
            <PlayerButton
              name="backward"
              onClick={handleSeekButtonBackward}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              <PlayerBackward />
            </PlayerButton>
            <PlayerButton
              name="forward"
              onClick={handleSeekButtonForward}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              <PlayerForward />
            </PlayerButton>
            <VolumeWrapper>
              <VolumeModal
                volume={volume}
                handleVolumeChange={handleVolumeChange}
                hoverName={hoverName}
                setHoverName={setHoverName}
              />
              <PlayerButton
                name="volume"
                onClick={handleMute}
                hoverName={hoverName}
                setHoverName={setHoverName}
              >
                <PlayerVolume volume={volume} />
              </PlayerButton>
            </VolumeWrapper>
            <TitleSpan>타이틀</TitleSpan>
            <PlayerButton
              name="fullscreen"
              onClick={handleClickFullscreen}
              hoverName={hoverName}
              setHoverName={setHoverName}
            >
              <PlayerFullscreen />
            </PlayerButton>
          </BottomButtons>
        </BottomControllerWrapper>
      </ControllerWrapper>
    </Wrapper>
  );
};

Player.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};

export default Player;
