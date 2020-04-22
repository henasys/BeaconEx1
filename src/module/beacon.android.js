import React, {Component} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {Platform} from 'react-native';
import Beacons from 'react-native-beacons-manager';

import {beacon} from '../module/constant';
import BeaconList from '../view/beaconList';
import Permission from '../module/permission';

export default class BeaconRangingOnly extends Component {
  beaconsDidRangeEvent = null;
  _isMounted = false;

  state = {
    list: [],
  };

  componentDidMount() {
    console.log('beacon componentDidMount');
    Permission.checkPermissionForCoarseLocation(() => {
      this._isMounted = true;
      // Beacons.setForegroundScanPeriod(5000);
      Beacons.detectIBeacons()
        .then(() => {
          return Beacons.startRangingBeaconsInRegion(
            beacon.identifier,
            beacon.uuid,
          );
        })
        .then(() =>
          console.log('Beacons ranging started succesfully', Platform.OS),
        )
        .catch(error =>
          console.log(
            `Beacons ranging not started, error: ${error}`,
            Platform.OS,
          ),
        );
      this.beaconsDidRangeEvent = DeviceEventEmitter.addListener(
        'beaconsDidRange',
        data => {
          console.log('beaconsDidRange data:', Platform.OS, data);
          if (data.beacons && data.beacons.length > 0) {
            if (this._isMounted) {
              this.setState({
                list: data.beacons,
              });
            }
          }
        },
      );
    });
  }

  componentWillUnmount() {
    console.log('beacon componentWillUnmount');
    this._isMounted = false;
    Beacons.stopRangingBeaconsInRegion(beacon.identifier, beacon.uuid)
      .then(() =>
        console.log('Beacons ranging stopped succesfully', Platform.OS),
      )
      .catch(error =>
        console.log(
          `Beacons ranging not stopped, error: ${error}`,
          Platform.OS,
        ),
      );
    this.beaconsDidRangeEvent && this.beaconsDidRangeEvent.remove();
  }

  render() {
    const {list} = this.state;
    return <BeaconList list={list} />;
  }
}
