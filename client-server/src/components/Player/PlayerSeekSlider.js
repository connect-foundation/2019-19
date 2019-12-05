import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SeekSlider = styled.input`
  width: 100%;
  cursor: pointer;
  margin: 0;

  -webkit-appearance: none;
  background-color: transparent;

  ::-moz-range-thumb {
    width: 1.1em;
    height: 1.1em;
    border: none;
    background: ${props => props.theme.MainColor};
    transition: all ease 0.25s;
  }

  :hover::-moz-range-thumb {
    transform: scale(1.1);
  }

  ::-moz-range-progress {
    height: 0.25em;
    transition: all ease 0.25s;
    background: ${props => props.theme.MainColor};
  }

  :hover::-moz-range-progress {
    height: 0.5em;
  }

  ::-moz-range-track {
    height: 0.25em;
    transition: all ease 0.25s;
    background: ${props => props.theme.SliderColor2};
  }

  :hover::-moz-range-track {
    height: 0.5em;
  }

  ::-webkit-slider-thumb {
    border: none;
    background: ${props => props.theme.MainColor};
  }

  :hover::-webkit-slider-thumb {
    transform: scale(1.1);
  }

  ::-webkit-slider-runnable-track {
    background: ${props => props.theme.SliderColor2};
  }

  :hover::-webkit-slider-runnable-track {
    height: 0.5em;
  }

  ::-ms-thumb {
    border: none;
    background: ${props => props.theme.MainColor};
  }

  :hover::-ms-thumb {
    transform: scale(1.1);
  }

  ::-ms-track {
    background: ${props => props.theme.SliderColor2};
  }

  :hover::-ms-track {
    height: 0.5em;
  }

  ::-ms-fill-lower {
    background: ${props => props.theme.SliderColor2};
  }

  ::-ms-fill-upper {
    background: ${props => props.theme.SliderColor2};
  }
`;

const PlayerSeekSlider = ({
  duration,
  playedSeconds,
  handleSeekSliderMouseDown,
  handleSeekSliderChange,
  handleSeekSliderMouseUp,
}) => {
  return (
    <>
      <SeekSlider
        type="range"
        min={0}
        max={duration}
        step="any"
        value={playedSeconds}
        onMouseDown={handleSeekSliderMouseDown}
        onChange={handleSeekSliderChange}
        onMouseUp={handleSeekSliderMouseUp}
      />
    </>
  );
};

PlayerSeekSlider.propTypes = {
  duration: PropTypes.number.isRequired,
  playedSeconds: PropTypes.number.isRequired,
  handleSeekSliderMouseDown: PropTypes.func.isRequired,
  handleSeekSliderChange: PropTypes.func.isRequired,
  handleSeekSliderMouseUp: PropTypes.func.isRequired,
};

export default PlayerSeekSlider;
