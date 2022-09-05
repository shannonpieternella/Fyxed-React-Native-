import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons  } from '@expo/vector-icons';

import { GiftedChat } from 'react-native-gifted-chat'
import {db, auth} from './firebase'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import chatinbox from './chatinbox';

export default function Firechat2({route, navigation}) {
  const [messages, setMessages] = useState([]);
  // const [tokuser, setTokUser] = useState([]);
  const [dbnaam, setDbNaam] = useState('shannonpieternella@gmail.comlevigreyofficial@gmail.com');
  const {_id, dbase, user2, bedrijf, userpopup, id, pic} = route.params;
  const [name, setName] = useState('');
  
  const goBack = () => {
    navigation.goBack();

}

  useEffect(async () => {
    

 console.log("db " + dbase, " id ",_id, " tokenuser ", user2, " id ", id, "chatinbox " + chatinbox)

  }, [])
  
  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Welkom bij Barbershop Hopi style, Typ je bericht',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1577549960329x553264359930939460%2FIcon-YellowGrey-Transparent.png?w=192&h=158&auto=compress&dpr=1&fit=max',
  //       },
  //     },

  //     {
  //       _id: 2,
  //       text: 'Welkom sua',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 1,
  //         name: 'React Native',
  //         avatar: 'https://d1muf25xaso8hp.cloudfront.net/https%3A%2F%2Fs3.amazonaws.com%2Fappforest_uf%2Ff1577549960329x553264359930939460%2FIcon-YellowGrey-Transparent.png?w=192&h=158&auto=compress&dpr=1&fit=max',
  //       },
  //     },
  //   ])
  // }, [])

  useLayoutEffect(() => {
    const unsubscribe = db.collection(dbase).orderBy('createdAt', 'desc').onSnapshot(snapshot => setMessages(
    snapshot.docs.map(doc => ({
    _id: doc.data()._id,
    createdAt: doc.data().createdAt.toDate(),
    text: doc.data().text,
    user: doc.data().user,
    
    }))
    ));

    return unsubscribe;
    }, [])

  const onSend = useCallback(async (messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    const {
        _id,
        createdAt,
        text,
        user,
        } = messages[0]
        db.collection(dbase).add({
        _id,
        createdAt,
        text,
        user
        })

        console.log('Start');
          const article = {
            "pushtoken": "123456789",
            "lastsentence": 'new message',
            "user": name,
            "ondernemer": _id,
            "dbname": dbase,
            "_id": "123456789",
            "naambedrijf": bedrijf,
            "naamuser": userpopup,
            "created": Date(),
            "imagecompany": pic
        
        
        };
        
        const info = {
          "klantid": "6313b7764669e000ef6a2878",       
          "created": Date(),
          "message": text
        
        };
        
       
        const notify = await axios.post('https://fyxedsearch.herokuapp.com/posts/notifyklant', info);
                console.log('notification' + notify);
        
                console.log("berichten " + messages)
        
        const response = await axios.post('https://fyxedsearch.herokuapp.com/posts/inboxpost', article);
          console.log('res t6' + response);
       




        
  }, [])




  return (
    <View style={{ height: '100%'}}>
       
       
        <Pressable onPress={goBack}>
        <Ionicons style={{ padding:25}} name="chevron-back-circle" size={35} color="black"/>
        </Pressable>
      {0 == 1 && 
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: name,
        name: name,
        avatar: 'https://s3.amazonaws.com/appforest_uf/f1652985399356x478230412849508900/fyxedicon.png'
        }}
    />}
     </View>
        
  )
}