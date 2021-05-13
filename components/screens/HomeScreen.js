import React from 'react';
import {View, Image} from 'react-native';
import {Container} from '../atoms/Container';
import {Header, Text} from '../atoms/Texts';
import {useStore} from '../../store';
import {Button} from '../atoms/Buttons';
import sitting from '../../assets/images/humaans.png';
import TopHeader from '../molecules/TopHeader';

const HomeScreen = ({navigation}) => {
  const {user} = useStore();

  return (
    <Container background="#fff" style={{padding: 20}}>
      <TopHeader navigation={navigation} />
      {!user?.buddy ? (
        <View
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            direction: 'column',
            justifyContent: 'center',
          }}>
          <Header style={{marginTop: 20}} color="#000">
            Hey {user?.firstName || 'Gebruiker'}!
          </Header>
          <Text style={{fontSize: 20, textAlign: 'center'}} color="#000">
            Voordat we kunnen beginnen moeten we eerst een buddy vinden
          </Text>
          <Button
            onPress={() => navigation.navigate('Buddy')}
            text="Buddy zoeken!"
          />
          <Image
            source={sitting}
            style={{
              position: 'absolute',
              zIndex: -2,
              width: 300,
              height: 300,
              bottom: -20,
              right: -100,
            }}
          />
        </View>
      ) : (
        <Text color="#000">je hebt al een buddy</Text>
      )}
    </Container>
  );
};

export default HomeScreen;
