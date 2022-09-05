import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { borderColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { MaterialIcons } from '@expo/vector-icons';

export default function Dashboardondernemer() {

  const [voornaam, setVoornaam] = useState('');
  const [achternaam, setAchternaam] = useState('');
  const [telefoon, settelefoon] = useState('');
  const [email, setemail] = useState('');
  
  useEffect(async() => {
    const value = await AsyncStorage.getItem('iduser');
   console.log('Voornaam ' + voornaam)
   console.log('Achternaam ' + achternaam)
   console.log('telefoon ' + telefoon)
   console.log('Email ' + email)
   console.log('iduser ' + value)
   


  }, [voornaam, achternaam, telefoon, email])

  const saveProfile = async () => {
    const pushtokenuser = await AsyncStorage.getItem('pushToken');
    if(pushtokenuser != null){
      const payload = {
        naam: voornaam,
        lastname: achternaam,
        telefoonnr: telefoon,
        emailadres: email,
        pushtoken: pushtokenuser,
        ondernemer: false,
        ondernemerId: "false"
    
      } 

      const imageuri = "https://cdn.pixabay.com/photo/2020/05/26/15/42/eagle-5223559_960_720.jpg";

      const userPost = await axios.post('https://fyxedsearch.herokuapp.com/posts/gebruikers', payload)
  // const response = userPost;
  console.log('Response ' + userPost.data._id);
  await AsyncStorage.setItem('iduser', userPost.data._id)
    }else{
      const payload = {
        naam: voornaam,
        lastname: achternaam,
        telefoonnr: telefoon,
        emailadres: email,
        pushtoken: "false",
        ondernemer: false,
        ondernemerId: "false"
    
      } 

      const userPost = await axios.post('https://fyxedsearch.herokuapp.com/posts/gebruikers', payload)
  // const response = userPost;
  console.log('Response ' + userPost.data._id);
  await AsyncStorage.setItem('iduser', userPost.data._id)

    
    } 

  


  }


    return (
        //logo and backbutton

      <View>
        <View style={{borderColor:"black", borderWidth: 1, height: 30, flexDirection:'row' }}>
        <MaterialIcons name="keyboard-arrow-left" size={24} color="black" style={{alignSelf:'center', }} />
        <Image style={{width:75, height:15, alignItems:"center", alignSelf:'center', marginLeft: 135 }}source={require('../assets/fyxedlogo.png')}/>
        </View>

        {/* Dashboard */}

        <View style={{borderColor:"black", borderWidth: 1, height: 30, flexDirection:'row', justifyContent:'center', marginTop: 20 }}>
        <Text style={{fontWeight:'bold', fontSize:'24'}}> Dashboard </Text> 
        </View>

        {/* Image profile */}

        <View style={{justifyContent:'center'}}>
      <Image style={{width: 150, height:150, borderRadius:10000, alignSelf:'center', marginTop:20}} source={{ uri: "https://cdn.pixabay.com/photo/2020/05/26/15/42/eagle-5223559_960_720.jpg" }} />
      </View>

      {/* Name company */}

      <View style={{borderColor:"black", borderWidth: 1, height: 30, flexDirection:'row', marginTop: 20 }}>
<Text style={{marginLeft: 30, fontWeight: 'bold', fontSize:'21'}}>
  Beautyville
</Text>
      </View>

      {/* inputs */}

      <View style={{borderColor:"black", borderWidth: 1, height: '100%', flexDirection:'column', marginTop: 20 }}>
<Text style={{marginLeft: 30, fontSize:'16'}}>
  Naam:
</Text>
<TextInput style={{borderWidth: 1, height: 50, width: 360, alignSelf:'center', marginTop:20, borderRadius:14}}></TextInput>
    
<Text style={{marginLeft: 30, fontSize:'16', marginTop:20}}>
  Naam:
</Text>
<TextInput style={{borderWidth: 1, height: 50, width: 360, alignSelf:'center', marginTop:20, borderRadius:14}}></TextInput>
     
    
    
      </View>

      
        
        
      
      </View>
    );
  }

  

    


