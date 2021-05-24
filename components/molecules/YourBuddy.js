import React from 'react';
import { View, Image } from 'react-native';
import useDocumentData from '../../hooks/useDocumentData';
import { Container } from '../atoms/Container';
import { Text, Header } from '../atoms/Texts';
import TopHeader from './TopHeader';
import ShadowCard from '../atoms/ShadowCard';

const YourBuddy = ({ navigation, latestUser }) => {
  const [buddy, loading] = useDocumentData(`users/${latestUser.buddy}`);

  return (
    <Container background="#fff" style={{ padding: 20 }}>
      <TopHeader navigation={navigation} />
      <Header style={{ marginTop: 20, marginBottom: 20 }} color="#FFA62B">Je buddy is:</Header>
      <ShadowCard>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
          source={{ uri: buddy?.userImage }}
        />
        <Header color="#FFA62B">{buddy?.firstName}</Header>
      </ShadowCard>
    </Container>
  );
};

export default YourBuddy;
