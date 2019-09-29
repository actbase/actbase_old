import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  default: {
    height: 40,
    backgroundColor: '#1890ff',
    borderColor: '#1890ff',
    borderWidth: 1,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  defaultText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

const coverStyle = [styles.default];

const Button = ({ children }) => {
  try {

    const [pressed, setPressed] = useState(false);
    useEffect(() => () => {
      if (pressed) {
        coverStyle.push({
          backgroundColor: "#F00"
        })
      }
      else {
        coverStyle.splice(1);
      }
    }, [pressed]);



    return (
      <TouchableOpacity
        activeOpacity={1}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={coverStyle}
      >
        <Text style={[styles.defaultText]}>{children}</Text>
      </TouchableOpacity>
    );
  }
  catch(e) {

  }
};

export default Button;
