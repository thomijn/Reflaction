import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View} from 'react-native';

import {Button} from '../atoms/Buttons';
import {Container} from '../atoms/Container';
import Input from '../atoms/Inputs';
import {Header, Text} from '../atoms/Texts';
import {useStore} from '../../store';
import LinearGradient from 'react-native-linear-gradient';
import {onGoogleButtonPress} from '../../hooks/googleLogin';

const LoginScreen = ({navigation: {navigate}}) => {
  const {control, handleSubmit} = useForm();
  const {setUser} = useStore();

  const onSubmit = (data) => {
    console.log(data);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (user) => {
        const userInfo = await firestore()
          .collection('users')
          .doc(user.user._user.uid)
          .get();
        setUser({...userInfo._data, uid: user.user._user.uid});
        navigate('Home');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      if (user) {
        const userInfo = await firestore()
          .collection('users')
          .doc(user._user.uid)
          .get();
        setUser({...userInfo._data, uid: user._user.uid});
        navigate('Home');
      }
    });
  }, []);

  return (
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      locations={[0, 0.5]}
      style={{padding: 40}}
      colors={['#1ED2FC', '#015FDF']}>
      <Header margin="0px 0px 20px 0px">Login</Header>
      <Text margin="20px 0px 50px 0px" fontSize="20px">
        Lorem ipsum dolor sit amet, et mei ipsum molestie, cu illud minim
        commune eam. Quo case
      </Text>
      <Input
        placeholderTextColor="rgb(3, 101, 154)"
        placeholder="Gebruikersnaam"
        label="Email"
        name="email"
        control={control}
      />
      <Input
        placeholderTextColor="rgb(3, 101, 154)"
        placeholder="Wachtwoord"
        label="Wachwoord"
        secureTextEntry
        name="password"
        control={control}
      />
      <Container>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: '48%',
              marginRight: 10,
            }}>
            <Button
              margin="10px 0px 30px 0px"
              text="Login"
              small
              onPress={handleSubmit(onSubmit)}
            />
          </View>
          <View
            style={{
              width: '48%',
            }}>
            <Button
              google
              margin="10px 0px 30px 0px"
              text="Google"
              onPress={() =>
                onGoogleButtonPress()
                  .then(() => {
                    navigate('Home');
                    console.log('Signed in with Google!');
                  })
                  .catch((err) => console.log(err))
              }
            />
          </View>
        </View>
        <Text
          onPress={() => navigate('Register')}
          style={{opacity: 0.5, textAlign: 'center'}}>
          Sign up
        </Text>
      </Container>
    </LinearGradient>
  );
};

export default LoginScreen;
