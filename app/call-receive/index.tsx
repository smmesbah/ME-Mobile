import React, {useEffect, useState} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

const CallReceive = () => {
  const [featureOn, setFeatureOn] = useState(false);
  const [incoming, setIncoming] = useState(false);
  const [number, setNumber] = useState(null);
    let callDetector:any = null;
  useEffect(() => {
    askPermission();
  }, []);

  const askPermission = async () => {
    try {
      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
      ]);
      console.log('Permissions are:', permissions);
    } catch (err) {
      console.warn(err);
    }
  };

  const startListenerTapped = () => {
    setFeatureOn(true);
    callDetector = new CallDetectorManager(
      (event:any, number:any) => {
        console.log(event, number);
        if (event === 'Disconnected') {
          // Do something call got disconnected
          setIncoming(false);
          setNumber(null);
        } else if (event === 'Incoming') {
          // Do something call got incoming
          setIncoming(true);
          setNumber(number);
        } else if (event === 'Offhook') {
          //Device call state: Off-hook.
          // At least one call exists that is dialing,
          // active, or on hold,
          // and no calls are ringing or waiting.
          setIncoming(true);
          setNumber(number);
        } else if (event === 'Missed') {
          // Do something call got missed
          // setState({incoming: false, number: null});
          setIncoming(false);
          setNumber(null);
        }
      },
      true, // if you want to read the phone number of the incoming call [ANDROID], otherwise false
      () => {}, // callback if your permission got denied [ANDROID] [only if you want to read incoming number] default: console.error
      {
        title: 'Phone State Permission',
        message:
          'This app needs access to your phone state in order to react and/or to adapt to incoming calls.',
      }, // a custom permission request message to explain to your user, why you need the permission [recommended] - this is the default one
    );
  };
  const stopListenerTapped = () => {
    callDetector && callDetector.dispose();
    setFeatureOn(false);
    setIncoming(false);
  };

  return (
    <View style={styles.body}>
      <Text style={{color: 'black', fontSize: 26, fontWeight: '700'}}>
        Call Detection
      </Text>
      <Text style={[styles.text, {color: 'black'}]}>
        Should the detection be on?
      </Text>
      <TouchableHighlight
        style={{borderRadius: 50}}
        onPress={featureOn ? stopListenerTapped : startListenerTapped}>
        <View
          style={{
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: featureOn ? 'blue' : '#eb4034',
            borderRadius: 50,
          }}>
          <Text style={styles.text}>{featureOn ? `ON` : `OFF`} </Text>
        </View>
      </TouchableHighlight>
      {incoming && (
        <Text style={{fontSize: 50, color: 'red'}}>Incoming call {number}</Text>
      )}
    </View>
  );
};

export default CallReceive;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    padding: 20,
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  button: {},
});