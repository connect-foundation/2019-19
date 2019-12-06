import React from 'react';
import VolumeHigh from './VolumeHigh';
import VolumeMedium from './VolumeMedium';
import VolumeLow from './VolumeLow';
import VolumeMuted from './VolumeMuted';

const VolumeButton = ({ volume }) => {
  const changeButtonByVolume = () => {
    if (volume >= 0.66) {
      return <VolumeHigh />;
    }
    if (volume >= 0.33) {
      return <VolumeMedium />;
    }
    if (volume > 0) {
      return <VolumeLow />;
    }
    return <VolumeMuted />;
  };

  return changeButtonByVolume(volume);
};

export default VolumeButton;
