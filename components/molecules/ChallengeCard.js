import React from 'react';
import { Container } from '../atoms/Container';
import { Header, Text } from '../atoms/Texts';
import ShadowCard from '../atoms/ShadowCard';

const ChallengeCard = ({ active, body, header }) => {

    return (
        <ShadowCard direction={'column'} color={active ? '#FFA62B' : '#FFF'}>
            <Header color={active ? '#FFF' : '#2B2D42'}>{header}</Header>
            <Text color={active ? '#FFF' : '#2B2D42'}>{body}</Text>
        </ShadowCard>
    )
}

export default ChallengeCard;