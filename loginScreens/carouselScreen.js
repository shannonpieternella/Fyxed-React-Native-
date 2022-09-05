import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import reactDom from 'react-dom';
import { Center } from 'native-base';
import ImagedCarouselCard from "react-native-imaged-carousel-card";

// import  from './formbedrijf';

export default function CarouselScreen() {
    return (
    
    // container met arrow
    <View style={{backgroundColor:"black", height:"100%"}}> 
    <Image style={{width:25, height:25, marginTop:30, marginLeft:10,}} source={require('../assets/arrow.png')} />
  
    <ImagedCarouselCard />


    </View> 
    
    );
  }

  


      
    


