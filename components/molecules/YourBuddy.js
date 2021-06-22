import React from 'react';
import {View, Image} from 'react-native';
import useDocumentData from '../../hooks/useDocumentData';
import {Container} from '../atoms/Container';
import {Text, Header} from '../atoms/Texts';
import TopHeader from './TopHeader';
import ShadowCard from '../atoms/ShadowCard';
import {Button} from '../atoms/Buttons';
import {useStore} from '../../store';

const YourBuddy = ({navigation, latestUser}) => {
  const {selectedLanguage} = useStore();
  const [buddy, loading] = useDocumentData(`users/${latestUser.buddy}`);

  return (
    <Container background="#fff" style={{padding: 20}}>
      <TopHeader navigation={navigation} />
      <Header style={{marginTop: 20}}>{selectedLanguage.currentBuddy}</Header>
      <ShadowCard>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 40, height: 40, borderRadius: 50, marginRight: 10}}
            source={{uri: buddy?.userImage}}
          />
          <Header color="#FC9A00" style={{fontSize: 20}}>
            {buddy?.firstName} {buddy?.lastName}
          </Header>

          <Header
            color="#FC9A00"
            style={{fontSize: 20, position: 'absolute', right: 0}}>
            {buddy?.age}
          </Header>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text color="#FC9A00">{selectedLanguage.interests}</Text>
        </View>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          {buddy?.preferences.activity.map((activity) => (
            <Text key={activity} style={{marginRight: 5}} color="#000">
              {activity}
            </Text>
          ))}
        </View>
      </ShadowCard>
      <Button
        onPress={() => navigation.navigate('Chat')}
        text={`${selectedLanguage.sendMessage} ${buddy?.firstName}`}
      />
    </Container>
  );
};

export default YourBuddy;
