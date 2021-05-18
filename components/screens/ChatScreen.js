import React, {useEffect, useCallback} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import rnfirebase from '@react-native-firebase/app';

import useDocumentData from '../../hooks/useDocumentData';
import {useStore} from '../../store';

const ChatScreen = () => {
  const {user} = useStore();
  const [latestUser] = useDocumentData(`users/${user.uid}`);
  const [messagesDoc, loading] = useDocumentData(
    `chats/${latestUser?.buddyChat}`,
  );

  console.log(messagesDoc?.messages);

  const onSend = useCallback((messages = []) => {
    console.log(messages);

    firestore()
      .collection('chats')
      .doc(latestUser?.buddyChat)
      .update({
        messages: rnfirebase.firestore.FieldValue.arrayUnion({...messages[0]}),
      });
  }, []);

  return messagesDoc?.messages.length ? (
    <GiftedChat
      messages={messagesDoc?.messages.map((message) => {
        return {...message, createdAt: message.createdAt.toDate()};
      })}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
  ) : (
    <GiftedChat
      messages={[]}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.uid,
      }}
    />
  );
};

export default ChatScreen;
