/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {createRef, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ActBase, {Button, Form, Input, ScrollView} from 'actbase';

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const App = () => {
  const [text, setText] = React.useState('ㅁㄴㅇㄹㄴㅇㄹa');

  const inputRef = createRef();

  useEffect(() => {
    // console.log(inputRef);

    console.log(typeof []);
  }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <Form
            style={{padding: 20}}
            onSubmit={async data => {
              await sleep(3000);
              alert(JSON.stringify(data));
            }}>
            <Input type={'hidden'} name={'aaa'} value={'bbbb'} />
            <Input
              name={'id'}
              style={{marginBottom: 20}}
              value={'MOON'}
              clearButtonMode={'always'}
              hint={'아이디를 입력해주세요.'}
              onValidate={(value, values) => false}
            />
            <Input
              ref={inputRef}
              name={'passowrd'}
              style={{marginBottom: 20}}
              onValidate={(value, values) => {
                return value
                  ? false
                  : {
                      level: 'error',
                      message: '정말 이대로 가실예정?',
                    };
              }}
            />

            <Button type={'submit'}>asdf</Button>
            <Button type={'button'} tpl={'link'}>
              가나다라
            </Button>
          </Form>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  'ab-button': {},
});

export default ActBase(App, styles);
