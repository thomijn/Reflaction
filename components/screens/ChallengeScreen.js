import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MapboxGL from '@react-native-mapbox-gl/maps';
MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGhvbWlqbiIsImEiOiJjazdoZ3Q0Y3EwOWpjM2xwOGxqbzAyMXN6In0.N8dw4i5BFe2WPxOGEIWBoA',
);
MapboxGL.setConnected(true);

import {Button} from '../atoms/Buttons';
import {Container} from '../atoms/Container';
import {Header, Text} from '../atoms/Texts';
import TopHeader from '../molecules/TopHeader';

const ChallengeScreen = ({navigation, challenge, setSelectedChallenge}) => {
  return (
    <>
      <Container background="#fff" style={{padding: 20}}>
        <TopHeader navigation={navigation} />
        <Header style={{marginTop: 20, marginBottom: 20}}>
          <Icon
            onPress={() => setSelectedChallenge(false)}
            size={30}
            style={{marginTop: 20}}
            name="arrow-left"
          />{' '}
          {challenge.name}
        </Header>
        <Text
          style={{marginBottom: 20, fontSize: 18, lineHeight: 25}}
          color={'#2B2D42'}>
          {challenge.text}
        </Text>
        {challenge.requirements.map((req) => (
          <Text key={req} style={{marginBottom: 20}} color={'#2B2D42'}>
            - {req}
          </Text>
        ))}
        {challenge.name === 'Wandelen' && (
          <View
            style={{
              alignItems: 'center',
              height: 250,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <MapboxGL.MapView
              style={{flex: 1, height: '100%', width: '100%', borderRadius: 10}}
            />
          </View>
        )}
        <View
          style={{
            bottom: 20,
            left: 20,
            position: 'absolute',
            width: '100%',
            alignItems: 'center',
            flex: 1,
          }}>
          <Button margin="0px 0px 0px 0px" text="START CHALLENGE" />
        </View>
      </Container>
    </>
  );
};

export default ChallengeScreen;
