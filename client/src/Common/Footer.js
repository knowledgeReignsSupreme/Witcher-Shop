import React from 'react';
import logo from '../images/logo.png';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <OutterFooter>
      <StyledFooter>
        <Disclaimer>
          <p>
            Disclaimer: All the products in this website are fictional. No
            payments are real so feel free to navigate and place "orders"
          </p>
        </Disclaimer>
        <Links>
          <Link to=''>
            <p>
              Github: <FaGithub />
            </p>
          </Link>
        </Links>
        <Link to='/https://github.com/knowledgeReignsSupreme'>
          <img src={logo} alt='logo' />
        </Link>
      </StyledFooter>
    </OutterFooter>
  );
};

const OutterFooter = styled.footer`
  width: 100%;
  height: auto;
  z-index: 3;
  background: ${colorsVariables.colorSecDark};
  margin-top: 1rem;
  padding: 1rem 0;
`;

const StyledFooter = styled.div`
  width: 1500px;
  max-width: 93%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: white;

  p {
    font-weight: bold;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  img {
    width: 4rem;
    margin: 0 auto;
  }
`;

const Disclaimer = styled.div``;

const Links = styled.div`
  cursor: pointer;

  p,
  svg {
    font-size: 1.3rem !important;
    color: ${colorsVariables.colorMainDark};
  }
`;

export default Footer;
