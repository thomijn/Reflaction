import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import {View, TouchableOpacity, Animated, Keyboard} from 'react-native';

import {Button} from '../atoms/Buttons';
import Input from '../atoms/Inputs';
import {Header, Text} from '../atoms/Texts';
import {useStore} from '../../store';
import {theme} from '../../App';

const RegisterScreen = ({navigate, fadeAnimRegister, fadeOut}) => {
  const {control, handleSubmit} = useForm();
  const [initializing, setInitializing] = useState(true);
  const {setUser} = useStore();

  //create new user
  const onSubmit = (data) => {
    Keyboard.dismiss();
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        setUser({uid: user.user._user.uid});
        console.log('User account created & signed in!');
        navigate('Home');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <Animated.View
      style={[
        {
          backgroundColor: '#fff',
          position: 'absolute',
          bottom: 0,
          height: 400,
          width: '100%',
          padding: 40,
          elevation: 8,
        },
        {transform: [{translateY: fadeAnimRegister}]},
      ]}>
      <TouchableOpacity
        onPress={() => fadeOut(true)}
        style={{
          width: 50,
          height: 50,
          borderRadius: 50 / 2,
          backgroundColor: theme.colors.orange,
          position: 'absolute',
          top: -25,
          right: 50,
          display: 'flex',
          direction: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 6,
        }}>
        <Icon
          onPress={() => fadeOut(true)}
          name="close"
          size={30}
          color="#fff"
        />
      </TouchableOpacity>
      <Header style={{marginBottom: 20}}>Registreren</Header>
      <Input
        placeholderTextColor=" rgba(0, 0, 0, 0.5)"
        placeholder="Email"
        label="Email"
        name="email"
        control={control}
      />
      <Input
        placeholderTextColor=" rgba(0, 0, 0, 0.5)"
        placeholder="Wachtwoord"
        label="Wachwoord"
        secureTextEntry
        name="password"
        control={control}
      />
      <Button
        margin="10px 0px 30px 0px"
        text="Sign up"
        onPress={handleSubmit(onSubmit)}
      />
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <View style={{width: '60%'}}>
          <Text style={{textAlign: 'left'}} color={theme.colors.orange}>
            Heb je al een account?
          </Text>
        </View>
        <View style={{width: '40%'}}>
          <Text style={{textAlign: 'right'}} color="#000">
            Sign in
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default RegisterScreen;
