import styled from 'styled-components';

const Toast = styled.div`
  position: absolute;
  background-color: rgba(125, 243, 209, 0.7);
  color: white;
  border-radius: 0.5rem;
  padding: 1.2rem;
  margin-top: ${props => props.marginTop};
  margin-right: ${props => props.marginRight};

  animation: fade-in 500ms ease;
`;

Toast.defaultProps = {
  marginTop: '4.5rem',
  marginRight: '0rem',
};
export default Toast;
