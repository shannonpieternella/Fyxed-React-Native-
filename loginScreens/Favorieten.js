import { StyleSheet, Text, View, Image, TextInput, Button, Touchable, Pressable, ScrollView, ImageBackground,FlatList } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons  } from '@expo/vector-icons';
// import DropShadow from "react-native-drop-shadow";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import { useFocusEffect } from '@react-navigation/native';

// import { Icon } from 'react-native-elements';
// import { color } from 'react-native-elements/dist/helpers';
// import reactDom from 'react-dom';
// import { Center, Column } from 'native-base';
import AppLoading from 'expo-app-loading';
import {
    useFonts,
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  }
  from '@expo-google-fonts/poppins';
  import Search from './Search'
  import axios from 'axios';


export default function Favorieten() {
  const [db, setDb] = useState('');

 

  useFocusEffect(
    React.useCallback(async() => {
      const usertok = await AsyncStorage.getItem('pushToken');
    const res = await axios.get(`https://fyxedsearch.herokuapp.com/posts/favoritelist/${usertok}`)
console.log('Res', res.data); 
    setDb(res.data)
      console.log('focusssed!')
  }, []),
  );
  
  const DATA = [
    {
      id: 'cd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '4ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '88694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  
  ];


    //   =====design flatlist favorieten=====

    const renderItem = ({ item }) => (
     
    <View style={{width:325,height:100,alignSelf:"center", backgroundColor:"#FFFFFF",marginTop:10, borderColor:"black", flexDirection:"row" ,borderRadius:5, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11,}}>
<View style={{}}>
<Image style={{width:88 , height:'100%', borderTopLeftRadius:5,borderBottomLeftRadius:5}}  source={{
          uri: item.picture,
        }}></Image>
</View>
<View style={{flexDirection:"column", height:100, flex:1}}>
<View style={{ flexDirection:"row", justifyContent: 'space-between'}}>
<Text style={{Color:"black",marginTop:10 ,fontSize:16, fontWeight:"bold", fontFamily:"Poppins_600SemiBold", marginLeft:10, alignSelf:"center"}}>{item.companynaam}</Text>
<Ionicons style={{marginTop:15,marginRight:10}} name="heart" size={20} color="#FFBF00"></Ionicons>
</View>
<View style={{marginLeft:8, flexDirection:"row", alignItems:"center",height:40  }}>
<Ionicons style={{ MarginLeft:10, alignSelf:"center"}} name="location-sharp" size={20} color="black"></Ionicons>
<Text style={{color:"black", fontSize:14,marginLeft:10 }}>{item.stad},NL</Text>
</View>
</View>
</View>
 

 
  );

    let [fontsLoaded] = useFonts({
        Poppins_100Thin,
        Poppins_100Thin_Italic,
        Poppins_200ExtraLight,
        Poppins_200ExtraLight_Italic,
        Poppins_300Light,
        Poppins_300Light_Italic,
        Poppins_400Regular,
        Poppins_400Regular_Italic,
        Poppins_500Medium,
        Poppins_500Medium_Italic,
        Poppins_600SemiBold,
        Poppins_600SemiBold_Italic,
        Poppins_700Bold,
        Poppins_700Bold_Italic,
        Poppins_800ExtraBold,
        Poppins_800ExtraBold_Italic,
        Poppins_900Black,
        Poppins_900Black_Italic,
      }); 
    
      let fontSize = 24;
      let paddingVertical = 6;
    
      if (!fontsLoaded) {
        return <AppLoading />;
      } else {
    





    return (
<View style={{ backgroundColor:"white", width:"100%", height:"100%"}}>
<ImageBackground style={{width:"100%",height:"100%", marginTop:40}} source={require('../assets/background.png')}>


{/*====== logo settings ====== */}

<View style={{width:"100%", height:20, alignItems:"center",marginTop:5, justifyContent: 'center' }}>
<Image style={{width:53, height:14,}} source={require('../assets/fyxedlogo.png')}></Image>
</View>

<View style={{flexDirection:"row", width: '100%', justifyContent:'center'}}>
<Text style={{fontSize:18, textAlign:"center", marginTop:10, fontFamily:"Poppins_900Black",}}>Favorieten</Text>
{/* <View style={{ width:"100%", justifyContent:"center", alignItems:"center",}}>
<View style={{width:25, height:25,borderRadius:100, backgroundColor:"white", alignItems:"center", marginRight:170,}}>
<MaterialIcons style={{marginTop:2}} name="settings" size={20} color="black" />
</View>

</View> */}
</View>

{/* ====== liked page ===== */}

<View style={{width:"100%", height:"100%", marginTop:50, flexDirection:"row"}}>
<FlatList
                data={db}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsScrollIndicator={false}

              />
              </View>

{/* <View style={{width:275,height:87,alignContent:"center", backgroundColor:"#FFFFFF",marginTop:70, borderColor:"black",marginLeft:60, flexDirection:"row" ,borderRadius:5, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11,}}>
<View style={{}}>
<Image style={{width:88 , height:88, borderTopLeftRadius:5,borderBottomLeftRadius:5}} source={require('../assets/RIOleringbedrijf.jpg')}></Image>
</View>
<View style={{flexDirection:"column", height:100}}>
<View style={{ flexDirection:"row"}}>
<Text style={{Color:"black",marginTop:20 ,fontSize:16, fontWeight:"bold", fontFamily:"Poppins_600SemiBold", marginLeft:18, alignSelf:"center"}}>RIOleringbedrijf</Text>
<Ionicons style={{marginLeft:15, marginTop:7}} name="heart" size={20} color="#FFBF00"/>
</View>
<View style={{justifyContent:"flex", flexDirection:"row", alignItems:"center", marginLeft:18,height:40  }}>
<Ionicons style={{ MarginLeft:18, alignSelf:"center"}} name="location-sharp" size={20} color="black"></Ionicons>
<Text style={{color:"black", fontSize:14,marginLeft:10 }}>de Glind,NL</Text>
</View>
</View>
</View> */}














</ImageBackground>
</View>
);
    }
}

const styles = StyleSheet.create({
        container: {
          flex: 1,
  
          
        },
        item: {
          backgroundColor: '#FFFFFF10',
          padding: 1,
          marginVertical: 8,
          marginHorizontal: 1,
        },
        title: {
          fontSize: 32,
        },
      });