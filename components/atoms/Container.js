import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  display: flex;
  background: ${(props) => props.background || 'rgba(0,0,0,0)'};
`;
