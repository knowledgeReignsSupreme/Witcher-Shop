import React from 'react';
import { colorsVariables, cssVariables } from '../GlobalStyles';
import styled from 'styled-components';

const Button = ({ text, icon, handleClick, args, event, type }) => {
  return (
    <div>
      {event ? (
        <StyledButton onClick={(e) => handleClick(e, ...args)} type={type}>
          {icon && icon} {text && text}
        </StyledButton>
      ) : (
        <StyledButton onClick={(e) => handleClick(...args)} type={type}>
          {icon && icon} {text && text}
        </StyledButton>
      )}
    </div>
  );
};

const StyledButton = styled.button`
  background: ${(props) =>
    props.type === 'red' && colorsVariables.colorMainLight};
  background: ${(props) =>
    props.type === 'black' && colorsVariables.colorSecDark};
  background: ${(props) => props.type === 'transparent' && 'transparent'};

  color: ${(props) => props.type === 'black' && colorsVariables.colorMainLight};
  color: ${(props) => props.type === 'red' && colorsVariables.colorSecDark};

  box-shadow: ${(props) => props.type !== 'icon' && cssVariables.boxShadow};
  border: ${(props) =>
    props.type === 'transparent' &&
    `1px solid ${colorsVariables.colorSecDark}`};

  padding: 0.3rem 0.6rem;
  font-weight: 600;

  transition: all 0.4s ease-out;
  &:hover {
    opacity: 0.75;
    padding: 0.3rem 0.9rem;
  }
`;

export default Button;
