import React from 'react';
import {Container} from '../atoms/Container';
import ChallengeCard from '../molecules/ChallengeCard';
import TopHeader from '../molecules/TopHeader';

const ChallengesScreen = ({navigation}) => {
  return (
    <>
      <Container background="#fff" style={{padding: 20}}>
        <TopHeader navigation={navigation} />
        <ChallengeCard
          active={true}
          header={'Wandelen'}
          body={
            'Lekker wandelen om gezonder te worden. De wereld begint op het einde van je comfort zone'
          }
        />
        <ChallengeCard
          active={false}
          header={'Nordic walking'}
          body={
            'Lekker nordic walken om gezonder te worden. De wereld begint op het einde van je comfort zone'
          }
        />
        <ChallengeCard
          active={false}
          header={'Line dancen'}
          body={
            'Lekker line dancen om gezonder te worden. De wereld begint op het einde van je comfort zone'
          }
        />
      </Container>
    </>
  );
};

export default ChallengesScreen;
