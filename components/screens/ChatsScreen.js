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
import icon from '../../assets/images/Icoon-oranje.png';

const ChatsScreen = ({navigation}) => {
  const {user} = useStore();
  const [latestUser] = useDocumentData(`users/${user.uid}`);
  const [buddy] = useDocumentData(`users/${latestUser?.buddy}`);
  const [chat] = useDocumentData(`chats/${latestUser?.buddyChat}`);
  const [selectedChat, setSelectedChat] = useState(null);

  return selectedChat ? (
    <ChatScreen setSelectedChat={setSelectedChat} />
  ) : (
    <Container background="#fff" style={{padding: 20}}>
      <TopHeader />
      <Header style={{marginTop: 20}}>Chats</Header>
      <List>
        <ListItem
          onPress={() => {
            setSelectedChat(latestUser?.buddyChat);
          }}
          avatar>
          <Left>
            <Thumbnail small source={{uri: buddy?.userImage}} />
          </Left>
          <Body>
            <Text>{buddy?.firstName}</Text>
            <Text note>
              {chat?.messages.length ? chat?.messages[0].text : ''}
            </Text>
          </Body>
          <Right>
            <Text note>
              {chat?.messages.length ? chat?.messages[0].text : ''}
            </Text>
          </Right>
        </ListItem>
        <ListItem onClick={() => setSelectedChat(latestUser?.buddyChat)} avatar>
          <Left>
            <Thumbnail small source={icon} />
          </Left>
          <Body>
            <Text>Virtuele huisarts</Text>
            <Text note>
              {chat?.messages.length
                ? chat?.messages[0].text
                : 'Begin het gesprek met je virtuele huisarts'}
            </Text>
          </Body>
          <Right>
            <Text note>
              {' '}
              {chat?.messages.length ? chat?.messages[0].text : ''}
            </Text>
          </Right>
        </ListItem>
      </List>
    </Container>
  );
};

export default ChatsScreen;
