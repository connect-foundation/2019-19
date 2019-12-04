import styled from 'styled-components';

const GridContentBox = styled.div`
  display: block;
  margin: 1rem 0;
  width: 16.1rem;
  height: 10rem;
  transition: 500ms;
  box-sizing: border-box
  line-height: 1.4;
  background-image: url(${props => props.imgUrl});
  background-size: 100% 100%;
  opacity: ${props => props.opacity};

  .content-title {
    position: absolute;
    background-color: rgba(0,0,0,0.4);
    margin-left:1rem;
    color: white;
    max-width: 50%;
  }

  &:hover {
    z-index: 4;
    cursor: pointer;
    transform: scale(1.4);
    transition-delay: 0.3s;
  }

  video {
      width: 16.1rem;
      height: 10rem;
      transform: scale(1.4);
  }
`;

export default GridContentBox;
