import React from 'react';
import {View, Image} from 'react-native';

import {Header, Text} from '../atoms/Texts';
import ShadowCard from '../atoms/ShadowCard';
import useCollectionData from '../../hooks/useCollectionData';

const Leaderboard = ({navigation, short}) => {
  const [users] = useCollectionData(`users`, {
    orderBy: ['score', 'desc'],
    limit: short ? 2 : 10,
  });
  const leaders = users.map((user, index) => {
    return {
      name: user.firstName,
      score: user.score,
      position: index + 1,
      userImage: user.userImage,
    };
  });

  return (
    <View
      background="#fff"
      style={{alignItems: 'flex-start', justifyContent: 'center'}}>
      <Header
        style={{marginTop: 20, fontSize: 20}}
        color={short ? '#FC9A00' : '#000'}>
        Leaderboard
      </Header>
      {leaders.map((leader, index) => {
        return (
          <ShadowCard
            style={{
              width: '100%',
              flexDirection: 'row',
              flex: 1,
              flexWrap: 'wrap',
            }}
            direction={'row'}>
            <View
              key={index}
              style={{
                width: '100%',
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1,
              }}>
              <Text style={{marginRight: 10, fontSize: 20}} color={'#FC9A00'}>
                {leader.position}
              </Text>
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  marginRight: 10,
                }}
                source={{uri: leader?.userImage}}
              />
              <Text style={{marginRight: 'auto'}} color={'#000'}>
                {leader.name}
              </Text>
              <Text color={'#FC9A00'}>{leader.score}</Text>
            </View>
          </ShadowCard>
        );
      })}
    </View>
  );
};

export default Leaderboard;
