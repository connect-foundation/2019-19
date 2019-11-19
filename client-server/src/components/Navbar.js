import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../dist/play.png';
import PageBtn from './PageBtn';

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
        <a href={'http://localhost:8000/oauth/google'} style={StyledLink}>
          <PageBtn name="로그인" />
        </a>
      </StyledNavRight>
    </StyledNavbarContainer>
  );
};

export default Navbar;
