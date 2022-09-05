import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react'
import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons  } from '@expo/vector-icons';

import { GiftedChat } from 'react-native-gifted-chat'
import {db, auth} from './firebase'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';


export default function Firechat({route, navigation}) {
  const [messages, setMessages] = useState([]);
  // const [tokuser, setTokUser] = useState([]);
  const [dbnaam, setDbNaam] = useState('shannonpieternella@gmail.comlevigreyofficial@gmail.com');
  const {_iden, dbase, user2, bedrijf, userpopup, id, pic, inboxnummer, chatinbox, ondernemerid, klantid} = route.params;
  const [checkondernemer, setCheckOndernemer] = useState();
  const [name, setName] = useState('');
  const [counting, setCounting] = useState('true');
  const [inboxCount, setinboxCount] = useState();
  const [inboxCount2, setinboxCount2] = useState(0);
  
  
  

  const goBack = () => {
    navigation.goBack();
    
 
}

  useEffect(async () => {
    console.log(value + "  value isissi NOW")
    console.log(await AsyncStorage.getItem('idondernemer'))

    const value = await AsyncStorage.getItem('idondernemer');
    console.log(value + "  value isissi NOW2")
   
    console.log(value + "  value isissi NOW2")
    console.log("chatinbox " + chatinbox)


    console.log("ondernemer id " + ondernemerid + "klantid " + klantid)

   // name(value)
 
// console.log("pending count " + pendingcount)
  }, [])

  useEffect(async()=>{
    const value = await AsyncStorage.getItem('iduser');
    console.log('check value ' + value); 
    const payload = {
      id: value
      
  
    }
 const checkusercompany = await axios.post('https://fyxedsearch.herokuapp.com/posts/gebruiker', payload)
if (checkusercompany.data.ondernemer != false){
await AsyncStorage.setItem('idondernemer', checkusercompany.data.ondernemerId);
setCheckOndernemer(checkusercompany.data.ondernemerId)
console.log('user is company now ' + checkusercompany.data.ondernemerId)

}else{
console.log('user is not a company ' + checkusercompany.data.ondernemer + " ID " + checkusercompany.data.ondernemerID)


}
  },[])
  
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

  useEffect(async() => {
    setinboxCount2(inboxCount2+1)
    console.log("inbox count " + inboxCount2)
    
    const savediduser = await AsyncStorage.getItem('iduser');
    const inboxobj={
      "klantid":savediduser,
      "ondernemerid":_iden
  
  
  
  }
    const checkCount = await axios.post('https://fyxedsearch.herokuapp.com/posts/checkinboxklant', inboxobj);
    console.log('count db inbox ' + checkCount.data);
    console.log('pendiii ' + inboxCount + " counting inbox nr " + inboxnummer )
    setinboxCount(checkCount.data)
    
        
          console.log('count start ' + counting);
if(inboxCount2==3 && inboxCount == 0){

 

   
  if(chatinbox == true){
console.log('skip count add');

  }else{
          const count = {
            companyid: _iden
          }
          const notifyklant = await axios.post('https://fyxedsearch.herokuapp.com/posts/addcountchat', count);
          console.log('count added' + count);
          
     
  

}
   
}

  }, [messages])

    useEffect(async() => {
      console.log('seee');
    console.log(await AsyncStorage.getItem('idondernemer'))
  }, [])

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
      

        const article = {
          "pushtoken": "12",
          "lastsentence": text,
          "user": user2,
          "ondernemer": _iden,
          "dbname": dbase,
          "_id": "123456789",
          "naambedrijf": bedrijf,
          "naamuser": userpopup,
          "created": Date(),
          "imagecompany": pic
      
      };

      const info = {
        "companyid": ondernemerid,       
        "created": Date(),
        "message": text
    
    };

    const infoklant = {
      "klantid": klantid,       
      "created": Date(),
      "message": text
    
    };

      const response = await axios.post('https://fyxedsearch.herokuapp.com/posts/inboxpost', article);
        console.log('res t2' + response + "Ondernemer " + checkondernemer);

        
        if (await AsyncStorage.getItem('idondernemer') == undefined ){
          console.log('bericht naar ondernemer');
          const notify = await axios.post('https://fyxedsearch.herokuapp.com/posts/notify', info);
          console.log('notification' + notify);
          
          console.log("berichten " + messages)
          

        }else{
          console.log('bericht naar klant');
          const notifyklant = await axios.post('https://fyxedsearch.herokuapp.com/posts/notifiedklant', infoklant);
          console.log('notification' + notifyklant);
          
          console.log("berichten " + messages)
        }
      
        
  }, [])

useEffect(async() => {
//   const article = {
//     "pushtoken": "123456789",
//     "lastsentence": 'new message',
//     "user": user2,
//     "ondernemer": _id,
//     "dbname": dbase,
//     "_id": "123456789",
//     "naambedrijf": bedrijf,
//     "naamuser": userpopup,
//     "created": Date(),
//     "imagecompany": pic

    

    
// };
// const response = await axios.post('https://fyxedsearch.herokuapp.com/posts/inboxpost', article);
//   console.log('res t' + response);
}, [])


  return (
    <View style={{ height: '100%'}}>
       
       
        <Pressable onPress={goBack}>
        <Ionicons style={{ padding:25}} name="chevron-back-circle" size={35} color="black"/>
        </Pressable>
    {checkondernemer == null &&   
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: user2,
        name: 'company',
        avatar: 'https://s3.amazonaws.com/appforest_uf/f1652985399356x478230412849508900/fyxedicon.png'
        }}
    />}

{checkondernemer != null &&   
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