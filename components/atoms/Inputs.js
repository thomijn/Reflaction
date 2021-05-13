import React from 'react';
import styled from 'styled-components/native';
import {Controller} from 'react-hook-form';

export const InputStyled = styled.TextInput`
  background: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  padding: 10px 20px 10px 20px;
  margin: ${(props) => props.margin || '10px 0px 10px 0px'};
`;

export const Label = styled.Text`
  margin: ${(props) => props.margin || '0px 0px 0px 0px'};
  color: ${(props) => props.color || '#fff'};
`;

const Input = ({
  control,
  name,
  placeholder = '',
  defaultValue = '',
  label,
  ...props
}) => {
  return (
    <Controller
      control={control}
      render={({onChange, onBlur, value}) => (
        <>
          {/* {label && <Label>{label}</Label>} */}
          <InputStyled
            {...props}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        </>
      )}
      name={name}
      rules={{required: true}}
      defaultValue={defaultValue}
    />
  );
};

export default Input;
