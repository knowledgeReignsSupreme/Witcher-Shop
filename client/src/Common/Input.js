import React from 'react';
import { colorsVariables } from '../GlobalStyles';
import styled from 'styled-components';

const Input = ({
  label,
  onChange,
  value,
  required,
  placeholder,
  error,
  type,
}) => {
  return (
    <StyledInput error={error}>
      <label htmlFor={label}>
        <p>{label}</p>
      </label>

      <input
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        htmlFor={label}
      />

      {error && (
        <p>
          <span>{error}</span>
        </p>
      )}
    </StyledInput>
  );
};

const StyledInput = styled.div`
  input {
    margin-top: 0.5rem;
    border: 1px solid ${colorsVariables.colorSecDark};
    border: ${(props) =>
      props.error && '1px solid' + colorsVariables.colorMainLight};
    padding-left: 0.6rem;
  }

  p span {
    color: ${colorsVariables.colorMainDark};
    font-weight: bold;
    font-size: 0.8rem;
  }

  p {
    margin-top: 0.3rem;
    font-weight: bold;
  }
`;

export default Input;
