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

  const onSend = (messages) => {
    console.log(messages);

    firestore()
      .collection('chats')
      .doc(latestUser?.buddyChat)
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
    <GiftedChat
      inverted
      messages={getMessage()}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.uid,
        avatar: latestUser?.userImage,
      }}
    />
  ) : (
    <GiftedChat
      inverted
      messages={[]}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: user.uid,
        avatar: latestUser?.userImage,
      }}
    />
  );
};

export default ChatScreen;
