import React from 'react';
import { View, Image, FlatList, ScrollView } from 'react-native';
import { Container } from '../atoms/Container';
import { Header, Text } from '../atoms/Texts';
import { useStore } from '../../store';
import { Button } from '../atoms/Buttons';
import sitting from '../../assets/images/humaans.png';
import TopHeader from '../molecules/TopHeader';
import ChallengeCard from '../molecules/ChallengeCard';
import ShadowCard from '../atoms/ShadowCard';
import Leaderboard from '../molecules/Leaderboard';
import YourBuddy from '../molecules/YourBuddy';

const HomeScreen = ({ navigation }) => {
  const { user } = useStore();

  return (
    <Container background="#fff">
      <View style={{ padding: 20 }}>
        <TopHeader navigation={navigation} />
      </View>
      {!user?.buddy ? (
        <View
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            direction: 'column',
            justifyContent: 'center',
            padding: 20
          }}>
          <Header style={{ marginTop: 20 }} color="#000">
            Hey {user?.firstName || 'Gebruiker'}!
          </Header>
          <Text style={{ fontSize: 20, textAlign: 'center' }} color="#000">
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
        <ScrollView style={{ margin: 20 }}>
          <Leaderboard />
          <Header color={'#FFA62B'} style={{ marginTop: 20 }}>Challenges</Header>
          <Container style={{ marginBottom: 20 }}>
            <ChallengeCard active={true} header={'Wandelen'} body={'Lekker wandelen om gezonder te worden. De wereld begint op het einde van je comfort zone'} />
            <ChallengeCard active={false} header={'Nordic walking'} body={'Lekker nordic walken om gezonder te worden. De wereld begint op het einde van je comfort zone'} />
            <ChallengeCard active={false} header={'Line dancen'} body={'Lekker line dancen om gezonder te worden. De wereld begint op het einde van je comfort zone'} />
          </Container>
        </ScrollView>
      )}
    </Container>
  );
};

export default HomeScreen;
