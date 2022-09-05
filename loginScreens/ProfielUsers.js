import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import reactDom from 'react-dom';
import { Center } from 'native-base';
// import  from './formbedrijf';

export default function ProfielUsers() {
    return (
    
    // container met arrow
    <View style={{backgroundColor:"black", height:"100%"}}> 
    <Image style={{width:25, height:25, marginTop:30, marginLeft:10,}} source={require('../assets/arrow.png')} />
  

  {/* profielfoto */}
    <View style={{height:200, width:"100%",  alignItems:"center", justifyContent:"center"}}>
    <Image style={{width:85, height:75,}} source={require('../assets/profilepicture.jpg')} />
    </View>
    

    {/* Naam en locatie */}
    <View style={{}}>
    <Text style={{color:"white", textAlign:"center", fontSize:22, fontWeight:"bold" }}>Bedrees Horsjum</Text>
    <Text style={{color:"white", textAlign:"center", fontSize:14,}}>Locatie: Narnia</Text>
    </View>


  {/* email */}
  <View style={{marginTop:50,}}>
    <Text style={{color:"white", textAlign:"center", fontSize:18, fontWeight:"bold" }}>Emailadres: </Text>
    <Text style={{color:"white", textAlign:"center", fontSize:12,}}>Bedrees@horsjum.hert</Text>
    </View>


{/* button */}
<Pressable onPress={() => { console.warn("grilled cheese") }} >
<View style={{marginTop:150, width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{height:45, width:195, backgroundColor:"#FFBF00", justifyContent:"center",borderRadius:20}}>
<Text style={{color:"white", textAlign:"center",}}>Edit Profile</Text>
</View>
</View>
</Pressable>

    </View> 
    
    );
  }

  


      
    


