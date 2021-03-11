import React from 'react';
import auth from '@react-native-firebase/auth';

import {Container} from '../atoms/Container';
import {Header} from '../atoms/Texts';

const HomeScreen = () => {
  return (
    <Container>
      <Header onPress={() => auth().signOut()}>Hey</Header>
    </Container>
  );
};

export default HomeScreen;
