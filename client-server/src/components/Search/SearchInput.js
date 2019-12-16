import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

const StyledInputBox = styled.div`
  width: 15rem;
  height: 95%;
  border: solid lightgray 0.1rem;
  border-radius: 0.2rem;
  margin: auto;
  margin-left: 0;
  padding: 0.1rem
  animation: slide-down 0.4s ease;

  @keyframes slide-down {
    0% {
      opacity: 0;
      transform: translateY(-4rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const inputStyle = {
  backgroundColor: 'rgba(20,20,20,1)',
  color: 'white',
  height: '3rem',
  width: '90%',
  paddingLeft: '1rem',
  fontSize: 'medium',
  border: 'none',
};

const SearchInput = () => {
  const [userInput, setUserInput] = useState(null);

  const changeURL = e => {
    //   document.getElementById('realbody').innerHTML = e.target.value;
    //   location.pathname = e.target.value;
    setUserInput(e.target.value);

    // 유저가 검색창에 단어를 모두 지우면 홈으로 리다이렉트하기 위함
    if (e.target.value === '') {
      setUserInput(false);
    }
    console.log(e.target.value);
  };
  return (
    <StyledInputBox>
      <input
        style={inputStyle}
        placeholder="제목, 태그, 유사어"
        type="text"
        onKeyUp={changeURL}
        id="search-contents-input"
        autoFocus
      ></input>
      {userInput && <Redirect to={`/search/${userInput}`} />}
      {userInput === false && <Redirect to={'/'} />}
    </StyledInputBox>
  );
};

export default SearchInput;
