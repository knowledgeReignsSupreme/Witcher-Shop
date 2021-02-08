import React from 'react';
import { colorsVariables, cssVariables } from '../GlobalStyles';
import styled from 'styled-components';

const Button = ({
  text,
  icon,
  handleClick,
  args,
  event,
  color,
  link,
  disabled,
  submit,
}) => {
  return (
    <div>
      {event ? (
        <StyledButton onClick={(e) => handleClick(e, ...args)} color={color}>
          {icon && icon} {text && text}
        </StyledButton>
      ) : handleClick ? (
        <StyledButton onClick={(e) => handleClick(...args)} color={color}>
          {icon && icon} {text && text}
        </StyledButton>
      ) : link || disabled ? (
        <StyledButton color={color} disabled={disabled}>
          {icon && icon} {text && text}
        </StyledButton>
      ) : submit ? (
        <StyledButton color={color} type='submit'>
          {icon && icon} {text && text}
        </StyledButton>
      ) : (
        ''
      )}
    </div>
  );
};

const StyledButton = styled.button`
  background: ${(props) =>
    props.color === 'red' && colorsVariables.colorMainDark};
  background: ${(props) =>
    props.color === 'black' && colorsVariables.colorSecDark};
  background: ${(props) => props.color === 'transparent' && 'transparent'};

  color: ${(props) => props.color === 'black' && colorsVariables.colorMainDark};
  color: ${(props) => props.color === 'red' && colorsVariables.colorWhite};

  box-shadow: ${(props) => props.color !== 'icon' && cssVariables.boxShadow};
  border: ${(props) =>
    props.color === 'transparent' &&
    `1px solid ${colorsVariables.colorSecDark}`};

  padding: 0.4rem 0.6rem;
  font-weight: 600;

  transition: all 0.4s ease-out;
  &:hover {
    opacity: 0.75;
    padding: 0.4rem 0.9rem;
  }
`;

export default Button;
