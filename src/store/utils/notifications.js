import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import {fetchAllNfts, filterNfts, fetchSearchNfts, fetchFilterStad, SendPushToken} from '../../../src/endpoints'
import {useSelector, useDispatch} from 'react-redux';
import configureStore from '../../store';
import {SetStadFilter} from "../../store/actions/app.actions";
import { SetNavigeer } from '../../store/actions/app.actions';

const store = configureStore();

export default function Push() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const dispatch = useDispatch();

//Useffect send push token naar db als token saved is in expoPushtoken const / trigger useffect pas na expoPushtoken state changes.
  useEffect(async () => {
    await AsyncStorage.setItem('pushToken', expoPushToken)
    const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
    console.log(checkPushTokenExists + ' button Pushtoken')
    axios.get(SendPushToken(await AsyncStorage.getItem('pushToken'))).then(res => {
  // _storeData = async () => {
  //   try {
  //     await AsyncStorage.setItem(
  //       'PUSHTOK',
  //       expoPushToken
  //     );
  //     console.log('check notifications.js 1 ')
  //   } catch (error) {
  //       console.log(error)
  //   }
  // };

  // _storeData()

}).catch(err => {
  console.log(err)
})
console.log("pushtoken send awwoooo button pushed" + checkPushTokenExists)
dispatch(SetNavigeer(true))
// navigation.navigate('search');


}, [expoPushToken])

//einde useeffect



//Hier word expoPushToken state opgeslagen

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      // Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View>
      
      
    </View>
  );
}


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
