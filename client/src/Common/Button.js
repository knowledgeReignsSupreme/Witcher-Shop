import React from 'react';
import { colorsVariables, cssVariables } from '../GlobalStyles';
import styled from 'styled-components';

const Button = ({
  text,
  icon,
  handleClick,
  args,
  event,
  type,
  link,
  disabled,
}) => {
  return (
    <div>
      {event ? (
        <StyledButton onClick={(e) => handleClick(e, ...args)} type={type}>
          {icon && icon} {text && text}
        </StyledButton>
      ) : handleClick ? (
        <StyledButton onClick={(e) => handleClick(...args)} type={type}>
          {icon && icon} {text && text}
        </StyledButton>
      ) : link || disabled ? (
        <StyledButton type={type} disabled={disabled}>
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
    props.type === 'red' && colorsVariables.colorMainDark};
  background: ${(props) =>
    props.type === 'black' && colorsVariables.colorSecDark};
  background: ${(props) => props.type === 'transparent' && 'transparent'};

  color: ${(props) => props.type === 'black' && colorsVariables.colorMainDark};
  color: ${(props) => props.type === 'red' && colorsVariables.colorWhite};

  box-shadow: ${(props) => props.type !== 'icon' && cssVariables.boxShadow};
  border: ${(props) =>
    props.type === 'transparent' &&
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
