import React from 'react';
import {Card, CardItem, Button, Icon} from 'native-base';
import {View} from 'react-native';
import useDocumentData from '../../hooks/useDocumentData';
import {Image} from 'react-native';
import {theme} from '../../App';
import {Header, Text} from '../atoms/Texts';

const Match = ({latestUser, setMatch}) => {
  const [buddy, loading] = useDocumentData(`users/${latestUser?.buddy}`);

  return loading ? null : (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 10,
      }}>
      <Card
        style={{
          width: '80%',
          top: '30%',
          borderRadius: 8,
        }}>
        <Button
          onClick={() => setMatch(false)}
          transparent
          style={{position: 'absolute', zIndex: 12, right: 0}}
          light>
          <Icon style={{color: '#fff'}} name="close" />
        </Button>
        <CardItem
          header
          bordered
          style={{
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
          }}>
          <Image
            source={{uri: buddy?.userImage}}
            style={{
              height: 200,
              width: null,
              flex: 1,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        </CardItem>
        <CardItem
          style={{borderTopLeftRadius: 8, borderTopRightRadius: 8}}
          style={{paddingBottom: 0, paddingTop: 0}}>
          <Header color={theme.colors.orange}>Gefeleciteerd!</Header>
        </CardItem>
        <CardItem
          style={{borderBottomLeftRadius: 8, borderBottomRightRadius: 8}}>
          <Text color="#000">Emre is je niewe buddy!</Text>
        </CardItem>
      </Card>
    </View>
  );
};

export default Match;
