import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import PlayBtn from './StyledComponents/CheckBoxLabel';
import CheckBox from './StyledComponents/CheckBox';
import LoginContext from '../loginContextApi/context';
import Toast from './StyledComponents/Toast';

const PlayButton = ({ name, videoId }) => {
  const { userInfo } = useContext(LoginContext);
  const [userTryPlay, setUserTryPlay] = useState(false);
  const [alertUserToLogin, setAlertUserToLogin] = useState(false);
  const handlePlayClicked = () => {
    userInfo ? setUserTryPlay(true) : showMsgToLogin();
  };
  const showMsgToLogin = () => {
    setAlertUserToLogin(true);
    setTimeout(() => {
      setAlertUserToLogin(false);
    }, 1500);
  };
  const history = useHistory();
  return (
    <>
      <CheckBox />
      <PlayBtn onClick={handlePlayClicked}>{name}</PlayBtn>
      {alertUserToLogin && <Toast>로그인이 필요합니다.</Toast>}
      {userTryPlay && history.push(`/Player/${videoId}`)}
    </>
  );
};

PlayButton.propTypes = {
  name: PropTypes.string.isRequired,
  videoId: PropTypes.string.isRequired,
};

export default PlayButton;
