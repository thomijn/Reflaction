import React, {useRef} from 'react';
import {Image, View, Animated} from 'react-native';

import {SwitchButton} from '../atoms/Buttons';
import {Container} from '../atoms/Container';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

import standing1 from '../../assets/images/humaans.png';
import standing2 from '../../assets/images/humaaan-1.png';
import standing3 from '../../assets/images/standing-21.png';
import logo from '../../assets/images/logo.png';

const WelcomeScreen = ({navigation: {navigate}}) => {
  const fadeAnim = useRef(new Animated.Value(500)).current;
  const fadeAnimRegister = useRef(new Animated.Value(500)).current;

  const fadeIn = (register) => {
    !register
      ? Animated.spring(fadeAnim, {
          toValue: 0,
          stiffness: 90,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start()
      : Animated.spring(fadeAnimRegister, {
          toValue: 0,
          stiffness: 90,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start();
  };

  const fadeOut = (register) => {
    !register
      ? Animated.spring(fadeAnim, {
          toValue: 500,
          stiffness: 90,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start()
      : Animated.spring(fadeAnimRegister, {
          toValue: 500,
          stiffness: 90,
          damping: 20,
          mass: 1,
          useNativeDriver: true,
        }).start();
  };

  return (
    <>
      <Container
        onPress={() => fadeOut()}
        background="#fff"
        style={{padding: 40}}>
        <Image
          style={{
            position: 'absolute',
            right: -100,
            bottom: -20,
            width: 400,
            height: 400,
          }}
          source={standing1}
        />
        <Image
          style={{
            position: 'absolute',
            left: -100,
            top: -20,
            width: 300,
            height: 450,
          }}
          source={standing2}
        />
        <Image
          style={{
            position: 'absolute',
            right: -80,
            top: -70,
            width: 300,
            height: 450,
          }}
          source={standing3}
        />
        <View
          style={{
            marginTop: 250,
            padding: 20,
            justifyContent: 'center',
            display: 'flex',
          }}>
          <Image
            style={{
              width: '100%',
              height: 150,
            }}
            source={logo}
          />
        </View>
        <SwitchButton fadeIn={fadeIn} />
      </Container>
      <LoginScreen fadeOut={fadeOut} fadeAnim={fadeAnim} navigate={navigate} />
      <RegisterScreen
        navigate={navigate}
        fadeAnimRegister={fadeAnimRegister}
        fadeOut={fadeOut}
      />
    </>
  );
};

export default WelcomeScreen;
