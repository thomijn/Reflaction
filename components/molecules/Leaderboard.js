import React from 'react';
import { Container } from '../atoms/Container';
import { Header, Text } from '../atoms/Texts';
import { View, Image } from 'react-native';
import ShadowCard from '../atoms/ShadowCard';
import icon from '../../assets/images/010_icoon.png';

const Leaderboard = ({ active, body, header }) => {
  const leaders = [
    {
      position: '1',
      name: 'Willem en Varun',
      image: '../../assets/images/010_icoon.png',
      points: 30,
    },
  ];

  return (
    <View
      background="#fff"
      style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
      <Header style={{ marginTop: 20, fontSize: 20 }} color="#FC9A00">
        Leaderboard
      </Header>
      <ShadowCard
        style={{
          flexDirection: 'column',
          // flex: 1,
          // flexWrap: 'wrap',
        }}
        direction={'row'}>
        {leaders.map((leader, index) => {
          return (
            <View
              key={index}
              style={{
                width: '100%',
                alignSelf: 'stretch',
                flexDirection: 'row',
                flexWrap: 'wrap',
                flex: 1,
              }}>
              <Text style={{ marginRight: 10 }} color={'#FC9A00'}>
                {leader.position}
              </Text>
              <Text style={{ marginRight: 'auto' }} color={'#000'}>
                {leader.name}
              </Text>
              <Text color={'#FC9A00'}>{leader.points}</Text>
            </View>
          );
        })}
      </ShadowCard>
    </View>
  );
};

export default Leaderboard;
