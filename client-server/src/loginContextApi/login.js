import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import LoginContext from './context';
import ENV from '../../env';

const axios = require('axios');

const Login = props => {
  const [userInfo, setUserInfo] = useState(null);
  const [username, setUsername] = useState(null);
  const userValue = {
    userInfo,
    setUserInfo,
    username,
    setUsername,
  };
  const { children } = props;
  useEffect(() => {
    axios
      .post(`${ENV.apiServer}/oauth/google/verify`, {
        userToken: Cookies.get('user_info'),
      })
      .then(response => {
        setUserInfo(response.data.userId);
        setUsername(response.data.userName);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <LoginContext.Provider value={userValue}>
        {children}
      </LoginContext.Provider>
    </>
  );
};

export default Login;
