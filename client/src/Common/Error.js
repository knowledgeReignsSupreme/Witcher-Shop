import React from 'react';
import { colorsVariables, GlobalPageInit } from '../GlobalStyles';
import styled from 'styled-components';

const Error = ({ message }) => {
  return (
    <StyledError>
      <h3>Opps! An error has occured</h3>
      <p>{message}</p>
    </StyledError>
  );
};

const StyledError = styled(GlobalPageInit)`
  background: ${colorsVariables.colorMainDark};
  color: ${colorsVariables.colorWhite};
  text-align: center;
  p {
    font-weight: 600;
    margin-top: 0.5rem;
  }

  padding: 2rem 0;
`;
export default Error;
