import styled from 'styled-components';
import CheckBoxLabel from './CheckBoxLabel';

const CheckBox = styled.input`
  display: none;
  &:checked + ${CheckBoxLabel} {
    background: #4fbe79;
  }
`;

export default CheckBox;
