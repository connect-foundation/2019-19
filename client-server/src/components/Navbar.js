import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../dist/logo_red.png';
import PageBtn from './PageBtn';

const StyledNavbarContainer = styled.div`
  display: flex;
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
  width: 4rem;
  height: 4rem;

  &:hover {
    cursor: pointer;
  }
`;
const StyledNavRight = styled.div`
  display: flex;
  margin: auto 0 auto auto;
`;

const Navbar = () => {
  return (
    <StyledNavbarContainer>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <StyledLogo className="logo" src={logo} />
      </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <PageBtn name="홈" />
      </Link>
      <Link to="/Recent" style={{ textDecoration: 'none' }}>
        <PageBtn name="최신 컨텐츠" />
      </Link>
      <Link to="/Popular" style={{ textDecoration: 'none' }}>
        <PageBtn name="인기 컨텐츠" />
      </Link>
      <StyledNavRight>
        <PageBtn name="🔍" />
        <PageBtn name="추천" />
        <Link to="/Login" style={{ textDecoration: 'none' }}>
          <PageBtn name="로그인" />
        </Link>
      </StyledNavRight>
    </StyledNavbarContainer>
  );
};

export default Navbar;
