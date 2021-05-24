import React from 'react';
import { Container } from '../atoms/Container';

const ShadowCard = ({ active, children, direction, color }) => {

    return (
        <Container style={{
            display: 'flex',
            flexDirection: direction,
            backgroundColor: color || '#FFF',
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
            {children}
        </Container>
    )
}

export default ShadowCard;