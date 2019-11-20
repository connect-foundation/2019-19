import React from 'react';
import ReactPlayer from 'react-player';

const titleStyle = {
  color: 'white',
};

const Player = ({ match }) => {
  return (
    <>
      <h2 style={titleStyle}>
        비디오ID URL파라미터로 받기 - {match.params.videoId}
      </h2>
      <ReactPlayer url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8" />
    </>
  );
};

export default Player;
