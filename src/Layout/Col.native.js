import React from 'react';
import styled from 'styled-components/native';

const Col = styled.View`
  display: flex;
  flex: 1;
  padding: 10px;
  min-width: 50%;

  ${props =>
    props.primary &&
    css`
      background: white;
      color: palevioletred;
    `}
`;

export default Col;
