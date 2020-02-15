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
import ActBase, {Form, Input, Col, Button} from 'actbase';
import Row from 'actbase/Layout/Row';
import {range} from 'lodash';

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
      <SafeAreaView>
        <Form
          style={{padding: 20}}
          onSubmit={async data => {
            await sleep(3000);
            alert(JSON.stringify(data));
          }}>
          <Input type={'hidden'} name={'aaa'} value={'bbbb'} />
          <Input name={'id'} style={{marginBottom: 20}} value={'MOON'} />
          <Input
            ref={inputRef}
            name={'passowrd'}
            style={{marginBottom: 20}}
            value={text}
            onChangeText={setText}
          />

          <Row gutter={[5, 15]} align={'top'}>
            {range(0, 10).map(v => (
              <Col key={`${v}`} xs={6}>
                <View style={{backgroundColor: '#F00'}}>
                  <Text>aaa</Text>
                </View>
              </Col>
            ))}
          </Row>

          <Button type={'submit'}>asdf</Button>

          <Button tpl={'link'}>가나다라</Button>
        </Form>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  'ab-button': {},
});

export default ActBase(App, styles);
