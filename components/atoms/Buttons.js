import styled, {css} from 'styled-components/native';
import React from 'react';

export const ButtonStyled = styled.TouchableOpacity`
  color: red;
  background-color: #fff;
  padding: 8px;
  border-radius: 20px;
  margin: ${(props) => props.margin || '20px 0px 20px 0px'};
  display: flex;
  justify-content: center;
  align-content: center;
  elevation: 2;

  ${(props) =>
    props.google &&
    css`
      width: 100%;
    `}
  ${(props) =>
    props.small &&
    css`
      width: 150px;
    `}
      ${(props) =>
    props.facebook &&
    css`
      width: 100%;
    `};
`;

export const TextStyled = styled.Text`
  color: rgb(3, 101, 154);
  text-align: center;
  font-weight: bold;
  font-size: 12px;

  ${(props) =>
    props.google &&
    css`
      color: #db4437;
    `}
  ${(props) =>
    props.facebook &&
    css`
      color: #3b5998;
    `}
`;

export const Button = ({text, ...props}) => {
  return (
    <ButtonStyled activeOpacity={0.7} {...props}>
      <TextStyled {...props}>{text}</TextStyled>
    </ButtonStyled>
  );
};
