/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {createRef} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import ActBase, {
  Button,
  Form,
  Input,
  Option,
  ScrollView,
  Select,
  View,
} from 'actbase';
import Text from './actbase/web/Text';
import Modal from './actbase/modal/Modal';

function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const validators = {
  required: value => {
    return value
      ? null
      : {
          level: 'error',
          message: '필수 항목입니다.',
        };
  },
};

const styles = StyleSheet.create({
  'ab-button': {backgroundColor: '#F00'},
});

const App = () => {
  const [text, setText] = React.useState('ㅁㄴㅇㄹㄴㅇㄹa');
  const [isVisible, setVisible] = React.useState(false);

  const inputRef = createRef();

  return (
    <ActBase styles={styles}>
      <StatusBar barStyle="dark-content" />
      <Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
        <View
          style={{
            backgroundColor: '#FFF',
            margin: 20,
            width: 200,
            height: 200,
          }}>
          <Select name={'select'} value={'1'} placeholder={'입력하세여..'}>
            <Option value={'1'}>가나다</Option>
            <Option value={'2'}>123123123</Option>
            <Option value={'3'}>abcdefg</Option>
          </Select>
          <Text>1212121</Text>
        </View>
      </Modal>
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
              hint={'기본 디스크립션입니다'}
              // onValidate={(value, values) => false}
            />

            <Input
              ref={inputRef}
              name={'passowrd'}
              style={{marginBottom: 20}}
              // validators={validators.required}
              validateMode={'submit'}
            />

            <View style={{width: 200, marginBottom: 50}}>
              <Select name={'select'} value={'1'} placeholder={'입력하세여..'}>
                <Option value={'1'}>가나다</Option>
                <Option value={'2'}>123123123</Option>
                <Option value={'3'}>abcdefg</Option>
              </Select>
            </View>

            <Button type={'submit'}>asdf</Button>

            <Button
              type={'button'}
              tpl={'link'}
              onPress={() => setVisible(true)}>
              모달띠우기
            </Button>
          </Form>
        </ScrollView>
      </SafeAreaView>
    </ActBase>
  );
};

export default App;
