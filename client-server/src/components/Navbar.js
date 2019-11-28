import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../dist/play.png';
import PageBtn from './PageBtn';

const serverURL = 'http://localhost:8000';

const StyledNavbarContainer = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  top: 0;
  position: sticky;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: rgb(20, 20, 20);
  z-index: 1;
`;
const StyledLogo = styled.img`
  float: left;
  margin: auto 2rem auto 2rem;
  padding: 0.5rem;
  width: 3%;
  height: 3%;

  &:hover {
    cursor: pointer;
  }
`;
const StyledNavRight = styled.div`
  display: flex;
  margin: auto 0 auto auto;
`;

const StyledLink = {
  display: 'contents',
  textDecoration: 'none',
};

const Navbar = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    axios
      .post(`${serverURL}/oauth/google/verify`, {
        userToken: Cookies.get('user_info'),
      })
      .then(response => {
        setUserInfo(response.data.userName);
      })
      .catch(err => console.log(err));
  }, []);

  const Logout = () => {
    Cookies.remove('user_info');
    setUserInfo(null);
    window.location.reload();
  };

  return (
    <StyledNavbarContainer>
      <Link to="/" style={StyledLink}>
        <StyledLogo className="logo" src={logo} />
      </Link>
      <Link to="/" style={StyledLink}>
        <PageBtn name="홈" />
      </Link>
      <Link to="/Recent" style={StyledLink}>
        <PageBtn name="최신 컨텐츠" />
      </Link>
      <Link to="/Popular" style={StyledLink}>
        <PageBtn name="인기 컨텐츠" />
      </Link>
      <StyledNavRight>
        <PageBtn name="🔍" />
        <PageBtn name="추천" />
        {userInfo ? (
          <PageBtn name={`${userInfo} 로그아웃`} onClick={Logout} />
        ) : (
          <a href="http://localhost:8000/oauth/google" style={StyledLink}>
            <PageBtn name="로그인" />
          </a>
        )}
      </StyledNavRight>
    </StyledNavbarContainer>
  );
};

export default Navbar;
