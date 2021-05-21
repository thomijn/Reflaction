import React from 'react';
import { View, Image } from 'react-native';
import useDocumentData from '../../hooks/useDocumentData';
import { Container } from '../atoms/Container';
import { Text, Header } from '../atoms/Texts';
import TopHeader from './TopHeader';

const YourBuddy = ({ navigation, latestUser }) => {
  const [buddy, loading] = useDocumentData(`users/${latestUser.buddy}`);

  return (
    <Container background="#fff" style={{ padding: 20 }}>
      <TopHeader navigation={navigation} />
      <Header style={{ marginTop: 20, marginBottom: 20 }} color="#FFA62B">Je buddy is:</Header>
      <Container style={{
        width: '100%',
        borderRadius: 20,
        height: 100,
        padding: 30,
        background: '#FFF',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
      }}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
          source={{ uri: buddy?.userImage }}
        />
        <Header color="#FFA62B">{buddy?.firstName}</Header>
      </Container>
    </Container>
  );
};

export default YourBuddy;
