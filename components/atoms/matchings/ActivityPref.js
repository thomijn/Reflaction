import React, {useState} from 'react';
import {Animated, View} from 'react-native';

import {theme} from '../../../App';
import {Button} from '../Buttons';
import {Header, Text} from '../Texts';

const interesses = [
  'Muziek',
  'Gamer',
  'Wandelen',
  'Bioscoop',
  'Politiek',
  'Bordspellen',
  'Spiritualiteit',
  'Tuinieren',
  'Museum',
  'Netflix',
  'Sport',
  'Comedy',
];

const ActivityPref = ({setActivity}) => {
  const [chosenInteresses, setChosenInteresses] = useState([]);

  const addOrRemoveInt = (int) => {
    if (chosenInteresses.includes(int)) {
      setChosenInteresses(
        chosenInteresses.filter((interes) => interes !== int),
      );
    } else {
      setChosenInteresses([...chosenInteresses, int]);
    }
  };

  console.log(chosenInteresses);

  return (
    <>
      <Animated.View
        style={[
          {
            display: 'flex',
            justifyContent: 'center',
            padding: 40,
            textAlign: 'center',
            flexDirection: 'column',
            height: '100%',
          },
        ]}>
        <Header
          style={{
            color: theme.colors.orange,
            fontSize: 35,
            marginBottom: 20,
          }}>
          Wat zijn je interesses
        </Header>
        <Text color="#000" style={{fontSize: 20, marginBottom: 20}}>
          Zo kunnen we meer buddy's vinden die bij je passen!
        </Text>
        <Text
          color="#000"
          style={{
            fontSize: 20,
            marginBottom: 20,
            opacity: 0.5,
            letterSpacing: 0.5,
          }}>
          Interesses
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            flexWrap: 'wrap',
          }}>
          {interesses.map((int) => (
            <View key={int}>
              <Button
                background={
                  chosenInteresses.includes(int) ? theme.colors.orange : '#fff'
                }
                color={!chosenInteresses.includes(int) ? '#919191' : '#fff'}
                fontSize="12px"
                width="92px"
                padding="5px"
                onPress={() => addOrRemoveInt(int)}
                margin="5px"
                text={int}
              />
            </View>
          ))}
        </View>
        <Button
          onPress={() => setActivity(chosenInteresses)}
          margin="30px 0px 30px 0px"
          text="Doorgaan"
        />
      </Animated.View>
    </>
  );
};

export default ActivityPref;
