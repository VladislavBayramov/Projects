'use strict';
 
import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  ListView,
  Text
} from 'react-native';

import PropertyView from './PropertyView';

var styles = StyleSheet.create({
  thumb: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#E65100'
  },
  price: {
    fontSize: 25,
    fontWeight: '400',
    color: '#E65100'
  },
  title: {
    fontSize: 20,
    color: '#FFFFFF'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#263238'
  }
});

export default class SearchResults extends Component {
 
  constructor(props) {
    super(props);
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.lister_url !== r2.lister_url});
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.listings)
    };
  }
 
rowPressed(listerURL) {

  var property = this.props.listings.filter(prop => prop.lister_url === listerURL)[0];

  this.props.navigator.push({
    id: 'PropertyView',
    name: 'PropertyView',
    passProps: {property: property}
  });
}

  renderRow(rowData, sectionID, rowID) {
  var price = rowData.price_formatted.split(' ')[0];
 
  return (
    <TouchableHighlight onPress={() => this.rowPressed(rowData.lister_url)}
        underlayColor='#37474F'>
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.thumb} source={{ uri: rowData.img_url }} />
          <View  style={styles.textContainer}>
            <Text style={styles.price}>{price}</Text>
            <Text style={styles.title}
                  numberOfLines={1}>{rowData.title}</Text>
          </View>
        </View>
        <View style={styles.separator}/>
      </View>
    </TouchableHighlight>
  );
}
 
  render() {
    // console.log("SearchResults props: ", this.props);
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow.bind(this)}/>
    );
  }
 
}