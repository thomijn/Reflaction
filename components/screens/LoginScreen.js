import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {View, Animated, TouchableOpacity, Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';

import {Button} from '../atoms/Buttons';
import Input from '../atoms/Inputs';
import {Header, Text} from '../atoms/Texts';
import {useStore} from '../../store';
import {theme} from '../../App';

const LoginScreen = ({navigate, fadeAnim, fadeOut}) => {
  const {control, handleSubmit} = useForm();
  const {setUser, selectedLanguage} = useStore();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    Keyboard.dismiss();
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then(async (user) => {
        const userInfo = await firestore()
          .collection('users')
          .doc(user.user._user.uid)
          .get();
        setUser({...userInfo._data, uid: user.user._user.uid});
        setLoading(false);
        if (userInfo.exists) {
          navigate('Home');
        } else {
          navigate('Sign up');
        }
      })
      .catch((error) => {
        setLoading(false);
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
        if (userInfo.exists) {
          navigate('Home');
        } else {
          navigate('Sign up');
        }
      }
    });
  }, []);

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
        {transform: [{translateY: fadeAnim}]},
      ]}>
      <TouchableOpacity
        onPress={() => fadeOut()}
        activeOpacity={0.9}
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
        <Icon onPress={() => fadeOut()} name="close" size={30} color="#fff" />
      </TouchableOpacity>
      <Header style={{marginBottom: 20}}>{selectedLanguage.login}</Header>
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
        text="Sign in"
        loading={loading}
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
            {selectedLanguage.forgot}
          </Text>
        </View>
        <View style={{width: '40%'}}>
          <Text style={{textAlign: 'right'}} color="#000">
            {selectedLanguage.registerUp}
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default LoginScreen;
