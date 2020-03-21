import React from 'react';
import {View} from 'react-native';
import {Button} from 'actbase';
import {useNavigation} from '@react-navigation/core';

const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={{padding: 15}}>
      <Button
        onPress={() => {
          navigation.navigate('Forms');
        }}>
        폼
      </Button>
    </View>
  );
};

export default Home;
