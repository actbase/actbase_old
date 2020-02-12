/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {createRef, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import ActBase, {Button, Form, Input} from 'actbase/index.native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const App = () => {
  const [text, setText] = React.useState('ㅁㄴㅇㄹㄴㅇㄹa');

  const inputRef = createRef();

  useEffect(() => {

    console.log(inputRef);

  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Form
          style={{padding: 20}}
          onSubmit={async data => {
            await sleep(3000);
            alert(JSON.stringify(data));
          }}>
          <Input
            name={'id'}
            style={{marginBottom: 20}}
            disabled
            value={'MOON'}
          />
          <Input
            ref={inputRef}
            name={'passowrd'}
            style={{marginBottom: 20}}
            value={text}
            onChangeText={setText}
          />

          <Button type={'link'}>가나다라</Button>
        </Form>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  'ab-button': {},
});

export default ActBase(App, styles);