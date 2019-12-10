import React, { useState, useEffect, useContext, useRef } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../dist/play.png';
import PageBtn from './PageBtn';
import SearchInput from './Search/SearchInput';
import SearchBox from './StyledComponents/SearchBox';
import SearchIcon from './Search/SearchIcon';
import LoginContext from '../loginContextApi/context';
import ENV from '../../env';

const StyledNavbarContainer = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  top: 0;
  position: sticky;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: rgb(20, 20, 20);
  z-index: 10;
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
  const { username, setUsername } = useContext(LoginContext);
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);

  const searchBoxOutClickHandler = ref => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSearchBoxVisible(false);
      }
    };
    useEffect(() => {
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  };
  const searchBoxRef = useRef(null);
  searchBoxOutClickHandler(searchBoxRef);

  const Logout = () => {
    Cookies.remove('user_info');
    setUsername(null);
    window.location.reload();
  };

  const showSearchBox = () => {
    setSearchBoxVisible(true);
  };

  return (
    <StyledNavbarContainer>
      <Link to="/" style={StyledLink}>
        <StyledLogo className="logo" src={logo} />
      </Link>
      <Link to="/" style={StyledLink}>
        <PageBtn name="홈" />
      </Link>
      <Link to="/recent" style={StyledLink}>
        <PageBtn name="최신 컨텐츠" />
      </Link>
      <Link to="/popular" style={StyledLink}>
        <PageBtn name="인기 컨텐츠" />
      </Link>
      {username ? (
        <Link to="/my-videos" style={StyledLink}>
          <PageBtn name="내가 찜한 컨텐츠" />
        </Link>
      ) : null}

      <Link to="/Player/1" style={StyledLink}>
        <PageBtn name="플레이어" />
      </Link>
      <StyledNavRight>
        <SearchBox onClick={showSearchBox} ref={searchBoxRef}>
          <SearchIcon />
          {searchBoxVisible && <SearchInput />}
        </SearchBox>
        <PageBtn name="추천" />
        {username ? (
          <PageBtn name={`${username} 로그아웃`} onClick={Logout} />
        ) : (
          <a href={`${ENV.apiServer}/oauth/google`} style={StyledLink}>
            <PageBtn name="로그인" />
          </a>
        )}
      </StyledNavRight>
    </StyledNavbarContainer>
  );
};

export default Navbar;
