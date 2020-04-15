/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// import BeaconRangingOnly from './src/module/beacon';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to BeaconList"
        onPress={() => navigation.navigate('Beacon')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* <Stack.Screen name="Beacon" component={BeaconRangingOnly} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
