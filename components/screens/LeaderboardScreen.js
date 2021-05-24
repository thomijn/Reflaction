import React, { useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { Container } from '../atoms/Container';
import { Header, Text } from '../atoms/Texts';
import Leaderboard from '../molecules/Leaderboard';

const LeaderboardScreen = ({ }) => {

    return (
        <>
            <Container background="#fff" style={{ padding: 20 }}>
                <View>
                    <Leaderboard />
                </View>
            </Container>
        </>
    );
};

export default LeaderboardScreen;
