import React from 'react';
import {Container} from '../atoms/Container';
import {Header} from '../atoms/Texts';
import ChallengeCard from '../molecules/ChallengeCard';
import TopHeader from '../molecules/TopHeader';

const ChallengesScreen = ({navigation}) => {
  return (
    <>
      <Container background="#fff" style={{padding: 20}}>
        <TopHeader navigation={navigation} />
        <Header style={{marginTop: 20}}>Challenges</Header>
        <Header color={'#FFA62B'} style={{marginTop: 20, fontSize: 20}}>
          Actieve Challenge
        </Header>
        <ChallengeCard
          active={true}
          header={'Wandelen'}
          body={
            'Lekker wandelen om gezonder te worden. De wereld begint op het einde van je comfort zone'
          }
        />
        <Header color={'#000'} style={{marginTop: 20, fontSize: 20}}>
          Open Challenges
        </Header>
        <ChallengeCard
          active={false}
          header={'Gezonde maaltijd koken'}
          body={'Bereid een gezonde maaltijd volgens het gegeven recept'}
        />
        <ChallengeCard
          active={false}
          header={'Fietstocht'}
          body={'Ontdek je omgeving op een sportieve en leuke manier'}
        />
      </Container>
    </>
  );
};

export default ChallengesScreen;
