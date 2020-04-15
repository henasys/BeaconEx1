import React, {Component} from 'react';
import {View, Text, FlatList} from 'react-native';

import {styles} from '../style/beacon';

export default class BeaconList extends Component {
  render() {
    const {list} = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.headline}>ranging beacons in the area:</Text>
        <FlatList
          data={list}
          renderItem={({item}) => this.renderRow(item)}
          keyExtractor={(item, index) => String(index)}
        />
      </View>
    );
  }

  renderRow = rowData => {
    return (
      <View style={styles.row}>
        <Text style={styles.smallText}>
          UUID: {rowData.uuid ? rowData.uuid : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Major: {rowData.major ? rowData.major : 'NA'}
        </Text>
        <Text style={styles.smallText}>
          Minor: {rowData.minor ? rowData.minor : 'NA'}
        </Text>
        <Text>RSSI: {rowData.rssi ? rowData.rssi : 'NA'}</Text>
        <Text>Proximity: {rowData.proximity ? rowData.proximity : 'NA'}</Text>
        <Text>
          Distance: {rowData.distance ? rowData.distance.toFixed(2) : 'NA'} m
        </Text>
      </View>
    );
  };
}
