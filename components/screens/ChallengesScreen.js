import React, {useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import useCollectionData from '../../hooks/useCollectionData';
import useDocumentData from '../../hooks/useDocumentData';
import {useStore} from '../../store';
import {Container} from '../atoms/Container';
import {Header} from '../atoms/Texts';
import ChallengeCard from '../molecules/ChallengeCard';
import TopHeader from '../molecules/TopHeader';
import ChallengeScreen from './ChallengeScreen';

const ChallengesScreen = ({navigation}) => {
  const [selectedChallenge, setSelectedChallenge] = useState();
  const {user} = useStore();
  const [latestUser] = useDocumentData(`users/${user.uid}`);
  const [activeChallenge] = useDocumentData(
    `challenges/${latestUser?.activeChallenge}`,
  );

  const [challenges] = useCollectionData('challenges', {
    where: [[firestore.FieldPath.documentId(), '!=', user.activeChallenge]],
  });
  const [geofenceCoords, setGeofenceCoords] = useState([0.0, 0.0]);
  console.log(geofenceCoords);

  useEffect(() => {
    fetch('https://api.radar.io/v1/geofences', {
      method: 'GET',
      headers: {
        Authorization: 'prj_test_sk_85f457c13ad51394512e11a8fec4a64f30e1a6d0',
      },
    })
      .then((response) => response.json())
      .then((json) =>
        setGeofenceCoords(json.geofences[0].geometryCenter.coordinates),
      )
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {selectedChallenge ? (
        <ChallengeScreen
          latestUser={latestUser}
          geofenceCoords={geofenceCoords}
          active={selectedChallenge.id === latestUser?.activeChallenge}
          setSelectedChallenge={setSelectedChallenge}
          challenge={selectedChallenge}
        />
      ) : (
        <ScrollView style={{height: '100%', backgroundColor: '#fff'}}>
          <Container background="#fff" style={{padding: 20, height: '100%'}}>
            <TopHeader navigation={navigation} />
            <Header style={{marginTop: 20}}>Challenges</Header>
            {activeChallenge && latestUser?.activeChallenge !== 'null' && (
              <>
                <Header color={'#FC9A00'} style={{marginTop: 20, fontSize: 20}}>
                  Actieve Challenge
                </Header>
                <TouchableOpacity
                  onPress={() => setSelectedChallenge(activeChallenge)}>
                  <ChallengeCard
                    active={true}
                    header={activeChallenge.name}
                    body={activeChallenge.description}
                  />
                </TouchableOpacity>
              </>
            )}
            <Header color={'#000'} style={{marginTop: 20, fontSize: 20}}>
              Open Challenges
            </Header>
            {challenges.map((challenge) => (
              <TouchableOpacity
                onPress={() => setSelectedChallenge(challenge)}
                key={challenge.id}>
                <ChallengeCard
                  setSelectedChallenge={setSelectedChallenge}
                  active={false}
                  header={challenge.name}
                  body={challenge.description}
                />
              </TouchableOpacity>
            ))}
          </Container>
        </ScrollView>
      )}
    </>
  );
};

export default ChallengesScreen;
