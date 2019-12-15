import styled from 'styled-components';

const TagsContainer = styled.div`
  padding: 0.5rem;
  //   background-color: rgba(0, 0, 0, 0.3);
  //   border: solid white 0.1rem;
  display: inline-block;
  justify-content: flex-start;
  margin-left: ${props => props.marginLeft}%;
  flex-wrap: wrap;
  width: 40%;
  //   overflow: scroll;
`;

export default TagsContainer;
