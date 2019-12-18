import React, { useState, useEffect, useContext, useRef } from 'react';
import Cookies from 'js-cookie';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PageBtn from './PageBtn';
import SearchInput from './Search/SearchInput';
import SearchBox from './StyledComponents/SearchBox';
import Toast from './StyledComponents/Toast';
import SearchIcon from './Search/SearchIcon';
import Dropdown from './Recommender/Dropdown';
import RecommendContainer from './Recommender/RecommendContainer';
import LoginContext from '../loginContextApi/context';
import ENV from '../../env';

const StyledNavbarContainer = styled.div`
  display: flex;
  align-items: center;
  color: gray;
  top: 0;
  position: sticky;
  font-family: 'Nanum Gothic', sans-serif;
  background-color: rgba(20, 20, 20, 0.4);
  z-index: 10;
`;
const StyledLogo = styled.img`
  float: left;
  margin: 0.5rem 1rem 0.5rem 3rem;
  width: 6%;
  padding: 0rem;

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
  padding: '0',
};

const Navbar = () => {
  const { username, setUsername } = useContext(LoginContext);
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [recommenderVisible, setRecommenderVisible] = useState(false);
  const [alertToLogin, setAlertToLogin] = useState(false);

  const outClickHandler = (ref, stateSetter) => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        stateSetter(false);
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
  const recommenderRef = useRef(null);
  outClickHandler(searchBoxRef, setSearchBoxVisible);
  outClickHandler(recommenderRef, setRecommenderVisible);

  const Logout = () => {
    Cookies.remove('user_info');
    setUsername(null);
    window.location.reload();
  };

  const showSearchBox = () => {
    setSearchBoxVisible(true);
  };

  const showRecommender = () => {
    if (!username) {
      setAlertToLogin(true);
      setTimeout(() => {
        setAlertToLogin(false);
      }, 2500);
    }
    setRecommenderVisible(true);
  };
  return (
    <StyledNavbarContainer>
      <Link to="/" style={StyledLink}>
        <StyledLogo className="logo" src={'https://i.imgur.com/nXmZjP5.png'} />
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
      <StyledNavRight>
        <SearchBox onClick={showSearchBox} ref={searchBoxRef}>
          <SearchIcon />
          {searchBoxVisible && <SearchInput />}
        </SearchBox>
        <RecommendContainer onClick={showRecommender} ref={recommenderRef}>
          <PageBtn name="추천" />
          {username && recommenderVisible && <Dropdown />}
          {alertToLogin && (
            <Toast marginTop="1.5rem" marginRight="1rem">
              로그인이 필요합니다.
            </Toast>
          )}
        </RecommendContainer>
        {username ? (
          <PageBtn name={`${username} 로그아웃`} onClick={Logout} />
        ) : (
          <a href={`${ENV.apiServer}/oauth/google`} style={StyledLink}>
            <PageBtn
              name="로그인"
              iconUrl="https://icon-library.net/images/google-g-icon/google-g-icon-26.jpg"
            />
          </a>
        )}
      </StyledNavRight>
    </StyledNavbarContainer>
  );
};

export default Navbar;
