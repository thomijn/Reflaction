import styled from 'styled-components/native';

export const Header = styled.Text`
  font-weight: bold;
  margin: ${(props) => props.margin || '0px'};
  color: ${(props) => props.color || '#000'};
  font-size: ${(props) => props.fontSize || '25px'};
`;

export const Text = styled.Text`
  margin: ${(props) => props.margin || '0px'};
  color: ${(props) => props.color || '#fff'};
  font-size: ${(props) => props.fontSize || '15px'};
`;
