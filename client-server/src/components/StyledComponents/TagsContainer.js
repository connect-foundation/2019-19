import styled from 'styled-components';

const TagsContainer = styled.div`
  //   background-color: rgba(0, 0, 0, 0.3);
  display: inline-block;
  justify-content: flex-start;
  margin-left: ${props => props.marginLeft}%;
  flex-wrap: wrap;
  width: 40%;
  //   overflow: scroll;
`;

export default TagsContainer;
