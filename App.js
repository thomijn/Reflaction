import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';

import {ThemeProvider} from 'styled-components';

import HomeScreen from './components/screens/HomeScreen';
import WelcomeScreen from './components/screens/WelcomeScreen';
import SignUpForm from './components/screens/SignUpForm';
import BuddyScreen from './components/screens/BuddyScreen';
import ChallengesScreen from './components/screens/ChallengesScreen';
import ChatsScreen from './components/screens/ChatsScreen';
import GroupsScreen from './components/screens/GroupsScreen';
import {initRadar} from './hooks/radar';
import LeaderboardScreen from './components/screens/LeaderboardScreen';
import * as RNLocalize from 'react-native-localize';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const theme = {
  colors: {
    blue: '#2580e8',
    orange: '#FC9A00',
    gray: '#f7f7f7',
    green: 'green',
  },
};

//init geofencing
initRadar();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen name="Sign up" component={SignUpForm} />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Home"
            component={Root}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="Leaderboard"
            component={LeaderboardScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

const Root = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Buddy') {
              iconName = 'users';
            } else if (route.name === 'Challenges') {
              iconName = 'flag';
            } else if (route.name === 'Chat') {
              iconName = 'message-circle';
            } else if (route.name === 'Groups') {
              iconName = 'message-square';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: theme.colors.orange,
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Buddy" component={BuddyScreen} />
        <Tab.Screen name="Challenges" component={ChallengesScreen} />
        <Tab.Screen name="Chat" component={ChatsScreen} />
        <Tab.Screen name="Groups" component={GroupsScreen} />
      </Tab.Navigator>
    </>
  );
};

export default App;
