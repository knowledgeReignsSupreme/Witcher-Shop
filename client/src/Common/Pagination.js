import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { colorsVariables } from '../GlobalStyles';

const Pagination = ({ pages, category, sort, keyword }) => {
  return (
    <StyledPagination>
      {[...Array(pages).keys()].map((page) => (
        <NavLink
          key={page + 1}
          to={
            keyword
              ? `/shop/category/${category}/sort/${sort}/search/${keyword}/page/${
                  page + 1
                }`
              : `/shop/category/${category}/sort/${sort}/page/${page + 1}`
          }
        >
          {page + 1}
        </NavLink>
      ))}
    </StyledPagination>
  );
};

const StyledPagination = styled.div`
  width: max-content;
  margin: 0 auto;

  a {
    font-size: 1.2rem;
    padding: 0.4rem 0.6rem;
    font-weight: bold;

    background: ${colorsVariables.colorSecDark};
    color: ${colorsVariables.colorMainLight};

    &:hover {
      color: ${colorsVariables.colorWhite};
    }
  }

  .active {
    color: ${colorsVariables.colorWhite};
  }

  a + a {
    margin-left: 0.5rem;
  }
`;

export default Pagination;
