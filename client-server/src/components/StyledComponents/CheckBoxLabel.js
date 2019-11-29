import styled from 'styled-components';

const CheckBoxLabel = styled.label`
  background-color: rgba(51, 51, 51, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 0.2vw;
  box-shadow: none;
  font-size: 1.1vw;
  color: white;
  max-width: 15rem;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
    color: black;
  }
`;

export default CheckBoxLabel;
