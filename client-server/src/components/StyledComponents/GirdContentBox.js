import styled from 'styled-components';

const GridContentBox = styled.div`
  display: block;
  width: 17.7rem;
  height: 11rem;
  background-image: url(${props => props.imgUrl});
  background-size: 100% 100%;
  transition: 500ms;
  object-fit: fill;
  padding: 0;
  border: solid rgb(20, 20, 20, 0) 0.01rem;

  .content-title {
    position: relative;
    background-color: rgba(0, 0, 0, 0.4);
    margin-left: 1rem;
    color: white;
    max-width: 70%;
  }

  &:hover {
    z-index: 5;
    cursor: pointer;
    transform: scale(1.4);
    opacity: 0;
    // transition-delay: 0.3s;
  }
  &:hover + .content-title {
    opaticy: 0;
  }
`;

export default GridContentBox;
