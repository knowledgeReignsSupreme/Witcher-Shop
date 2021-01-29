import React from 'react';
import { colorsVariables } from '../GlobalStyles';
import styled from 'styled-components';

const Error = ({ message }) => {
  return (
    <StyledError>
      <h3>Opps! An error has occured</h3>
      <p>{message}</p>
    </StyledError>
  );
};

const StyledError = styled.div`
  background: ${colorsVariables.colorMainDark};
  margin: 0 auto;
  width: 60rem;
  max-width: 90%;
  color: ${colorsVariables.colorWhite};
  text-align: center;
  p {
    font-weight: 600;
    margin-top: 0.5rem;
  }

  padding: 2rem 0;
`;
export default Error;
