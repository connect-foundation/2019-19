import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import IconCross from './iconSvg';

const axios = require('axios');

const apiServer = 'http://localhost:8000';

const LikeBtn = ({ userId, thumbNailImg }) => {
  const [Like, setLike] = useState(false);
  console.log(userId, thumbNailImg);

  useEffect(() => {
    axios.post(`${apiServer}/`, {
      params: {
        userId: `${userId}`,
        thumbNailImg: `${thumbNailImg}`,
      },
    });
  }, [Like]);

  return (
    <div>
      <CheckBox id="checkbox" type="checkbox" onClick={() => setLike(!Like)} />
      <CheckBoxLabel htmlFor="checkbox">
        <IconCross />
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
  margin: auto;
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

export default LikeBtn;
