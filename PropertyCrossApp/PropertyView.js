'use strict';
 
import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';

var styles = StyleSheet.create({
  heading: {
    backgroundColor: '#263238',
  },
  separator: {
    height: 1,
    backgroundColor: '#E65100'
  },
  image: {
    width: 400,
    height: 300
  },
  price: {
    fontSize: 25,
    fontWeight: 'bold',
    margin: 8,
    color: '#E65100'
  },
  title: {
    fontSize: 20,
    margin: 8,
    color: '#FFFFFF'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#EEEEEE'
  }
});

export default class PropertyView extends Component {
 
  render() {
    var property = this.props.property;
    var stats = property.bedroom_number + ' bed ' + property.property_type;
    if (property.bathroom_number) {
      stats += ', ' + property.bathroom_number + ' ' + (property.bathroom_number > 1 ? 'bathrooms' : 'bathroom');
    }
 
    var price = property.price_formatted.split(' ')[0];
 
    return (
     <View style={{flex: 1, backgroundColor: '#263238'}}>
      <View style={styles.container}>
        <Image style={styles.image}
            source={{uri: property.img_url}} />
        <View style={styles.heading}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.title}>{property.title}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{stats}</Text>
        <Text style={styles.description}>{property.summary}</Text>
      </View>
      </View>
    );
  }
}