import styled from 'styled-components';

const CheckBoxLabel = styled.label`
  background-color: rgba(51, 51, 51, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => {
    return props.padding ? props.padding : '1rem 1rem';
  }};
  border-radius: 0.2vw;
  box-shadow: none;
  font-size: 1.1vw;
  color: white;
  max-width: 15rem;

  .num-of-likes {
    font-size: small;
    margin: 0;
    text-align: center;
  }
  &:hover {
    cursor: pointer;
    background-color: lightgray;
    color: black;
  }
`;

export default CheckBoxLabel;
