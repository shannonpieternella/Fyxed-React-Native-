import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable,CheckBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import reactDom from 'react-dom';
import React, { useState, useEffect } from "react";
import Push from '../src/store/utils/notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Pushnotification({navigation}) {
    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(async () => {

      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('PUSHTOK');
          if (value !== null) {
            // We have data!!
            console.log(value);
            // navigation.navigate('search');
          }
        } catch (error) {
          // Error retrieving data
        }
      };

    _retrieveData()

    }, [])

    _storeData = async () => {
        try {
          await AsyncStorage.setItem(
            'PUSHTOK',
            expoPushToken
          );
          console.log('check')
        } catch (error) {
            console.log(error)

          // Error saving data
        }
      };

      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('PUSHTOK');
          if (value !== null) {
            // We have data!!
            console.log(value);
          }
        } catch (error) {
          // Error retrieving data
        }
      };
    
    

    return (
     // Container en nav
     
     <View style={{backgroundColor:"black", height:"100%", width:"100%"}}> 

    {/* Register push notificaties */}
    <Push />
     {/* nav    */}
     <View style={{ flexDirection: 'row', justifyContent:"space-between"}}>
    <Image style={{width:35, height:30, marginTop:30, marginLeft:15,}} source={require('../assets/fyxedicon.png')} />
    <Image style={{width:69, height:51, marginTop:20, marginRight:10 }} source={require('../assets/bubbles.png')} />
    </View>


    {/* tekst */}
    <View style={{marginTop:200, width:"100%", alignItems:"center",}}>
    <Text style={{color:"white", fontSize:30,fontWeight:"extrabold",}}>No <Text style={{color:"#FFBF00",}}>FOMO</Text> Here
    
   </Text>
    <Text style={{color:"white", frontsize:12, textAlign:"center", marginTop:15}}>Zorg ervoor dat je niets mist. schakel de notificaties aan en blijf altijd op de hoogte van de laatste updates.
</Text>
    </View>
    
  

{/* button */}
<Pressable onPress={() => {navigation.navigate('search');}}>
<View style={{marginTop:75, width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{height:45, width:195, backgroundColor:"#FFBF00", justifyContent:"center",borderRadius:20}}>
<Text style={{color:"white", textAlign:"center",}}>Next</Text>
</View>
</View>
</Pressable>

{/* <Pressable onPress={() => _retrieveData()}>
<View style={{marginTop:75, width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{height:45, width:195, backgroundColor:"#FFBF00", justifyContent:"center",borderRadius:20}}>
<Text style={{color:"white", textAlign:"center",}}>retrieve data</Text>
</View>
</View>
</Pressable>

<Pressable onPress={() => _storeData()}>
<View style={{ width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{height:45, width:195, backgroundColor:"#FFBF00", justifyContent:"center",borderRadius:20}}>
<Text style={{color:"white", textAlign:"center",}}>store data</Text>
</View>
</View>
</Pressable> */}




    </View>
    );
  }