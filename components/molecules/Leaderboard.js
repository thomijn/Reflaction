import React from 'react';
import { Container } from '../atoms/Container';
import { Header, Text } from '../atoms/Texts';
import { View, Image } from 'react-native';
import ShadowCard from '../atoms/ShadowCard';
import icon from '../../assets/images/Icoon-oranje.png'

const Leaderboard = ({ active, body, header }) => {

    const leaders = [
        {
            position: '1',
            name: 'John',
            image: '../../assets/images/Icoon-oranje.png',
            points: 30
        },
        {
            position: '2',
            name: 'Leendert',
            image: '../../assets/images/Icoon-oranje.png',
            points: 20
        },
        {
            position: '3',
            name: 'Irene',
            image: '../../assets/images/Icoon-oranje.png',
            points: 10
        },
    ]

    return (
        <View background="#fff">
            <Header color="#FFA62B">Leaderboard</Header>
            {leaders.map((leader) => {
                return <ShadowCard direction={'row'}>
                    <Text style={{ marginRight: 10 }} color={'#FFA62B'}>{leader.position}</Text>
                    <Image
                        source={icon}
                        style={{ width: 30, height: 30, borderRadius: 50, marginRight: 20, backgroundColor: '#fff' }}
                    />
                    <Text style={{ marginRight: 'auto' }} color={'#000'}>{leader.name}</Text>
                    <Text color={'#FFA62B'}>{leader.points}</Text>
                </ShadowCard>
            })}
        </View >
    )
}

export default Leaderboard;