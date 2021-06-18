import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Radar from 'react-native-radar';

import {Container} from '../atoms/Container';
import {Header, Text} from '../atoms/Texts';
import {useStore} from '../../store';
import {Button} from '../atoms/Buttons';
import sitting from '../../assets/images/humaans.png';
import TopHeader from '../molecules/TopHeader';
import ChallengeCard from '../molecules/ChallengeCard';
import ShadowCard from '../atoms/ShadowCard';
import Leaderboard from '../molecules/Leaderboard';
import useDocumentData from '../../hooks/useDocumentData';

const HomeScreen = ({navigation}) => {
  const {user} = useStore();
  const [latestUser, loading] = useDocumentData(`users/${user.uid}`);
  const [activeChallenge] = useDocumentData(
    `challenges/${latestUser?.activeChallenge}`,
  );
  useEffect(() => {
    Radar.setUserId(user.uid);
  }, []);

  return (
    <Container background="#fff" style={{padding: 20}}>
      <TopHeader navigation={navigation} />
      {!latestUser?.buddy ? (
        <View
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            direction: 'column',
            justifyContent: 'center',
            padding: 20,
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
        <View>
          <Header style={{marginTop: 20}}>Hey {user.firstName}!</Header>
          <Header color={'#FFA62B'} style={{marginTop: 20, fontSize: 20}}>
            Actieve Challenge
          </Header>
          {activeChallenge && latestUser?.activeChallenge !== 'null' ? (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Challenges')}>
                <ChallengeCard
                  active={true}
                  header={activeChallenge.name}
                  body={activeChallenge.description}
                />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Challenges')}>
              <Text style={{marginTop: 10}} color="#000">
                Je hebt nog geen actieve challenge
              </Text>
            </TouchableOpacity>
          )}
          <Header color={'#FFA62B'} style={{marginTop: 20, fontSize: 20}}>
            Laatse bericht
          </Header>
          <ShadowCard>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{uri: user?.userImage}}
              />
              <Text style={{marginRight: 10}} color={'#FFA62B'}>
                Hey, wanneer gaan we Wandelen?
              </Text>
            </View>
          </ShadowCard>
          <Leaderboard />
        </View>
      )}
    </Container>
  );
};

export default HomeScreen;
