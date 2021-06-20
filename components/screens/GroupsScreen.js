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
import GroupChatScreen from './GroupChatScreen';
import icon from '../../assets/images/Icoon-oranje.png';
import useCollectionData from '../../hooks/useCollectionData';
import firestore from '@react-native-firebase/firestore';

const GroupsScreen = ({ navigation }) => {
    const { user } = useStore();
    const [latestUser] = useDocumentData(`users/${user.uid}`);
    const [groups] = useDocumentData(`groups/aoM10ErBcJhAXqQ8wcU9`);
    const [buddy] = useDocumentData(`users/${latestUser?.buddy}`);
    const [buddyChat] = useDocumentData(`chats/${latestUser?.buddyChat}`);
    const [selectedChat, setSelectedChat] = useState(null);
    const [groupChats] = useCollectionData(`chats`, { where: [[firestore.FieldPath.documentId(), 'in', user.chats],] });
    const [type, setType] = useState(null);

    return <Container background="#fff" style={{ padding: 20 }}>
        <TopHeader />
        <Header style={{ marginTop: 20 }}>{groups.description}</Header>
        <List>
            {groupChats.map(chat => <ListItem onPress={() => { setSelectedChat(buddy), setType('group') }} avatar>
                <Left>
                    <Thumbnail small source={icon} />
                </Left>
                <Body>
                    <Text>{chat.chatName}</Text>
                    <Text note>{chat?.messages.length &&
                        chat?.messages[chat?.messages.length - 1].user._id === user.uid
                        ? 'Jij: '
                        : ''}
                        {chat?.messages.length
                            ? chat?.messages[chat?.messages.length - 1].text
                            : ''}</Text>
                </Body>
                <Right></Right>
            </ListItem>)}
        </List>
    </Container>
}

export default GroupsScreen;