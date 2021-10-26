import React from 'react'
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

const StyledButton = styled.button`
  width: 100%;
  height: 35px;
  border: none;
  background: #9B51E0;
  padding: 0 15px;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  margin-top: 10px;

  :hover {
    cursor: pointer;
    background: #9B51E0dd;
  }
`;

function Page404() {
  const history = useHistory();

  const goBack = () => {
    history.push('/login')
  }
  return (
    <div>
      <h3>404 PAGE NOT FOUND</h3>
      <StyledButton onClick={() => goBack()}> {'<'} Back to Login</StyledButton>
    </div>
  )
}

export default Page404
