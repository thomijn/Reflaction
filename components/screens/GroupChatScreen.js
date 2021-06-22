import React from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import rnfirebase from '@react-native-firebase/app';
import {Header, Left, Button, Icon, Title, Body, Right} from 'native-base';

import useDocumentData from '../../hooks/useDocumentData';
import {useStore} from '../../store';
import {theme} from '../../App';

const GroupChatScreen = ({setSelectedChat, selectedChat}) => {
  const {user} = useStore();
  const [latestUser] = useDocumentData(`users/${user.uid}`);
  const [messagesDoc, loading] = useDocumentData(`chats/${latestUser?.chats}`);

  const onSend = (messages) => {
    firestore()
      .collection('chats')
      .doc(latestUser?.chats[0])
      .update({
        messages: rnfirebase.firestore.FieldValue.arrayUnion({...messages[0]}),
      })
      .catch((err) => console.log(err));
  };

  const getMessage = () => {
    const sorted = messagesDoc?.messages.sort(
      (a, b) => b.createdAt - a.createdAt,
    );

    return sorted.map((message) => {
      return {...message, createdAt: message.createdAt.toDate()};
    });
  };

  return messagesDoc?.messages.length ? (
    <>
      <Header transparent androidStatusBarColor={theme.colors.orange}>
        <Left>
          <Button onPress={() => setSelectedChat(null)} transparent>
            <Icon style={{color: '#000'}} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{color: '#000'}}>{messagesDoc.chatName}</Title>
        </Body>
      </Header>
      <GiftedChat
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: theme.colors.orange,
              },
            }}
          />
        )}
        inverted
        messages={getMessage()}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.uid,
          avatar: latestUser?.userImage,
        }}
      />
    </>
  ) : (
    <>
      <Header transparent androidStatusBarColor={theme.colors.orange}>
        <Left>
          <Button onPress={() => setSelectedChat(null)} transparent>
            <Icon style={{color: '#000'}} name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title style={{color: '#000'}}>
            {selectedChat.firstName} {selectedChat.lastName}
          </Title>
        </Body>
        <Right></Right>
      </Header>
      <GiftedChat
        inverted
        messages={[]}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.uid,
          avatar: latestUser?.userImage,
        }}
      />
    </>
  );
};

export default GroupChatScreen;
