import React, { useState } from 'react';
import styled from 'styled-components';

const MylistBtn = () => {
  const [mylist, setMylist] = useState(false);

  const contentText = mylist ? '✅' : '✚';
  //   useEffect(() => {
  //     axios.post('https://test.com/', {
  //       params: {
  //         user: `${user}`,
  //         content: `${name}`,
  //         ...
  //       },
  //     });
  //   }, [Like]);

  return (
    <div>
      <CheckBox
        id="checkbox2"
        type="checkbox"
        onClick={() => setMylist(!mylist)}
      />
      <CheckBoxLabel htmlFor="checkbox2">
        {contentText} 내가 찜한 콘텐츠
      </CheckBoxLabel>
    </div>
  );
};

const CheckBoxLabel = styled.label`
  background-color: gray;
  display: flex;
  margin-left: 10px;
  margin-right: 10px;
  justify-content: center;
  align-items: center;
  padding: 0.25em 1.5em;
  border-radius: 0.2vw;
  box-shadow: none;
  font-size: 1.1vw;
  margin-bottom: 0.75em;
  color: white;
  max-width: 15rem;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
    color: black;
  }
`;
const CheckBox = styled.input`
  opacity: 0;
  background-color: white;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
  }
`;

export default MylistBtn;
