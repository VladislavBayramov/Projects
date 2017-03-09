'use strict';

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Navigator,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  BackAndroid
} from 'react-native';

import SplashPage from './SplashPage';
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';
import PropertyView from './PropertyView';

class PropertyCrossApp extends Component {
  
  render() {

    return (
      <Navigator
          initialRoute={{id: 'SplashPage', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    );
  }
  renderScene(route, navigator) {

    var routeId = route.id;
    
    if (routeId === 'SplashPage') {
      return (
        <SplashPage
          navigator={navigator} />
      );
    }
    if (routeId === 'SearchPage') {
      return (
        <SearchPage
          navigator={navigator} />
      );
    }
    if (route.id === 'SearchResults') {
      return (<SearchResults listings={route.passProps.listings} navigator={navigator} />
      );
    }
    
    if (route.id === 'PropertyView') {
      return (<PropertyView {...route.passProps} navigator={navigator} />
      );
  }
    return this.noRoute(navigator);
  }
  noRoute(navigator) {
    return (
      <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}
            onPress={() => navigator.pop()}>
          <Text style={{color: 'red', fontWeight: 'bold'}}>Aborted</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PropertyCrossApp', () => PropertyCrossApp);