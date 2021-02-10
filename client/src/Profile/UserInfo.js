import React from 'react';
import styled from 'styled-components';
import user from '../images/user.png';

const UserInfo = ({ loggedUser }) => {
  return (
    <StyledUserInfo>
      <StyledImage>
        <img src={user} alt={loggedUser.name} />
      </StyledImage>
      <StyledText>
        <h3>Welcome back {loggedUser.name} !</h3>
        <p> Name: {loggedUser.name}</p>
        <p> Email: {loggedUser.email}</p>
      </StyledText>
    </StyledUserInfo>
  );
};

const StyledUserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const StyledImage = styled.div`
  img {
    max-height: 8rem;
  }
`;

const StyledText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 6rem;

  p {
    margin-top: 0.5rem;
    display: block;
  }
`;

export default UserInfo;
