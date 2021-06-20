import React, { useState } from 'react';
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
import { Container } from '../atoms/Container';
import { Header } from '../atoms/Texts';
import useDocumentData from '../../hooks/useDocumentData';
import { useStore } from '../../store';
import ChatScreen from './ChatScreen';
import DoctorChatScreen from './DoctorChatScreen';
import GroupChatScreen from './GroupChatScreen';
import icon from '../../assets/images/Icoon-oranje.png';
import useCollectionData from '../../hooks/useCollectionData';
import firestore from '@react-native-firebase/firestore';
import senyurek from '../../assets/images/senyurek.png';

const ChatsScreen = ({ navigation }) => {
  const { user } = useStore();
  const [latestUser] = useDocumentData(`users/${user.uid}`);
  const [buddy] = useDocumentData(`users/${latestUser?.buddy}`);
  const [buddyChat] = useDocumentData(`chats/${latestUser?.buddyChat}`);
  const [selectedChat, setSelectedChat] = useState(null);
  const [groupChats] = useCollectionData(`chats`, {
    where: [
      [
        firestore.FieldPath.documentId(),
        'in',
        user?.chats ? user?.chats : ['null'],
      ],
    ],
  });
  const [type, setType] = useState(null);
  const [clicked, setClicked] = useState(false);

  return selectedChat ? (
    type === 'buddy' ? (
      <ChatScreen
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    ) : type === 'doctor' ? (
      <DoctorChatScreen
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />) : (
      <GroupChatScreen
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
      />
    )
  ) : (
    <Container background="#fff" style={{ padding: 20 }}>
      <TopHeader />
      <Header style={{ marginTop: 20 }}>Chats</Header>
      <List>
        <ListItem
          onPress={() => {
            setSelectedChat(buddy), setType('buddy');
          }}
          avatar>
          <Left>
            <Thumbnail small source={{ uri: buddy?.userImage }} />
          </Left>
          <Body>
            <Text>{buddy?.firstName}</Text>
            <Text note>
              {buddyChat?.messages.length &&
                buddyChat?.messages[buddyChat?.messages.length - 1].user._id ===
                user.uid
                ? 'Jij: '
                : ''}
              {buddyChat?.messages.length
                ? buddyChat?.messages[buddyChat?.messages.length - 1].text
                : ''}
            </Text>
          </Body>
          <Right>
            <Text note>
              {buddyChat?.messages.length
                ? buddyChat?.messages[buddyChat?.messages.length - 1].createdAt
                  .toDate()
                  .toLocaleTimeString()
                : ''}
            </Text>
          </Right>
        </ListItem>
        <ListItem onPress={() => { setSelectedChat(buddy), setType('doctor'), setClicked(true); }} avatar>
          <Left>
            <Thumbnail small source={senyurek} />
          </Left>
          <Body>
            <Text>Virtuele huisarts (bot)</Text>
            <Text note>Begin het gesprek met je virtuele huisarts</Text>
          </Body>
          <Right>
            {clicked === false && <Text style={{ backgroundColor: 'green', width: 25, height: 25, borderRadius: 12.5, color: 'white', textAlign: 'center' }}>1</Text>}
          </Right>
        </ListItem>
        {groupChats.map((chat) => (
          <ListItem
            onPress={() => {
              setSelectedChat(buddy), setType('group');
            }}
            avatar>
            <Left>
              <Thumbnail small source={icon} />
            </Left>
            <Body>
              <Text>{chat.chatName}</Text>
              <Text note>
                {chat?.messages.length &&
                  chat?.messages[chat?.messages.length - 1].user._id === user.uid
                  ? 'Jij: '
                  : ''}
                {chat?.messages.length
                  ? chat?.messages[chat?.messages.length - 1].text
                  : ''}
              </Text>
            </Body>
            <Right></Right>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default ChatsScreen;
