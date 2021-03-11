import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';

import {Button} from '../atoms/Buttons';
import {Container} from '../atoms/Container';
import Input from '../atoms/Inputs';
import {Header} from '../atoms/Texts';
import {useStore} from '../../store';
import LinearGradient from 'react-native-linear-gradient';

const RegisterScreen = ({navigation}) => {
  const {control, handleSubmit} = useForm();
  const [initializing, setInitializing] = useState(true);
  const {setUser} = useStore();

  //create new user
  const onSubmit = (data) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        setUser({uid: user.user._user.uid});
        // firestore().collection('users').doc(user.user._user.uid).set({
        //   firstName: data.firstName,
        //   lastName: data.lastName,
        // });
        console.log('User account created & signed in!');
        navigation.navigate('Home');
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
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      locations={[0, 0.5]}
      style={{padding: 20}}
      colors={['#1ED2FC', '#015FDF']}>
      <Container>
        <Header margin="0px 0px 20px 0px">Registreren</Header>
        <Input
          placeholder="email"
          label="Email"
          name="email"
          control={control}
        />
        <Input
          placeholder="Wachtwoord"
          label="Wachwoord"
          secureTextEntry
          name="password"
          control={control}
        />
        <Button text="Sign up" onPress={handleSubmit(onSubmit)} />
      </Container>
    </LinearGradient>
  );
};

export default RegisterScreen;
