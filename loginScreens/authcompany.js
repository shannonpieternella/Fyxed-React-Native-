import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable,CheckBox, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import React, { useState, useEffect } from "react";
import Push from '../src/store/utils/notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useSelector, useDispatch} from 'react-redux';
  import configureStore from '../src/store';
  import {SetStadFilter} from "../src/store/actions/app.actions";
import { TouchableOpacity } from 'react-native-web';
import { AntDesign, MaterialIcons, Ionicons  } from '@expo/vector-icons';

  const store = configureStore();


export default function Authondernemer({navigation}) {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [triggerPush, setTriggerPush] = useState(false);
    const [idondernemer, setIdOndernemer] = useState('');
    const [naambedrijf, setNaamBedrijf] = useState('');
    const [save, setSave] = useState(false);
    const {stadSearch, navigeer} = useSelector(({appReducer}) => appReducer);


    const goBack = () => {
        navigation.goBack();
    
    }
      
      
      useEffect(async () => {
    

console.log('SAVING NOW')
      }, [save])

      
      const createThreeButtonAlert = async () =>
      Alert.alert(
        "Je inlog gegevens zijn opgeslagen!",
        `Naam bedrijf: ${naambedrijf}`,
        [
          
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => setSave(true) }
        ]
,
console.log(idondernemer, "Id ondernemer", naambedrijf , "Naam bedrijf"),
await AsyncStorage.setItem('idondernemer', idondernemer),
await AsyncStorage.setItem('naamondernemer', naambedrijf),

      
      );

      useEffect(async () => {
        _retrieveData = async () => {
          try {
            const value = await AsyncStorage.getItem('idondernemer');
            console.log(value, " ID ondernemerr saved")
  
            const naambedrijf = await AsyncStorage.getItem('naamondernemer');
            console.log(naambedrijf, " Naam ondernemerr saved")
  
            
            // console.log('expo token loading 7 ' + await AsyncStorage.getItem('pushToken'));
            
   
          } catch (error) {
            // Error retrieving data
          }
        };
  
      _retrieveData()
  
      }, [])
    

    return (




        <View style={{height:'90%', borderColor:'red'}}>
            <Pressable onPress={goBack}>
        <Ionicons style={{marginLeft:20, marginBottom: 120}} name="chevron-back-circle" size={35} color="white"/>
        </Pressable>

      <View style={{height: '54%', justifyContent: 'center', alignItems:'center', justifyContent: 'space-between'}}>
       
          <Text style={{fontSize: 36}}> Claim je bedrijf!</Text>
          
      <Text>ID Bedrijf {idondernemer}</Text>
     <TextInput secureTextEntry={false} onChangeText={setIdOndernemer} placeholder={idondernemer} style ={{width: 300, height: 60, borderWidth: 1, borderRadius:14, fontSize: 21}}></TextInput>
     
     <Text>Naam bedrijf {naambedrijf}</Text>
     <TextInput secureTextEntry={false} onChangeText={setNaamBedrijf} placeholder={naambedrijf} style ={{width: 300, height: 60, borderWidth: 1, borderRadius:14, fontSize: 21}}></TextInput>
     <Pressable onPress={createThreeButtonAlert} style={{ height: 60, backgroundColor: '#FFBF00', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 35, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
>


  <Text style= {{fontSize: 16, paddingRight: 50, color: 'white'}}>Opslaan</Text>
</Pressable>
     
     </View>


     </View>

    );
  }