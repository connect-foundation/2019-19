import React from 'react';
import styled from 'styled-components';

const ControlButton = styled.button`
  width: 4em;
  height: 4em;
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
`;

const PlayerButton = ({ children, name, onClick }) => {
  return (
    <ControlButton type="button" onClick={onClick}>
      <ControlButtonSVG
        className={`svg-icon svg-icon-${name}`}
        focusable="false"
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

export default PlayerButton;
