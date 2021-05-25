import React from 'react';
import {Container} from '../atoms/Container';
import {Header, Text} from '../atoms/Texts';
import {View, Image} from 'react-native';
import ShadowCard from '../atoms/ShadowCard';
import icon from '../../assets/images/Icoon-oranje.png';

const Leaderboard = ({active, body, header}) => {
  const leaders = [
    {
      position: '1',
      name: 'Willem en Varun',
      image: '../../assets/images/Icoon-oranje.png',
      points: 30,
    },
  ];

  return (
    <View
      background="#fff"
      style={{alignItems: 'flex-start', justifyContent: 'center'}}>
      <Header style={{marginTop: 20, fontSize: 20}} color="#FFA62B">
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
              <Text style={{marginRight: 10}} color={'#FFA62B'}>
                {leader.position}
              </Text>
              <Text style={{marginRight: 'auto'}} color={'#000'}>
                {leader.name}
              </Text>
              <Text color={'#FFA62B'}>{leader.points}</Text>
            </View>
          );
        })}
      </ShadowCard>
    </View>
  );
};

export default Leaderboard;
