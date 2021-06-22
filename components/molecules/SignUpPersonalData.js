import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Animated, View, Platform, Image } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { theme } from '../../App';

import { Button } from '../atoms/Buttons';
import Input, { InputStyled } from '../atoms/Inputs';
import { Header, Text } from '../atoms/Texts';

const SignUpPersonalData = ({ setformData, setPhaseForm }) => {
  const [phase, setPhase] = useState(0);
  const xAnim = useRef(new Animated.Value(0)).current;
  const [image, setImage] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();

  const onSubmit = () => {
    setformData({ firstName, lastName, age, image });
    setPhaseForm(2);
  };

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 1400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 1400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const renderForm = () => {
    switch (phase) {
      case 0:
        return (
          <Animated.View style={[{}, { transform: [{ translateX: xAnim }] }]}>
            <Header
              style={{
                color: theme.colors.orange,
                fontSize: 35,
                marginBottom: 20,
              }}>
              Over jou
            </Header>
            <Text color="#000" style={{ fontSize: 20, marginBottom: 20 }}>
              We willen graag wat meer over je weten!
            </Text>
            <InputStyled
              onChangeText={(text) => setFirstName(text)}
              placeholderTextColor=" rgba(0, 0, 0, 0.5)"
              placeholder="Voornaam"
              name="firstName"
            />
            <InputStyled
              onChangeText={(text) => setLastName(text)}
              placeholderTextColor=" rgba(0, 0, 0, 0.5)"
              placeholder="Achternaam"
              name="lastName"
            />
            <InputStyled
              onChangeText={(text) => setAge(text)}
              placeholderTextColor=" rgba(0, 0, 0, 0.5)"
              placeholder="Leeftijd"
              name="age"
            />
            <Button
              onPress={() => {
                Animated.timing(xAnim, {
                  toValue: -400,
                  stiffness: 90,
                  damping: 20,
                  mass: 1,
                  useNativeDriver: true,
                }).start(() => {
                  Animated.timing(xAnim, {
                    toValue: 0,
                    stiffness: 90,
                    damping: 20,
                    mass: 1,
                    useNativeDriver: true,
                  }).start();
                  setPhase(1);
                });
              }}
              margin="10px 0px 30px 0px"
              text="Doorgaan"
            />
          </Animated.View>
        );
      case 1:
        return (
          <Animated.View
            style={[
              {
                display: 'flex',
                justifyContent: 'center',
                direction: 'row',
                height: '100%',
              },
              { transform: [{ translateX: xAnim }] },
            ]}>
            <Header
              style={{
                color: theme.colors.orange,
                fontSize: 35,
                marginBottom: 20,
              }}>
              {profile}
            </Header>
            <Text color="#000" style={{ fontSize: 20, marginBottom: 20 }}>
              {profileBuddy}
            </Text>
            <View
              style={{
                width: '100%',
                display: 'flex',
                direction: 'row',
                alignItems: 'center',
              }}>
              {image != null ? (
                <Image
                  style={{
                    width: '100%',
                    height: 225,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                  source={{ uri: image }}
                />
              ) : null}
            </View>
            <Button
              onPress={() => choosePhotoFromLibrary()}
              margin="10px 0px 0px 0px"
              text="Kies een bestaande foto"
            />
            <Button
              onPress={() => takePhotoFromCamera()}
              margin="10px 0px 30px 0px"
              text="Maak een nieuwe foto"
            />
            {image !== null && (
              <Button
                onPress={() => onSubmit()}
                margin="10px 0px 30px 0px"
                text="Doorgaan"
              />
            )}
          </Animated.View>
        );
      default:
        break;
    }
  };

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
      {renderForm()}
    </View>
  );
};

export default SignUpPersonalData;
