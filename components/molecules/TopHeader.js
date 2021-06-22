import React from 'react';
import { View, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useStore } from '../../store';
import { Text } from '../atoms/Texts';
import { TouchableOpacity } from 'react-native-gesture-handler';
import logo from '../../assets/images/logo.png';

const TopHeader = ({ navigation }) => {
  const { user } = useStore();

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <Image
        style={{
          width: 70,
          height: 40,
        }}
        source={logo}
      />
      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              navigation.navigate('Welcome');
            })
            .catch((error) => {
              console.log(error);
            });
        }}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          style={{ width: 40, height: 40, borderRadius: 50, marginRight: 10 }}
          source={{ uri: user?.userImage }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopHeader;
