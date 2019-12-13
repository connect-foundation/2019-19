import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import PlayBtn from './StyledComponents/CheckBoxLabel';
import CheckBox from './StyledComponents/CheckBox';
import LoginContext from '../loginContextApi/context';
import Toast from './StyledComponents/Toast';

const Toast = styled.div`
  position: absolute;
  background-color: rgba(125, 243, 209, 0.7);
  color: lightgray;
  border-radius: 0.5rem;
  padding: 1.2rem;
  margin-top: 4.5rem;
  animation: fade-in 500ms ease;
`;

const Toast = styled.div`
  position: absolute;
  background-color: rgba(125, 243, 209, 0.7);
  color: lightgray;
  border-radius: 0.5rem;
  padding: 1.2rem;
  margin-top: 4.5rem;
  animation: fade-in 500ms ease;
`;

const PlayButton = ({ name }) => {
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
  return (
    <>
      <CheckBox />
      <PlayBtn onClick={handlePlayClicked}>{name}</PlayBtn>
      {alertUserToLogin && <Toast>로그인이 필요합니다.</Toast>}
      {userTryPlay && <Redirect to={`/Player/${1}`} />}
    </>
  );
};

PlayButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PlayButton;
