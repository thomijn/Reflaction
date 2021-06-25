import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import Radar from 'react-native-radar';
import {Card, CardItem, Badge} from 'native-base';

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
import {theme} from '../../App';
import en from '../../assets/lang/en.json';
import nl from '../../assets/lang/nl.json';

const HomeScreen = ({navigation}) => {
  const {user, setSelectedLanguage, selectedLanguage} = useStore();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [latestUser, loading] = useDocumentData(`users/${user.uid}`);
  const [buddy] = useDocumentData(`users/${latestUser?.buddy}`);
  const [activeChallenge] = useDocumentData(
    `challenges/${latestUser?.activeChallenge}`,
  );
  const [buddyChat] = useDocumentData(`chats/${latestUser?.buddyChat}`);

  useEffect(() => {
    Radar.setUserId(user.uid);
  }, []);

  return (
    <ScrollView>
      <Container background="#fff" style={{padding: 20, height: '100%'}}>
        <TopHeader
          lang
          languageOpen={languageOpen}
          setLanguageOpen={setLanguageOpen}
          navigation={navigation}
        />
        {!latestUser?.buddy ? (
          <View
            style={{
              display: 'flex',
              height: 600,
              background: '#fff',
              alignItems: 'center',
              direction: 'column',
              justifyContent: 'center',
              padding: 20,
            }}>
            <Header style={{marginTop: 20}} color="#000">
              {user?.firstName || 'Gebruiker'}!
            </Header>
            <Text
              style={{fontSize: 20, textAlign: 'center'}}
              color="#000"></Text>
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
            {languageOpen && (
              <View style={{position: 'absolute', width: '100%'}}>
                <Card>
                  <CardItem>
                    <Header color="#000" fontSize="15px">
                      Selecteer taal
                    </Header>
                  </CardItem>
                  <CardItem>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => {
                          setLanguageOpen(false);
                          setSelectedLanguage(nl);
                        }}>
                        <Badge
                          style={{
                            marginRight: 10,
                            backgroundColor: theme.colors.orange,
                          }}>
                          <Text>NL</Text>
                        </Badge>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          setLanguageOpen(false);
                          setSelectedLanguage(en);
                        }}>
                        <Badge
                          style={{
                            marginRight: 10,
                            backgroundColor: theme.colors.orange,
                          }}>
                          <Text>EN</Text>
                        </Badge>
                      </TouchableOpacity>
                    </View>
                  </CardItem>
                </Card>
              </View>
            )}
            <Header style={{marginTop: 20}}>Hey {user.firstName}!</Header>
            <Header color={'#FC9A00'} style={{marginTop: 20, fontSize: 20}}>
              {selectedLanguage.activeChallenge}
            </Header>
            {activeChallenge && latestUser?.activeChallenge !== 'null' ? (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Challenges')}>
                  <ChallengeCard
                    house={activeChallenge.name === 'Wandel met House of Hope'}
                    open={activeChallenge.name !== 'Wandel met House of Hope'}
                    active={true}
                    header={activeChallenge.name}
                    body={activeChallenge.description}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => navigation.navigate('Challenges')}>
                <Text style={{marginTop: 10}} color="#000">
                  {selectedLanguage.noActive}
                </Text>
              </TouchableOpacity>
            )}
            <Header color={'#FFA62B'} style={{marginTop: 20, fontSize: 20}}>
              {selectedLanguage.latest}
            </Header>
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.8}>
              <ShadowCard>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 50,
                      marginRight: 10,
                    }}
                    source={{uri: buddy?.userImage}}
                  />
                  <Text style={{marginRight: 10}} color={'#FC9A00'}>
                    {buddyChat?.messages.length
                      ? buddyChat?.messages[buddyChat?.messages.length - 1].text
                      : ''}
                  </Text>
                </View>
              </ShadowCard>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Leaderboard')}>
              <Leaderboard short={true} />
            </TouchableOpacity>
          </View>
        )}
      </Container>
    </ScrollView>
  );
};

export default HomeScreen;
