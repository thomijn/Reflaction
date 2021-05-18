import React from 'react';
import useDocumentData from '../../hooks/useDocumentData';
import {Container} from '../atoms/Container';
import {Text} from '../atoms/Texts';
import TopHeader from './TopHeader';

const YourBuddy = ({navigation, latestUser}) => {
  const [buddy, loading] = useDocumentData(`users/${latestUser.buddy}`);

  return (
    <Container background="#fff" style={{padding: 20}}>
      <TopHeader navigation={navigation} />
      <Text color="#000">Je buddy is: {buddy?.firstName}</Text>
    </Container>
  );
};

export default YourBuddy;
