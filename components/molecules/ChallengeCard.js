import React from 'react';
import { Container } from '../atoms/Container';
import { Header, Text } from '../atoms/Texts';

const ChallengeCard = (props) => {

    const { header } = props.header;
    const { body } = props.body;
    const { active } = props.active;

    let textColor;
    let bgColor

    active ? textColor = '#FFF' : textColor = '#2B2D42'

    return (
        <Container style={{
            backgroundColor: active ? '#FFA62B' : '#FFF',
            flexShrink: 1,
            width: '100%',
            height: 'auto',
            borderRadius: 20,
            padding: 30,
            marginTop: 30,
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5
        }}>
            <Header color={textColor}>{header}</Header>
            <Text color={textColor}>{body}</Text>
        </Container>
    )
}

export default ChallengeCard;