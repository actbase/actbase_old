import React from 'react';
import {SafeAreaView, StatusBar, Text, View} from 'react-native';
import {Button, Form, Input, Modal, Option, ScrollView, Select} from 'actbase';

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

const Forms = () => {
  const [text, setText] = React.useState('ㅁㄴㅇㄹㄴㅇㄹa');
  const [isVisible, setVisible] = React.useState(false);

  const [page, setPage] = React.useState(0);

  const inputRef = React.createRef();

  return (
    <>
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
          <Text>1212134321</Text>
        </View>
      </Modal>

      <SafeAreaView style={{flex: 1}}>
        <ScrollView style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
          <Button
            type={'button'}
            tpl={'link'}
            onPress={() => setPage(page => page + 1)}>
            {`${page} page`}
          </Button>

          <Form
            style={{padding: 20, flex: 1}}
            onSubmit={async data => {
              await sleep(3000);
              alert(JSON.stringify(data));
            }}>
            <Input type={'hidden'} name={'aaa'} value={'bbbb'} />

            <Input
              name={'id'}
              style={{marginBottom: 20}}
              value={text}
              clearButtonMode={'always'}
              hint={'기본 디스크립션입니다'}
              onChangeText={setText}
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
              <Select name={'select'} placeholder={'입력하세여..'}>
                <Option value={'1'}>가나다</Option>
                <Option value={'2'}>123123123</Option>
                <Option value={'3'}>abcdefg</Option>
              </Select>
            </View>

            <Button type={'submit'}>asdf</Button>

            <Button
              type={'button'}
              onPress={async () => {
                await sleep(3000);
                alert('a');
              }}>
              wait
            </Button>

            <Button
              type={'button'}
              tpl={'link'}
              onPress={() => {
                setVisible(true);
              }}>
              모달띠우기
            </Button>

            <View style={{flex: 1}} />

            <View>
              <Select name={'select'} value={'1'} placeholder={'입력하세여..'}>
                <Option value={'1'}>가나다</Option>
                <Option value={'2'}>123123123</Option>
                <Option value={'3'}>abcdefg</Option>
              </Select>
            </View>
          </Form>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Forms;
