import React, {useState, useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {Header, Left, Button, Icon, Title, Body, Right} from 'native-base';
import senyurek from '../../assets/images/senyurek.png';

import {useStore} from '../../store';
import {theme} from '../../App';

const DoctorChatScreen = ({setSelectedChat, selectedChat}) => {
  const [messages, setMessages] = useState([]);
  const {selectedLanguage} = useStore();
  useEffect(() => {
    setMessages([
      {
        _id: 4,
        text: 'En geniet van het resultaat',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Senyurek',
          avatar: senyurek,
        },
      },
      {
        _id: 3,
        text: 'Begin met een challenge',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Senyurek',
          avatar: senyurek,
        },
      },
      {
        _id: 2,
        text: 'Goed dat je bezig bent met je gezondheid!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Senyurek',
          avatar: senyurek,
        },
      },
      {
        _id: 1,
        text: 'Hallo!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Senyurek',
          avatar: senyurek,
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <>
      <Header transparent androidStatusBarColor={theme.colors.orange}>
        <Left>
          <Button onPress={() => setSelectedChat(null)} transparent>
            <Icon style={{color: '#000'}} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{color: '#000'}}>{selectedLanguage.doctorChat}</Title>
        </Body>
        <Right></Right>
      </Header>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    </>
  );
};

export default DoctorChatScreen;
