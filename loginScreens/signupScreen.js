import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, TouchableOpacity, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { useEffect, useState, useLayoutEffect } from 'react';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { render } from 'react-dom';
import { ScrollView } from 'native-base';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';



export default function Signup() {

  const [voornaam, setVoornaam] = useState('');
  const [achternaam, setAchternaam] = useState('');
  const [telefoon, settelefoon] = useState('');
  const [email, setemail] = useState('');
  const [checkOndernemer, setCheckOndernemer] = useState('');
  const [code, setcode] = useState('');
  
  //checked of er een value is van id ondernemer

  useEffect(async() => {  
    const value = await AsyncStorage.getItem('idondernemer');
    console.log(value + "  value isissi NOW2")
    setCheckOndernemer(value)
  }, [])

  useEffect(async() => {

 //load de values van async storage om te gebruiken in fields
  
    const voornaam = await AsyncStorage.getItem('voornaam')
     const achternaam = await AsyncStorage.getItem('achternaam')
      const telefoon = await AsyncStorage.getItem('telefoonnummer')
      const email = await AsyncStorage.getItem('email')
      const codenu = await AsyncStorage.getItem('code')

      setAchternaam(achternaam)
      setVoornaam(voornaam)
      setemail(email)
      settelefoon(telefoon)
      setcode(codenu)
      
console.log('voornaam ' + voornaam );
console.log('achternaam ' + achternaam );
console.log('telefoonnr ' + telefoon );
console.log('email' + email );
console.log('code' + code );



  }, [])


  // Step 1

  const saveProfile = async () => {




    // Hier saved die email in async storage en in een const
    const pushtokenuser = await AsyncStorage.getItem('pushToken');
    await AsyncStorage.setItem('emailklant', email)

// hier checked die of email in async storage hetzelfde is als email in usestate, als true is kan user de info wijzigen, else
    if(await AsyncStorage.getItem('email') == email){
      const payload = {
        naam: voornaam,
        lastname: achternaam,
        telefoonnr: telefoon,
        emailadres: email,
        pushtoken: pushtokenuser,
        ondernemer: false,
        ondernemerId: "false",
        emailconfirmednow:false,
       
    
      } 

      // hier worden alle async storage gesaved die ook gewijzigd zijn in db , code kan opnieuw opgeslagen worden in async zodat er een check mee word gedaan.

      await AsyncStorage.setItem('voornaam', voornaam)
      await AsyncStorage.setItem('achternaam', achternaam)
      await AsyncStorage.setItem('telefoonnummer', telefoon)
      await AsyncStorage.setItem('email', email)
      await AsyncStorage.setItem('code', code) 
     
      console.log('voornaam saved' + voornaam );
      console.log('achternaam saved' + achternaam );
      console.log('telefoonnr saved' + telefoon );
      console.log('email saved' + email );
      console.log('pushtoken saved' + pushtokenuser );
      console.log('code saved' + code );
     

      // emailadres: email

      const userPost = await axios.post('https://fyxedsearch.herokuapp.com/posts/gebruikers', payload)
  // const response = userPost;
  console.log('Response ' + userPost.data._id);
  console.log("Email is equal!!!")
  await AsyncStorage.setItem('iduser', userPost.data._id) // hier saven we iduser van request email
  
 console.log('email saved ' + userPost.data._id)



    }else{
      
    //checked of code geen value heeft in usestate dan pas executen
  if(code != undefined || code != null){

    const pushtokenuser = await AsyncStorage.getItem('pushToken');
 


 
      const payload = {
        naam: voornaam,
        lastname: achternaam,
        telefoonnr: telefoon,
        emailadres: email,
        pushtoken: pushtokenuser,
        ondernemer: false,
        emailconfirmednow: false,
        wachtwoordnow: code,
        wachtwoordsavednow: code
    
      } 

      const userPost = await axios.post('https://fyxedsearch.herokuapp.com/posts/gebruikers', payload)
 
  console.log("Email is not equal!!!")
  console.log('Response222 ' + userPost.data._id);
  console.log('Response222 ' + userPost.data.Voornaam);
  console.log('Response222 ' + userPost.data.Achternaam);
  console.log('Response222 ' + userPost.data.Telefoonnummer);
  console.log('Response222 ' + userPost.data.Email_id);
  console.log('Response222 ' + userPost.data.wachtwoordsaved);
  await AsyncStorage.setItem('iduser', userPost.data._id); // hier saven we nieuwe id
  await AsyncStorage.setItem('voornaam', userPost.data.Voornaam);
  await AsyncStorage.setItem('achternaam', userPost.data.Achternaam);
  await AsyncStorage.setItem('telefoonnummer', userPost.data.Telefoonnummer);
  await AsyncStorage.setItem('email', userPost.data.Email_id);
  await AsyncStorage.setItem('code', userPost.data.wachtwoordsaved);

  
    
  // const payload2 = {
  //   email: email,
  //   name: voornaam,
  //   websitelink: `https://fyxed.nl/confirmmail/?mail=${email}`
  
    
  
  // } 
  // const userPost2 = await axios.post('https://servicemarktplaats.bubbleapps.io/version-test/api/1.1/wf/emailconfirmation/', payload2)
  
    }else{
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Stuur code en vul in',
        textBody: 'Druk op stuur code, en vul de code in je mail in het veld',
        button: 'close',
      })
      
    }

    
  }

  }



  const sendLink = async () => {
    console.log('link seh ' + linknew)
    const mail = await AsyncStorage.getItem('email');
    const idklant = await AsyncStorage.getItem('iduser');
    const linknew = `https://fyxed.nl/dashboard_app_instellingen`;
    let result = await WebBrowser.openBrowserAsync(linknew);
  
  }

  // const renderItem = () => {
    return (
      <Root>
      <ScrollView style={styles.container}>
        
<View style={styles.bgview}>
       
        <View style={styles.header}>
          
        {/* <Image source={require('../assets/arrow.png')} style={styles.arrowicon} /> */}
        <Image source={require('../assets/fyxedlogo.png')} style={styles.logoheader} />
       
</View >

<View style={styles.hiview}>
<Text style={styles.textlogin}>
Profiel
</Text>
{/* <Image source={require('../assets/fyxedicon.png')} resizeMode="contain" style={styles.iconhi} /> */}

</View>
<View style={styles.loginContainerParent2}>

<Pressable style={{ height: 60, width: 325, alignSelf: 'center', paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
>

  <Text style= {{fontSize: 16, paddingRight: 50, color: '#FFBF00'}}>{async() => achternaam} Maak je profiel hier{async () => voornaam} <Text style={ {color: 'white'}}>Creer hier je profiel.</Text></Text>
</Pressable>  

<Text style={{marginLeft: 21}}>Voornaam: {voornaam}</Text>
<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      onChangeText={text => setVoornaam(text)}
      // value={value}
      color="black"
      placeholder=""
      placeholderTextColor="black" 
    />

<Text style={{marginLeft: 21}}>Achternaam: {achternaam}</Text>
<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      onChangeText={text => setAchternaam(text)}
      // value={value}
      color="black"
      placeholder=""
      placeholderTextColor="black" 
    />

<Text style={{marginLeft: 21}}>Telefoonnummer: {telefoon}</Text>
<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      onChangeText={text => settelefoon(text)}
      // value={value}
      color="black"
      placeholder=""
      placeholderTextColor="black" 
    />

<Text style={{marginLeft: 21}}>Email: {email}</Text>
<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      onChangeText={text => setemail(text)}
      // value={value}
      color="black"
      placeholder=""
      placeholderTextColor="black" 
    />
<Text style={{marginLeft: 21}}>Wachtwoord: {code}</Text>
<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      onChangeText={text => setcode(text)}
      // value={value}
      color="black"
      placeholder=""
      placeholderTextColor="black" 
    /> 
    <Pressable >
    
      </Pressable>   
    

<Pressable onPress={async()=> {
   const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
   console.log(checkPushTokenExists + ' Pushtoken')
 
   if(checkPushTokenExists == undefined || checkPushTokenExists == null ){
     Dialog.show({
       type: ALERT_TYPE.WARNING,
       title: 'Pushnotificaties staan uit',
       textBody: 'Verwijder en installeer de app opnieuw en accepteer pushnotificaties om deze functies te kunnen gebruiken!',
       button: 'close',
     })}else{
      if(await AsyncStorage.getItem('email') == email){
  saveProfile()
  Dialog.show({
    type: ALERT_TYPE.WARNING,
    title: 'Success',
    textBody: 'Gefeliciteerd! Je profiel is succesvol opgeslagen!',
    button: 'close',
  })
      }else{
        saveProfile()
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Je hebt zojuist een nieuwe email ingesteld',
          textBody: 'Veel plezier op Fyxed!',
          button: 'close',
        })

      }

     }
}
  
  
} style={{ marginTop: 10, marginBottom:10,height: 45, borderWidth: 1, backgroundColor: '#FFBF00', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 35, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
>

  <Text style= {{fontSize: 16, paddingRight: 50, color: 'white'}}>Opslaan</Text>
</Pressable>
{checkOndernemer != undefined &&
<Pressable onPress={async()=> {
   const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
   console.log(checkPushTokenExists + ' Pushtoken')
 sendLink()
  
     
}
  
  
} style={{ height: 45, borderWidth: 1, backgroundColor: '#FFBF00', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 35, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
>

  <Text style= {{fontSize: 16, paddingRight: 50, color: 'white'}}>Admin Dashboard</Text>
</Pressable>}

<Pressable style={{ height: 45, width: 325, alignSelf: 'center', paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
>

  <Text style= {{fontSize: 12, paddingRight: 50, color: 'white'}}>By selecting Agree and continue below, i agree to <Text style={ {color: '#FFBF00'}}>Terms of Service and Privacy Policy</Text></Text>
</Pressable>  
  




</View>


</View>

        <StatusBar style="auto" />
        
      </ScrollView>
      </Root>
    );
  }
// }

// function HomeScreen() {
// return (
//   <View>

// <Text>seh</Text>
//   </View>
// );

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
    
   

  },

  iconlogin: {
height: 30,
width: 30,
justifyContent: 'space-around',
flexDirection: 'row'

  },

   
      
  
  loginContainerParent2: {

  flexDirection: 'column',

  borderRadius: 20,
      // borderWidth: 1,
      borderColor: '#ffffff',
      backgroundColor: '#FFFFFFAD',
     
      height: 600,
      justifyContent:'space-around',
    
      width: 335,
      alignSelf: 'center',
      // justifyContent: 'space-evenly'
      
  

  
  },


  loginContainer: {
height: 350,
width: 300,
// borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#ffffff',
    // backgroundColor: '#ffffff',
    
  



  },

  hiview: {
   
    height: 25,
    // borderRadius: 14,
    // borderWidth: 1,
    // borderColor: '#ffffff',
    flexDirection: 'row',
    alignItems:'center',
    width: 40
    
  

  },

  background: {
height: 600,



  },

  bgview: {
height: 230,
// width: 400,
marginBottom: 500,


  },

  arrowicon: {
  height: 25,
  width: 25

  },

  header: {
    // borderRadius: 14,
    // borderWidth: 1,
    // // borderColor: '#ffffff',
    height: 80, 
    
    justifyContent: 'center',
  
    // paddingLeft: 15,
    width: "90%",
    // justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between'

  },

  textlogin: {
  color: '#ffffff',
  fontSize: 40,
  marginLeft: 25,
  fontWeight: 'bold',
 paddingLeft: 25,
  width:150

  },

  logoheader: {
height: 35,
width: 200


  },

  iconhi: {
    height: 40,
    width: 40,
    marginTop: 55,
   

    
    
      }
    

});
