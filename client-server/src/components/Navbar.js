import React from 'react';
import styled from 'styled-components';
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
      <StyledLogo className="logo" src={logo} />
      <PageBtn name="홈" />
      <PageBtn name="최신 컨텐츠" />
      <PageBtn name="인기 컨텐츠" />
      <StyledNavRight>
        <PageBtn name="검색" />
        <PageBtn name="추천" />
        <PageBtn name="로그인" />
      </StyledNavRight>
    </StyledNavbarContainer>
  );
};

export default Navbar;
