import React, { useState } from "react";
import styled from "styled-components";
import IconCross from "./iconSvg";

//좋아요 버튼!
const LikeBtn = ({ userId, videoId }) => {
  const [Like, setLike] = useState(false);

  // useEffect(() => {
  //   axios.post('https://test.com/', {
  //     params: {
  //       user: `${userId}`,
  //       content: `${videoId}`,
  //       ...
  //     },
  //   });
  // }, [Like]);

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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  margin-left: 90px;
  background-color: white;
  height: 30px;
  border-radius: 15px;
  border: 1px solid white;
  top: 30px;
  cursor: pointer;
  &: hover {
    transform: scale(1.3);
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
