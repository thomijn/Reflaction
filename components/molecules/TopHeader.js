import React from 'react';
import {View, Image} from 'react-native';
import {Badge} from 'native-base';
import auth from '@react-native-firebase/auth';
import {useStore} from '../../store';
import {TouchableOpacity} from 'react-native-gesture-handler';
import logo from '../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';

const TopHeader = ({navigation, setLanguageOpen, languageOpen, lang}) => {
  const {user} = useStore();

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
      {lang && (
        <TouchableOpacity
          onPress={() => setLanguageOpen(!languageOpen)}
          activeOpacity={0.8}>
          <Badge style={{backgroundColor: 'green', height: 30}}>
            <Icon name="language" size={20} color="#fff" />
          </Badge>
        </TouchableOpacity>
      )}
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
          style={{width: 40, height: 40, borderRadius: 50, marginRight: 10}}
          source={{uri: user?.userImage}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopHeader;
