import React, { useState, useEffect, useCallback } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { StyleSheet, TextInput, View, LogBox, Button, Text } from 'react-native'
import useCollectionData from '../../hooks/useCollectionData';
 
const ChatScreen = () => {
    const [messages, setMessages] = useState([]);

    // const [messagesDb, setMessagesDb] = useState([])

    // useEffect(()=>{
    //     const messagesDb = []
    //     db.collection('chats').get()
    //         .then(snapshot => {
    //             snapshot.docs.forEach(messageDb => {
    //                 let currentID = messageDb.id
    //                 let appObj = { ...messageDb.data(), ['id']: currentID }
    //                 messagesDb.push(appObj)

    //                 messagesDb.push(messageDb.data())
    //         })
    //         setMessagesDb(messagesDb)
    //     })
    // },[])

    useEffect(() => {
        setMessages([
        {
            _id: 1,
            text: 'Yo yo gasten',
            createdAt: new Date(),
            user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
            },
        },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, [])

    return (
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id: 1,
        }}
        />
    )
}

export default ChatScreen