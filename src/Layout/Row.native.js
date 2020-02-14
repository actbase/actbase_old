import React from 'react';
import styled from 'styled-components/native';

const Row = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: -10px;
  margin-right: -10px;

  ${props =>
    props.primary &&
    css`
      background: white;
      color: palevioletred;
    `}
`;

export default Row;
