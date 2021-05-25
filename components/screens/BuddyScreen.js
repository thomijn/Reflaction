import React, {useState, useEffect} from 'react';
import {View, Image} from 'react-native';
import {Container} from '../atoms/Container';
import {Header, Text} from '../atoms/Texts';
import {useStore} from '../../store';
import Icon from 'react-native-vector-icons/Feather';
import {theme} from '../../App';
import {Button} from '../atoms/Buttons';
import useCollectionData from '../../hooks/useCollectionData';
import useDocumentData from '../../hooks/useDocumentData';
import firestore from '@react-native-firebase/firestore';
import sitting from '../../assets/images/humaans.png';
import YourBuddy from '../molecules/YourBuddy';
import Match from '../molecules/Match';

const BuddyScreen = ({navigation}) => {
  const {user} = useStore();
  const [selected] = useState(0);
  const [match, setMatch] = useState(false);
  const [potentialBuddies, setPotentialBuddies] = useState(0);
  const [potentialBuddiesDatabase] = useCollectionData('users', {
    where: [
      ['buddy', '==', false],
      [firestore.FieldPath.documentId(), '!=', user?.uid],
    ],
  });

  const [latestUser, loading] = useDocumentData(`users/${user.uid}`);

  const checkIfLikedorDisliked = async (like) => {
    if (
      potentialBuddies[selected].likes &&
      potentialBuddies[selected]?.likes.includes(user.uid)
    ) {
      const res = await firestore().collection('chats').add({messages: []});

      firestore()
        .collection('users')
        .doc(user.uid)
        .update({buddy: potentialBuddies[selected].id, buddyChat: res.id})
        .then(() => {
          setMatch(true);
          firestore()
            .collection('users')
            .doc(potentialBuddies[selected].id)
            .update({buddy: user.uid, buddyChat: res.id});
        });
    } else {
      like
        ? likePotentialBuddy(potentialBuddies[selected])
        : disLikePotentialBuddy(potentialBuddies[selected]);
    }
  };

  const likePotentialBuddy = (buddy) => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        likes: latestUser.likes ? [...latestUser?.likes, buddy.id] : [buddy.id],
      })
      .then(() => {
        console.log('gelukt!');
      })
      .catch((err) => console.log(err));
  };

  const disLikePotentialBuddy = (buddy) => {
    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        dislikes: latestUser.dislikes
          ? [...latestUser?.dislikes, buddy.id]
          : [buddy.id],
      })
      .then(() => {
        console.log('gelukt!');
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (latestUser && potentialBuddiesDatabase) {
      const buddies = potentialBuddiesDatabase.filter((buddy) => {
        if (
          !latestUser?.likes.includes(buddy.id) &&
          !latestUser?.dislikes.includes(buddy.id)
        ) {
          return buddy;
        }
      });
      setPotentialBuddies(buddies);
    }
  }, [latestUser, potentialBuddiesDatabase]);

  console.log(potentialBuddies[selected]);

  return (
    <>
      {match && <Match setMatch={setMatch} latestUser={latestUser} />}
      {latestUser?.buddy ? (
        <YourBuddy navigation={navigation} latestUser={latestUser} />
      ) : potentialBuddies.length > 0 && selected !== 'out' ? (
        <>
          <View
            style={{
              zIndex: 100,
              width: '100%',
              height: 400,
            }}>
            <Image
              source={{uri: potentialBuddies[selected]?.userImage}}
              style={{
                width: '100%',
                height: '100%',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
              }}
            />
            <View
              style={{position: 'absolute', zIndex: 5, bottom: 30, left: 20}}>
              <Text color="#fff" style={{fontWeight: 'bold', fontSize: 35}}>
                {potentialBuddies[selected].firstName},{' '}
                {potentialBuddies[selected]?.age}
              </Text>
            </View>
          </View>
          <Container background="#fff" style={{padding: 20}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Icon
                name="info"
                color="#2B2D42"
                size={25}
                style={{marginRight: 10}}
              />
              <Text style={{fontSize: 16}} color="#2B2D42">
                {potentialBuddies[selected].preferences.activity[0]},{' '}
                {potentialBuddies[selected]?.preferences.activity[1]},{' '}
                {potentialBuddies[selected].preferences.activity[2]}
              </Text>
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon
                name="link"
                color="#2B2D42"
                size={25}
                style={{marginRight: 10}}
              />
              <Text style={{fontSize: 16}} color="#2B2D42">
                Match 70%
              </Text>
            </View>
            <View
              style={{
                marginTop: 50,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <View style={{display: 'flex', flexDirection: 'column'}}>
                <Header style={{marginBottom: 10}} color={theme.colors.orange}>
                  Zullen wij buddies worden?
                </Header>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <Button
                    onPress={() => checkIfLikedorDisliked(false)}
                    padding="7px 0px 7px 0px"
                    margin="5px"
                    background="#fff"
                    icon={
                      <Icon name="x" color={theme.colors.orange} size={25} />
                    }
                    style={{
                      borderRadius: 15,
                      width: 60,
                      elevation: 0,
                      borderColor: `${theme.colors.orange}`,
                      borderWidth: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  />
                  <Button
                    onPress={() => checkIfLikedorDisliked(true)}
                    padding="7px 0px 7px 0px"
                    icon={<Icon name="check" color="#fff" size={25} />}
                    style={{
                      borderRadius: 15,
                      width: 60,
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    margin="5px"
                  />
                </View>
              </View>
            </View>
          </Container>
        </>
      ) : (
        <Container background="#fff">
          <View
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              direction: 'column',
              justifyContent: 'center',
              padding: 20,
            }}>
            <Header style={{marginTop: 20}} color="#000">
              Helaas!
            </Header>
            <Text style={{fontSize: 20, textAlign: 'center'}} color="#000">
              Er zijn op dit moment geen potentiële buddies meer
            </Text>
            <Image
              source={sitting}
              style={{
                position: 'absolute',
                zIndex: -2,
                width: 300,
                height: 300,
                bottom: -20,
                right: -100,
              }}
            />
          </View>
        </Container>
      )}
    </>
  );
};

export default BuddyScreen;
