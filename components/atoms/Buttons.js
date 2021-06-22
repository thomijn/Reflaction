import styled, {css} from 'styled-components/native';
import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {theme} from '../../App';
import {useStore} from '../../store';

export const ButtonStyled = styled.TouchableOpacity`
  color: red;
  background-color: ${(props) => props.background || props.theme.colors.orange};
  padding: ${(props) => props.padding || '15px'};
  border-radius: 30px;
  margin: ${(props) => props.margin || '20px 0px 20px 0px'};
  width: ${(props) => props.width || '100%'};
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
  color: ${(props) => props.color || '#fff'};
  text-align: center;
  font-weight: bold;
  font-size: ${(props) => props.fontSize || '15px'};

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

export const Button = ({text, loading, icon, ...props}) => {
  return (
    <ButtonStyled activeOpacity={0.7} {...props}>
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : !icon ? (
        <TextStyled {...props}>{text}</TextStyled>
      ) : (
        icon
      )}
    </ButtonStyled>
  );
};

export const SwitchButton = ({fadeIn}) => {
  const {selectedLanguage} = useStore();

  return (
    <>
      <View
        style={{
          margin: 20,
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 20,
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: 30,
            backgroundColor: '#fff',
            elevation: 3,
          }}>
          <TouchableOpacity
            onPress={() => {
              fadeIn();
            }}
            activeOpacity={0.8}
            style={{
              width: '50%',
              backgroundColor: theme.colors.orange,
              padding: 15,
              borderRadius: 30,
            }}>
            <Text
              style={{color: '#fff', textAlign: 'center', fontWeight: 'bold'}}>
              {selectedLanguage.signIn}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              fadeIn(true);
            }}
            activeOpacity={0.8}
            style={{width: '50%', padding: 15}}>
            <Text
              style={{
                color: theme.colors.orange,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              {selectedLanguage.register}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
