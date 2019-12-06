import styled from 'styled-components';

const Button = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rgba(51, 51, 51, 0.4);
  padding: 0.25em 1.5em;
  border-radius: 0.2vw;
  box-shadow: none;
  font-size: 1.1vw;
  margin-bottom: 0.75em;
  color: white;
  height: 100%;
  max-width: 15rem;
  margin-top: 10%;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
    color: black;
  }
`;

export default Button;
