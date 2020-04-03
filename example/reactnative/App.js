/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import ActBase from 'actbase';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/views/Home';
import Forms from './src/views/Forms';
import Page2 from './src/views/Page2';

const styles = StyleSheet.create({
  'ab-button-tpl-default': {marginVertical: 5},
  'ab-button-tpl-pink': {backgroundColor: '#0F0'},
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <ActBase styles={styles}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Forms" component={Forms} />
          <Stack.Screen
            name={'Page2'}
            component={Page2}
            options={{title: 'Page2'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ActBase>
  );
};

export default React.memo(App);
