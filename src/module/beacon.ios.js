import React, {Component} from 'react';
import {Platform} from 'react-native';
import Beacons from 'react-native-beacons-manager';

import {beacon} from '../module/constant';
import BeaconList from '../view/beaconList';

export default class BeaconRangingOnly extends Component {
  beaconsDidRangeEvent = null;
  authStateDidRangeEvent = null;
  _isMounted = false;

  state = {
    list: [],
  };

  componentDidMount() {
    console.log('beacon componentDidMount');
    this._isMounted = true;
    this.authStateDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
      'authorizationStatusDidChange',
      info => console.log('authorizationStatusDidChange: ', info),
    );
    Beacons.requestWhenInUseAuthorization();
    Beacons.startRangingBeaconsInRegion(beacon)
      .then(() =>
        console.log('Beacons ranging started succesfully', Platform.OS),
      )
      .catch(error =>
        console.log(
          `Beacons ranging not started, error: ${error}`,
          Platform.OS,
        ),
      );
    this.beaconsDidRangeEvent = Beacons.BeaconsEventEmitter.addListener(
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
  }

  componentWillUnmount() {
    console.log('beacon componentWillUnmount');
    this._isMounted = false;
    Beacons.stopRangingBeaconsInRegion(beacon)
      .then(() =>
        console.log('Beacons ranging stopped succesfully', Platform.OS),
      )
      .catch(error =>
        console.log(
          `Beacons ranging not stopped, error: ${error}`,
          Platform.OS,
        ),
      );
    this.authStateDidRangeEvent && this.authStateDidRangeEvent.remove();
    this.beaconsDidRangeEvent && this.beaconsDidRangeEvent.remove();
  }

  render() {
    const {list} = this.state;
    return <BeaconList list={list} />;
  }
}
