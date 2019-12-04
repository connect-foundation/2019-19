import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import '../../styles/css/playerButton.css';

const ControlButton = styled.button`
  width: 3em;
  height: 3em;
  background-color: transparent;
  border: none;
  padding: 0;
`;

const ControlButtonSVG = styled.svg`
  width: 3em;
  height: 3em;
  cursor: pointer;
  fill: white;
  stroke: white;
  stroke-width: 0;
  transition: all ease 0.2s;
`;

const PlayerButton = ({ children, name, onClick, hoverName, setHoverName }) => {
  const [isActive, setIsActive] = useState(true);

  /* For Hover Effect */
  const checkActive = () => {
    if (hoverName === '' || hoverName === name) setIsActive(true);
    else setIsActive(false);
  };

  useEffect(() => {
    checkActive();
  }, [hoverName]);

  /* Handle Pointer Event */
  const handlePointerEnter = () => {
    setHoverName(name);
  };

  const handlePointerLeave = () => {
    setHoverName('');
  };

  return (
    <ControlButton
      className={`player-button player-button-${name}`}
      type="button"
      onClick={onClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <ControlButtonSVG
        className={`svg-icon svg-icon-${name} ${
          isActive ? '' : 'svg-icon-blurred'
        }`}
      >
        <use filter="" xlinkHref={`#${name}`}>
          <symbol id={`${name}`} viewBox="0 0 28 28">
            {children}
          </symbol>
        </use>
      </ControlButtonSVG>
    </ControlButton>
  );
};

PlayerButton.propTypes = {
  children: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  hoverName: PropTypes.string.isRequired,
  setHoverName: PropTypes.func.isRequired,
};

export default PlayerButton;
