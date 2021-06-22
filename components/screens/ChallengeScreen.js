import React, { useState } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MapboxGL from '@react-native-mapbox-gl/maps';
import firestore from '@react-native-firebase/firestore';
import Radar from 'react-native-radar';
import { Card, CardItem, Body, Badge } from 'native-base';
import ConfettiCannon from 'react-native-confetti-cannon';

MapboxGL.setAccessToken(
  'pk.eyJ1IjoidGhvbWlqbiIsImEiOiJjazdoZ3Q0Y3EwOWpjM2xwOGxqbzAyMXN6In0.N8dw4i5BFe2WPxOGEIWBoA',
);
MapboxGL.setConnected(true);

import { Button } from '../atoms/Buttons';
import { Container } from '../atoms/Container';
import { Header, Text } from '../atoms/Texts';
import TopHeader from '../molecules/TopHeader';
import { useStore } from '../../store';
import { theme } from '../../App';

const ChallengeScreen = ({
  navigation,
  challenge,
  setSelectedChallenge,
  active,
  geofenceCoords,
  latestUser,
}) => {
  const { user } = useStore();
  const [challengeComplete, setChallengeComplete] = useState(false);

  const formatDate = () => {
    let dd = challenge.date.toDate().getDate();
    let mm = challenge.date.toDate().getMonth() + 1;

    let yyyy = challenge.date.toDate().getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    return dd + '-' + mm + '-' + yyyy;
  };

  //check geofence events
  Radar.on('events', (result) => {
    if (
      result.user.userId === user.uid &&
      challenge.name === 'Wandelen' &&
      active
    ) {
      if (result.events[0].type === 'user.exited_geofence') {
        console.log('exit');
      } else if (result.events[0].type === 'user.entered_geofence') {
        firestore()
          .collection('users')
          .doc(user.uid)
          .set(
            {
              score: latestUser?.score ? latestUser.score + 100 : 0 + 100,
              activeChallenge: 'null',
            },
            { merge: true },
          )
          .then(() => setChallengeComplete(true));
      }
    }
  });

  return (
    <>
      <Container background="#fff" style={{ padding: 20, height: '100%' }}>
        <TopHeader navigation={navigation} />
        <Header style={{ marginTop: 20, marginBottom: 20 }}>
          <Icon
            onPress={() => setSelectedChallenge(false)}
            size={30}
            style={{ marginTop: 20 }}
            name="arrow-left"
          />{' '}
          {challenge.name}
        </Header>
        <Text
          style={{ marginBottom: 20, fontSize: 18, lineHeight: 25 }}
          color={'#2B2D42'}>
          {challenge.text}
        </Text>
        {challenge.date && (
          <Badge
            style={{ backgroundColor: 'green', marginBottom: 20, padding: 20 }}>
            <Text style={{ color: 'white', fontSize: 13 }}>
              {formatDate()}
              {'  '}17: 00
            </Text>
          </Badge>
        )}
        {challenge.requirements.map((req) => (
          <Text key={req} style={{ marginBottom: 20 }} color={'#2B2D42'}>
            - {req}
          </Text>
        ))}
        {challenge.name === 'Samen wandelen' && active && (
          <View
            style={{
              alignItems: 'center',
              height: 250,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <MapboxGL.MapView
              logoEnabled={false}
              style={{
                flex: 1,
                height: '100%',
                width: '100%',
                borderRadius: 10,
              }}>
              <MapboxGL.Camera
                zoomLevel={13}
                centerCoordinate={geofenceCoords}
              />
              <MapboxGL.PointAnnotation
                snippet="location"
                coordinate={geofenceCoords}
              />
              <MapboxGL.UserLocation animated />
            </MapboxGL.MapView>
          </View>
        )}
        {!active && challenge.name === 'Samen wandelen' && (
          <View
            style={{
              bottom: 20,
              left: 20,
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
              flex: 1,
            }}>
            <Button
              onPress={() => {
                firestore()
                  .collection('users')
                  .doc(user.uid)
                  .update({ activeChallenge: challenge.id });
              }}
              margin="0px 0px 0px 0px"
              text="START CHALLENGE"
            />
          </View>
        )}
        {!active && challenge.name === 'Koken bij Open Keuken' && (
          <View
            style={{
              bottom: 20,
              left: 20,
              position: 'absolute',
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <View style={{ marginLeft: 15, width: '44%' }}>
              <Button
                onPress={() => {
                  firestore()
                    .collection('users')
                    .doc(user.uid)
                    .update({ activeChallenge: challenge.id });
                }}
                margin="0px 0px 0px 0px"
                text="KOKEN"
              />
            </View>
            <View style={{ marginLeft: 15, width: '44%' }}>
              <Button
                onPress={() => {
                  firestore()
                    .collection('users')
                    .doc(user.uid)
                    .update({ activeChallenge: challenge.id });
                }}
                margin="0px 0px 0px 0px"
                text="AANSCHUIVEN"
              />
            </View>
          </View>
        )}
        {challengeComplete && (
          <>
            <ConfettiCannon count={50} origin={{ x: -10, y: 0 }} />
            <View
              style={{
                position: 'absolute',
                top: 100,
                width: '100%',
                left: 19,
                height: 400,
              }}>
              <Card style={{ backgroundColor: theme.colors.orange }}>
                <CardItem header>
                  <Icon
                    onPress={() => {
                      setSelectedChallenge(false);
                    }}
                    size={30}
                    style={{ position: 'absolute', right: 20 }}
                    name="x"
                  />
                  <Text fontSize="20px" color="#000">
                    Gefeliciteerd!
                  </Text>
                </CardItem>
                <CardItem>
                  <Body>
                    <Text color="#000">
                      {succes}
                    </Text>
                  </Body>
                </CardItem>
                <CardItem footer button>
                  <Text color="#000">
                    {earn} <Text color={theme.colors.orange}>100</Text>{' '}
                    {points}
                  </Text>
                </CardItem>
              </Card>
            </View>
          </>
        )}
      </Container>
    </>
  );
};

export default ChallengeScreen;
