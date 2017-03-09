'use strict';
 
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Image,
  ActivityIndicator
} from 'react-native';

import SearchResults from './SearchResults';

var styles = StyleSheet.create({
mainText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: '#E65100'
},
description: {
    marginBottom: 10,
    fontSize: 17,
    textAlign: 'center',
    color: '#FFFFFF'
},
errorText:{
    marginTop: 15,
    fontWeight: '200',
    fontSize: 16,
    textAlign: 'center',
    color: '#B71C1C'
},
container: {
    flexDirection: 'column',
    flex: 1,
    padding: 20,
    marginTop: 70,
    alignItems: 'center',
},
flowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch'
},
searchInput: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#E65100',
    borderRadius: 8,
    color: '#FFFFFF'
},
buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
},
button: {
    height: 36,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#E65100',
    borderColor: '#E65100',
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center'
},
buttonLocate:{
    height: 36,
    backgroundColor: '#E65100',
    borderColor: '#E65100',
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
},
image: {
  marginTop: 40,
  width: 110,
  height: 110,
  marginBottom: 10
}
});

function urlForQueryAndPage(key, value, pageNumber) {
  var data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber
  };
      data[key] = value;
  var querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');
    
  return 'http://api.nestoria.co.uk/api?' + querystring;
};

export default class SearchPage extends Component {

constructor(props) {
  super(props);
  this.state = {
  searchString: '',
  isLoading: false
  };
}
    
onSearchTextChanged(event) {
  this.setState({ searchString: event.nativeEvent.text });
}

onSearchPressed() {
  var query = urlForQueryAndPage('place_name', this.state.searchString, 1);
  this._executeQuery(query);;
}

_executeQuery(query) {
  // console.log(query);
  this.setState({ isLoading: true });
  
  fetch(query)
  .then(response => response.json())
  .then(json => this._handleResponse(json.response))
  .catch(error =>
     this.setState({
      isLoading: false,
      message: 'Something bad happened ' + error
   }));
   
}
 
_handleResponse(response) {
  this.setState({ isLoading: false , message: '' });
  if (response.application_response_code.substr(0, 1) === '1') {
      // console.log('Properties found: ' + response.listings.length);
  
  var passProps = {listings: response.listings};
  this.props.navigator.push({
    id: 'SearchResults',
    name: 'SearchResults',
    passProps: passProps
  });
  // console.log(passProps);

} else {
    this.setState({ message: 'Location not recognized; please try again.'});
  }
}

onLocationPressed() {
  navigator.geolocation.getCurrentPosition(
    location => {
      var search = location.coords.latitude + ',' + location.coords.longitude;
      this.setState({ searchString: search });
      var query = this.urlForQueryAndPage('centre_point', search, 1);
      this._executeQuery(query);
    },
    error => {
      this.setState({
        message: 'There was a problem with obtaining your location: ' + error
      });
    });
}
  render() {
    var spinner = this.state.isLoading ?
        ( <ActivityIndicator
            size='large'/> ) :
        ( <View/>);

    return (
        <View style={{flex: 1, backgroundColor: '#263238'}}>
      <View style={styles.container}>
        <Text style={styles.mainText}>
          Search for houses to buy!
        </Text>
        <Text style={styles.description}>
          Search by place-name, postcode or search near your location.
        </Text>
        
        <View style={styles.flowRight}>
        <TextInput
            style={styles.searchInput}
            value = {this.state.searchString}
            onChange = {this.onSearchTextChanged.bind(this)}
            underlineColorAndroid={'transparent'}
            placeholderTextColor = {'#9E9E9E'}
            placeholder='Search via name or postcode'/>
        <TouchableHighlight style={styles.button}
            underlayColor='#263238'
            onPress={this.onSearchPressed.bind(this)}>
            <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>
        </View>

        <TouchableHighlight style={styles.buttonLocate}
            underlayColor='#263238'
            onPress={this.onLocationPressed.bind(this)}>
        <Text style={styles.buttonText}>Location</Text>
        </TouchableHighlight>
        <Image source={require('./Resources/house.png')} style={styles.image}/>
        {spinner}
        <Text style={styles.errorText}>{this.state.message}</Text>
        </View>
        </View>
    );
  }
}