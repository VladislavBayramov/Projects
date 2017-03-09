'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

var styles = StyleSheet.create({
image: {
  marginTop: 40,
  width: 250,
  height: 250
}
});
export default class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'SearchPage',
      });
    }, 700);
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#263238', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#E65100', fontSize: 32,}}>PropertyCross</Text>
        <Image source={require('./Resources/house@2x.png')} style={styles.image}/>
      </View>
    );
  }
}

