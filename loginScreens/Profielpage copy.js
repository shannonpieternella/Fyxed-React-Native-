import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';
// import Carousel from '@khanshamshad32/carousel';



export default function Profielpagina({navigation, route}) {
   const {_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew} = route.params;
   const [tokenuser, setTokenUser] = useState('');
   const [db, setDb] = useState('');
   const [usernamepop, setUsernamepop] = useState('Anonieme klant');

   const goBack = () => {
      navigation.goBack();

  }


  useEffect(async () => {
   _retrieveData = async () => {
     try {
       const value = await AsyncStorage.getItem('pushToken');
       setTokenUser(value);
       const dbofficial = value.concat("", _id);
       setDb(dbofficial)
       // console.log('expo token loading 7 ' + await AsyncStorage.getItem('pushToken'));
       console.log('id available' + dbofficial + " seh " + db)
       if(await AsyncStorage.getItem('pushToken') === null ){
        console.log('no token id available' + dbofficial)
       }
       

     } catch (error) {
       // Error retrieving data
     }
   };

 _retrieveData()

 }, [])
  
   
  //  const dataSource = [
  //     {url: 'https://www.kappers.nl/files/shares/content/wvomWo_gjjWVf.jpeg', color: '#FE0404'},
  //     {url: 'https://www.kappers.nl/files/shares/content/wvomWo_gjjWVf.jpeg', color: '#522A73'},
  //     {url: 'https://www.kappers.nl/files/shares/content/wvomWo_gjjWVf.jpeg', color: '#008200'},
  //     {url: 'https://www.kappers.nl/files/shares/content/wvomWo_gjjWVf.jpeg', color: '#034223'},
  //     {url: 'https://www.kappers.nl/files/shares/content/wvomWo_gjjWVf.jpeg', color: '#015280'},
  //   ];
    
    return (

        // container met arrow
       <ScrollView style={{ backgroundColor:"white", height:1500  }}> 
       
       <View style={{width:"100%", justifyContent:"space-between", flexDirection:"row", marginLeft:25, marginTop:25}}>
          <Pressable onPress={() => goBack()}>
          <AntDesign style={{marginLeft:10}} name="arrowleft" size={26} color="#FFBF00" />
          </Pressable>
        
       <Image style={{width:30, height:30,borderRadius:100, marginRight:55}} source={require('../assets/fyxedicon.png')} />
       </View>
   
       <View style={{ height:600}}> 
   
     {/* profile picture */}
     <View style={{width:"100%", alignItems:"center", borderBottomWidth:0.2 , borderBottomColor:"black", height:260}}>
     <Image style={{width:150, height:150, marginTop:10,borderRadius:100}} source={{uri:Imagenew}} />
     <Text style={{color:"#FFBF00", fontSize:30, fontWeight:"bold", marginTop:20}}>{Bedrijfsnaam}</Text>
      </View> 
   
   
   {/* omschrijving */}
   <Pressable onPress={() =>{ 

       /* 1. Navigate to the Details route with params */
       navigation.navigate('chat', {
        _id,
        dbase: db,
        user2: tokenuser,
        bedrijf: Bedrijfsnaam,
        userpopup: usernamepop
      });
   }}>
   <View style={{width:"100%",marginTop:30, TextAlign:"center", marginLeft:40}}>
   <Text style={{fontWeight:"bold",fontSize:22,fontStyle:"Roboto"}}>Omschrijving</Text>
   <Text style={{fontSize:14,fontStyle:"Roboto", TextAlign:"center", width:"80%", marginTop:10}}>Voor alle vaders die bewust ervoor kiezen niet in het leven van hun kinderen te zijn. Haal hier je freshe coupe met maar liefst 30% korting</Text>
   </View>
   </Pressable>
     
    {/* fotos */}
   {/* <View style={{width:"100%", marginTop:30,}}>
   <Text style={{fontweight:"bold",fontSize:18,fontStyle:"Roboto", marginLeft:40}}>Foto's</Text>
   
   <View style={{flexDirection:"row"}}>
   <Image style={{width:97, height:73, marginTop:10, marginLeft:15}} source={require('../assets/fyxedicon.png')} />
   <Image style={{width:97, height:73, marginTop:10, marginLeft:20}} source={require('../assets/fyxedicon.png')} />
   <Image style={{width:97, height:73, marginTop:10, marginLeft:20}} source={require('../assets/fyxedicon.png')} />
   </View>
   
   <View style={{flexDirection:"row"}}>
   <Image style={{width:97, height:73, marginTop:10, marginLeft:15}} source={require('../assets/fyxedicon.png')} />
   <Image style={{width:97, height:73, marginTop:10, marginLeft:20}} source={require('../assets/fyxedicon.png')} />
   <Image style={{width:97, height:73, marginTop:10, marginLeft:20}} source={require('../assets/fyxedicon.png')} />
   </View>
   </View> */}




    {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
       <Carousel
       dataSource={dataSource}
       onItemPress={item => {
         console.log(item);
       }}
       containerDim={{height: 200, width: 350}}
       itemDim={{width: 100, height: 110}}
       radius={100}
       />
    </View> */}

   
   {/* Details */}
   <View style={{width:"100%", height:"100%", marginLeft:40 , paddingTop:30}}>
   
   
   <View style={{paddingTop:10}}>
   <Text style={{fontWeight:"bold",fontSize:22,fontStyle:"Roboto"}}>Details :</Text>
   <Text style={{fontSize:14,fontStyle:"Roboto", marginTop:15}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Adres:</Text>       {Straatnaam}</Text>
   <Text style={{fontSize:14,fontStyle:"Roboto", marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Locatie:</Text>    {Stad}</Text>
   <Text style={{fontSize:14,fontStyle:"Roboto", marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>E-mail:</Text>      {Email_id}</Text> 
   <Text style={{fontSize:14,fontStyle:"Roboto", marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Website:</Text>   {Telefoonnummer}</Text>
   </View>
   

{/* Openingstijden */}
{/* <View style={{ width:"80%", marginTop:30,}}>
<Text style={{fontWeight:"bold",fontSize:22,fontStyle:"Roboto"}}>Openingstijden</Text>
<Text style={{marginTop:15, textAlignVertical:"auto"}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Maandag: </Text>       Gesloten</Text>
<Text style={{marginTop:5,}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Dinsdag: </Text>         12:00 tot 21:00</Text>
<Text style={{marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Woensdag: </Text>     12:00 tot 21:00</Text>
<Text style={{marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Donderdag:  </Text>   12:00 tot 21:00</Text>
<Text style={{marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Vrijdag:  </Text>          12:00 tot 21:00</Text>
<Text style={{marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Zaterdag: </Text>       12:00 tot 21:00</Text>
<Text style={{marginTop:5}}><Text style={{fontWeight:"bold",fontSize:14,fontStyle:"Roboto"}}>Zondag:  </Text>         Gesloten</Text>


</View> */}



{/* contactbutton */}
{/* 

   <Pressable onPress={() => { console.log("grilled cheese") }} >
   <View style={{marginTop:35, width:"80%", justifyContent:"center", alignItems:"center" }}>
   <View style={{height:55, width:320, backgroundColor:"#FFBF00", justifyContent:"center",borderRadius:20}}>
   <Text style={{color:"white", textAlign:"center",fontSize:14,fontStyle:"Roboto",fontWeight:"bold"}}>Contact</Text>
   </View>
   </View>
   </Pressable> */}
   
   <View style={{marginTop:30 , width:"80%", justifyContent:"center"}}>

   </View> 
{/* {/*     */}
   </View>
   
   
   
   
   </View>
   </ScrollView>
       
       );
     }