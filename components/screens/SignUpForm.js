import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import {Button} from '../atoms/Buttons';
import {Container} from '../atoms/Container';
import {Header, Text} from '../atoms/Texts';
import SignUpMatching from '../molecules/SignUpMatching';
import SignUpPersonalData from '../molecules/SignUpPersonalData';
import {useStore} from '../../store';
import {theme} from '../../App';

const SignUpForm = ({navigation: {navigate}}) => {
  const {user, setUser} = useStore();
  const [phaseForm, setPhaseForm] = useState(0);
  const [formData, setformData] = useState();
  const [matchingData, setMatchingData] = useState();
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);

  const uploadImage = async () => {
    if (formData.image == null) {
      return null;
    }

    const uploadUri = formData.image;
    let filename = `${user.uid}-profile-image`;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setUploading(false);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  const submitAll = async () => {
    const imageUrl = await uploadImage();
    delete formData.image;
    firestore()
      .collection('users')
      .doc(user.uid)
      .set({
        ...formData,
        userImage: imageUrl,
        preferences: {...matchingData},
        buddy: false,
        dislikes: [],
        likes: [],
      })
      .then(() => {
        setUser({
          uid: user.uid,
          ...formData,
          userImage: imageUrl,
          preferences: {...matchingData},
          buddy: false,
          dislikes: [],
          likes: [],
        });
        navigate('Home');
      })
      .catch((error) => {
        console.log(
          'Something went wrong with added post to firestore.',
          error,
        );
      });
  };

  const renderForm = () => {
    switch (phaseForm) {
      case 0:
        return <Intro setPhaseForm={setPhaseForm} />;
      case 1:
        return (
          <SignUpPersonalData
            setPhaseForm={setPhaseForm}
            setformData={setformData}
          />
        );
      case 2:
        return (
          <SignUpMatching
            setMatchingData={setMatchingData}
            setPhaseForm={setPhaseForm}
            setformData={setformData}
          />
        );
      case 3:
        return (
          <End
            uploading={uploading}
            transferred={transferred}
            submitAll={submitAll}
            navigate={navigate}
          />
        );
      default:
        break;
    }
  };

  return (
    <Container background="#fff" onPress={() => fadeOut()}>
      {renderForm()}
    </Container>
  );
};

const Intro = ({setPhaseForm}) => {
  return (
    <View
      style={{
        padding: 40,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Header margin="0px 0px 10px 0px" style={{textAlign: 'center'}}>
        Welkom bij Reflaction!
      </Header>
      <Text
        margin="0px 0px 10px 0px"
        style={{textAlign: 'center'}}
        color="#000">
        Voordat we op zoek kunnen gaan naar je buddy willen we eerst wat meer
        over je weten
      </Text>
      <Button
        onPress={() => setPhaseForm(1)}
        margin="10px 0px 30px 0px"
        text="Aan de slag!"
      />
    </View>
  );
};

const End = ({submitAll, uploading, transferred}) => {
  return (
    <View
      style={{
        padding: 40,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Header margin="0px 0px 10px 0px" style={{textAlign: 'center'}}>
        We hebben alles wat we willen weten!
      </Header>
      {uploading ? (
        <>
          <Text
            style={{fontSize: 20, marginBottom: 10, textAlign: 'center'}}
            color="#000">
            {transferred}%
          </Text>
          <ActivityIndicator size="large" color={theme.colors.orange} />
        </>
      ) : (
        <Button
          onPress={() => submitAll()}
          margin="10px 0px 30px 0px"
          text="Afronden"
        />
      )}
    </View>
  );
};

export default SignUpForm;
