import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledBtn = styled.div`
  margin: auto 1rem;
  font-weight: 0.1rem;
  color: white;
  display: flex;
  flex-direction: row;
  min-width: 3rem;
  max-width: 10rem;
  justify-content: center;
  align-items: center;

  .google-login-icon {
    width: 15%;
    height: 15%;
    margin-right: 0.5rem;
  }

  &:hover {
    cursor: pointer;
    color: lightgray;
  }
`;

const PageBtn = ({ name, onClick, iconUrl }) => {
  return (
    <StyledBtn onClick={onClick}>
      {iconUrl && <img className="google-login-icon" src={iconUrl} />}
      <p>{name}</p>
    </StyledBtn>
  );
};

PageBtn.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

PageBtn.defaultProps = {
  onClick() {},
};

export default PageBtn;
