import React, {useState} from 'react';
import {
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import TopHeader from '../molecules/TopHeader';
import {Container} from '../atoms/Container';
import {Header} from '../atoms/Texts';
import useDocumentData from '../../hooks/useDocumentData';
import {useStore} from '../../store';
import ChatScreen from './ChatScreen';
import GroupChatScreen from './GroupChatScreen';
import icon from '../../assets/images/010_icoon.png';
import useCollectionData from '../../hooks/useCollectionData';
import firestore from '@react-native-firebase/firestore';
import {theme} from '../../App';

const GroupsScreen = ({navigation}) => {
  const {user} = useStore();

  const updateGroup = (group) => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({group})
      .then((docRef) => {
        console.log('Document updated with group: ', group);
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  let groups = [
    {
      name: 'Voeding',
      reference: 'voeding',
      avatar: icon,
    },
    {
      name: 'Voetbal',
      reference: 'voetbal',
      avatar: icon,
    },
  ];

  return (
    <Container background="#fff" style={{padding: 20}}>
      <TopHeader />
      <Header style={{marginTop: 20}}>Chats</Header>
      <List>
        {groups.map((group) => {
          return (
            <ListItem
              key={group.reference}
              onPress={() => {
                updateGroup(group.reference);
              }}
              avatar>
              <Left>
                <Thumbnail small source={group.avatar} />
              </Left>
              <Body>
                <Text>{group.name}</Text>
              </Body>
              <Right>
                <Text
                  style={{
                    backgroundColor: theme.colors.orange,
                    width: 25,
                    height: 25,
                    borderRadius: 12.5,
                    color: 'white',
                    textAlign: 'center',
                  }}>
                  +
                </Text>
              </Right>
            </ListItem>
          );
        })}
      </List>
    </Container>
  );
};

export default GroupsScreen;
