import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable,CheckBox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import reactDom from 'react-dom';
import React, { useState, useEffect } from "react";
import Push from '../src/store/utils/notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Search from './Search';
import { TouchableOpacity } from 'react-native-web';
import {useSelector, useDispatch} from 'react-redux';
  import configureStore from '../src/store';
  import {SetStadFilter} from "../src/store/actions/app.actions";
  import { TabNav } from '../App';

  const store = configureStore();


export default function StartScreen({navigation}) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [triggerPush, setTriggerPush] = useState(false);
    const {stadSearch, navigeer} = useSelector(({appReducer}) => appReducer);

// _storeData = async () => {
//         try {
//           await AsyncStorage.setItem(
//             'PUSHTOK',
//             expoPushToken
//           );
//           console.log('check seaa')
//         } catch (error) {
//             console.log(error)

//           // Error saving data
//         }
//       };

//Use effect to retrieve data from asyncstorage.

    useEffect(async () => {
      _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('pushToken');
          setExpoPushToken(value);

          // console.log('expo token loading 7 ' + await AsyncStorage.getItem('pushToken'));

          if(await AsyncStorage.getItem('pushToken') !== null ){
            navigation.navigate('nextpage');
          }
          
 
        } catch (error) {
          // Error retrieving data
        }
      };

    _retrieveData()

    }, [])
//end use effect retrieve data.
    
      // _retrieveData = async () => {
      //   try {
      //     const value = await AsyncStorage.getItem('PUSHTOK');
      //     if (value !== null) {
      //       // We have data!!
      //       console.log(value);
      //     }
      //   } catch (error) {
      //     // Error retrieving data
      //   }
      // };



      useEffect(() => {
        if(navigeer == true){

          console.log('gps!!!!!!!!!')
          navigation.navigate('nextpage');
        }
     
      }, [navigeer])
      
    
    

    return (
      <View style={{height: '100%'}}>
      
     
     {0 == 5  && (

<View><Text>hoiiiiiiiiiiiii</Text>
</View>

     )}

     {expoPushToken === null && (
     <View style={{backgroundColor:"black", height:"100%", width:"100%"}}> 
     
    {/* Register push notificaties */}
    {triggerPush === true && (
    <Push />
    )}

     {/* nav    */}
     <View style={{ flexDirection: 'row', justifyContent:"space-between"}}>
    <Image style={{width:35, height:30, marginTop:30, marginLeft:15,}} source={require('../assets/fyxedicon.png')} />
    <Image style={{width:69, height:51, marginTop:20, marginRight:10 }} source={require('../assets/bubbles.png')} />
    </View>
    
    
    <View style={{marginTop: 200, width:350, alignSelf:'center'}}><Text><Text style={{color:"white", fontWeight: 'bold', fontsize: 12, textAlign:"center"}}>Welkom bij Fyxed!. Om je zo goed mogelijk van dienst te kunnen zijn zet je pushnotificaties aan.</Text>
</Text></View>
<Pressable onPress={()=> {{if(triggerPush == false){
  setTriggerPush(true)
}else{
  setTriggerPush(false)
} }}}>

<View style={{marginTop:75, borderRadius:14, width:250, height: 75, justifyContent: 'center', alignSelf:"center", borderWidth:1, borderColor:'white', backgroundColor:'#FFBF00'}}>
    <Text style={{color:"black", fontsize: 12, textAlign:"center"}}>Zet Pushnotificaties aan</Text>
    </View>
     
</Pressable>

   
    
     </View>
     )}
{/* button */}
{/* <Pressable onPress={() => {navigation.navigate('search');}}>
<View style={{marginTop:75, width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{height:45, width:195, backgroundColor:"#FFBF00", justifyContent:"center",borderRadius:20}}>
<Text style={{color:"white", textAlign:"center",}}>Next</Text>
</View>
</View>
</Pressable> */}

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