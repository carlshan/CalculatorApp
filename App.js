import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class ReactCalculator extends Component {
  render() {
    return (
        <Text>Hello, React!</Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
