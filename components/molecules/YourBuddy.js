import React from 'react';
import {View, Image} from 'react-native';
import useDocumentData from '../../hooks/useDocumentData';
import {Container} from '../atoms/Container';
import {Text, Header} from '../atoms/Texts';
import TopHeader from './TopHeader';
import ShadowCard from '../atoms/ShadowCard';
import {Button} from '../atoms/Buttons';

const YourBuddy = ({navigation, latestUser}) => {
  const [buddy, loading] = useDocumentData(`users/${latestUser.buddy}`);
  console.log(buddy?.preferences.activity);
  return (
    <Container background="#fff" style={{padding: 20}}>
      <TopHeader navigation={navigation} />
      <Header style={{marginTop: 20}}>Je huidige buddy is</Header>
      <ShadowCard>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            style={{width: 40, height: 40, borderRadius: 50, marginRight: 10}}
            source={{uri: buddy?.userImage}}
          />
          <Header color="#FFA62B" style={{fontSize: 20}}>
            {buddy?.firstName} {buddy?.lastName}
          </Header>

          <Header
            color="#FFA62B"
            style={{fontSize: 20, position: 'absolute', right: 0}}>
            {buddy?.age}
          </Header>
        </View>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Text color="#FFA62B">Interesses:</Text>
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
        text={`Stuur een bericht naar ${buddy?.firstName}`}
      />
    </Container>
  );
};

export default YourBuddy;
