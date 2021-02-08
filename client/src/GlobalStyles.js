import { createGlobalStyle } from 'styled-components';
import styled, { keyframes } from 'styled-components';

export const colorsVariables = {
  colorText: '#3a3939',
  colorLink: 'blue',
  colorMainDark: '#d81e2c',
  colorMainLight: '#ff0000',
  colorSecLight: '#414141',
  colorSecDark: '#252525',
  colorWhite: '#fff',
};

export const cssVariables = {
  boxShadow: '0 7px 5px rgba(0, 0, 0, 0.2)',
};

export const GlobalStyles = createGlobalStyle`
:root{

  font-family: 'Raleway', sans-serif;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html{
  color: ${colorsVariables.colorText};
  a{
    text-decoration: none;
    color: inherit;
  }
}



button {
    border: none;
    margin: 0;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    color: inherit;
    font: inherit;

    line-height: normal;

    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    -webkit-appearance: none;
    cursor: pointer;
}

button:disabled {
  cursor:not-allowed;
}

&::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.active{
  color: ${colorsVariables.mainColorDark}
}

ul{
  padding: 0;
}

img{
  max-width: 100%;
}

h1,h2,h3{
  font-family: 'Cinzel', serif;
  letter-spacing: .6px;
}

p,li{
  letter-spacing: 1px;
  font-weight: 400;
}

.active{
  color: ${colorsVariables.colorMainDark};
}
`;

export const GlobalPageInit = styled.main`
  width: 1500px;
  max-width: 95%;
  margin: 0 auto;
  margin-top: 0.2rem;
`;

export const StyledForm = styled.form`
  width: 100%;
  margin: 0 auto;
  margin-bottom: 1rem;

  button {
    margin-bottom: 1rem;
  }

  input {
    width: 95%;
  }

  p {
    width: 95%;
  }

  a {
    color: ${colorsVariables.colorLink};
    font-weight: bold;
  }

  div {
    margin-top: 1rem !important;
  }

  @media (min-width: 600px) {
    width: 35rem;
    input {
      width: 100%;
    }
  }
`;

export const slideDown = keyframes`
  0%{transform: translateY(-100%); opacity: 0;}
  100%{transform: translateY(0); opacity: 1;}
`;
