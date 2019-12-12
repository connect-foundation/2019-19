import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import PlayBtn from './StyledComponents/CheckBoxLabel';
import CheckBox from './StyledComponents/CheckBox';
import LoginContext from '../loginContextApi/context';

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
    }, 2000);
  };
  return (
    <>
      <CheckBox />
      <PlayBtn onClick={handlePlayClicked}>
        {name}
        {alertUserToLogin && (
          <h1 style={{ position: 'absolute' }}>로그인부터 하시죠</h1>
        )}
      </PlayBtn>

      {userTryPlay && <Redirect to={`/Player/${1}`} />}
    </>
  );
};

PlayButton.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PlayButton;
