import React from 'react';
import styled from 'styled-components';

const StyledInputBox = styled.div`
  width: 16rem;
  height: 100%;
  // border: solid red 0.1rem;
  margin: auto;
  margin-left: 0;
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
  width: '100%',
  //   border: 'purple solid 0.1rem',
  fontSize: 'medium',
};

const SearchInput = () => {
  return (
    <StyledInputBox>
      <input
        style={inputStyle}
        placeholder="제목, 이름, 태그"
        type="text"
      ></input>
    </StyledInputBox>
  );
};

export default SearchInput;
