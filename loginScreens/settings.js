import { StyleSheet, Text, View, Image, TextInput, Button, Touchable, Pressable, ScrollView, ImageBackground,FlatList } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons, MaterialCommunityIcons  } from '@expo/vector-icons';
// import DropShadow from "react-native-drop-shadow";
import { shadowOffset } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
// import { Icon } from 'react-native-elements';
// import { color } from 'react-native-elements/dist/helpers';
// import reactDom from 'react-dom';
// import { Center, Column } from 'native-base';
import AppLoading from 'expo-app-loading';
import { useNavigation } from '@react-navigation/native';

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
  // import Favorieten from '../pages/Favorieten';

 
  

  export default function Settings() {
    
    const navigation = useNavigation(); 

    const goBack = () => {

      navigation.goBack();
    }
      
      
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

// ===== background =====
<View style={{ backgroundColor:"white", width:"100%", height:"100%"}}>


{/* ===== backicon & logo ===== */}
<Pressable onPress={goBack}>
<View style={{width:"100%", height:100, flexDirection:"row"}}>
<Ionicons style={{marginTop:30, marginLeft:20}} name="chevron-back-circle" size={35} color="black"/>
<Image style={{width:56, height:15, marginLeft:110, marginTop:50}} source={require('../assets/fyxedlogo.png')}></Image>
</View>
</Pressable>

{/* ====== settings ===== */}
<View>
    <Text style={{color:"black", fontSize:28, fontFamily:"Poppins_700Bold", marginLeft:40}}>Settings</Text>
</View>

{/* ===== settings options ===== */}

<View style={{width:330,height:160,alignSelf:"center",  backgroundColor:"#FFFFFF",marginTop:50, borderColor:"black", flexDirection:"column", borderRadius:5, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 5,
},
shadowOpacity: 0.36,
shadowRadius: 6.68,

elevation: 11,}}>
<View style={{flexDirection:"row", borderColor:"#00000020", borderBottomWidth:0.5}}>
<Ionicons style={{marginLeft:15, marginTop:4}} name="ios-person-circle-outline" size={30} color="black"/>
<Text style={{color:"black",fontSize:16, fontFamily:"Poppins_400Regular", marginLeft:30, marginTop:9 }}>Profiel</Text>
<MaterialIcons style={{marginLeft:180, marginTop:7}} name="keyboard-arrow-right" size={25} color="black"/>
</View>
<View style={{flexDirection:"row", marginTop:5, borderColor:"#00000020", borderBottomWidth:0.5}}>
<MaterialIcons style={{marginLeft:15, marginTop:4}} name="privacy-tip" size={30} color="black"/>
<Text style={{color:"black",fontSize:16, fontFamily:"Poppins_400Regular", marginLeft:30, marginTop:9 }}>Privacy policy</Text>
<MaterialIcons style={{marginLeft:120, marginTop:7}} name="keyboard-arrow-right" size={25} color="black"/>
</View>
<View style={{flexDirection:"row", marginTop:5, borderColor:"#00000020", borderBottomWidth:0.5}}>
<MaterialCommunityIcons style={{marginLeft:15, marginTop:4}} name="file-document-outline" size={30} color="black"/>
<Text style={{color:"black",fontSize:16, fontFamily:"Poppins_400Regular", marginLeft:30, marginTop:9 }}>Terms of service</Text>
<MaterialIcons style={{marginLeft:100, marginTop:7}} name="keyboard-arrow-right" size={25} color="black"/>
</View>
<View style={{flexDirection:"row", marginTop:5}}>
<Ionicons style={{marginLeft:15, marginTop:4}} name="ios-chatbubbles-outline" size={30} color="black"/>
<Text style={{color:"black",fontSize:16, fontFamily:"Poppins_400Regular", marginLeft:30, marginTop:9, }}>Support</Text>
<MaterialIcons style={{marginLeft:165, marginTop:7}} name="keyboard-arrow-right" size={25} color="black"/>
</View>
</View> 

{/* ===== background lines ===== */}
<ImageBackground style={{width:"100%",height:900, marginTop:50}} source={require('../assets/background.png')}>
</ImageBackground>
</View>
  
  
  
  );
    }
    }