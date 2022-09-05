import { StyleSheet, Text,Alert, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable, TouchableOpacity, FlatList, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import reactDom from 'react-dom';
import { Center, Flex, Row, ScrollView } from 'native-base';
import { AntDesign, MaterialIcons, Ionicons  } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
// import activationPage from './activationPage';
import React, { useEffect, useState, useRef } from "react";
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {fetchAllNfts, filterNfts, fetchSearchNfts, fetchFilterStad, Iconcheck} from '../src/endpoints'
import axios from 'axios';
import { Entypo } from '@expo/vector-icons';
import GeneralStarExample from './ratingScreen';
import StarRating from 'react-native-star-rating';
import { Feather } from '@expo/vector-icons';
import { ALERT_TYPE, Dialog, Root, Toast } from 'react-native-alert-notification';


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
} from '@expo-google-fonts/poppins';



// import  from './formbedrijf';

export default function Profielpagina({navigation, route}) {
  const [result, setResult] = useState(null);
  const {_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew, $numberDecimal, verification, gallerij, Pictures, agenda, Beschrijving, maplink} = route.params;
  const [tokenuser, setTokenUser] = useState('');
  const [db, setDb] = useState('');
  const [usernamepop, setUsernamepop] = useState('Anonieme klant');
  const [icondb, setIcondb] = useState();
  const [refresh, setRefresh] = useState(false);
  const [dbgallerij, setdbgallerij] = useState();
  const [starCount, setstarCount] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [picture, setPicture] = useState(false);
  const [tokenurl, setExpoToken] = useState(false);
  const [iduser, setUserToken] = useState(false);
  const [agendacount, setagendacount] = useState();
  const [chatcount, setchatcount] = useState();
  const [limitchatcount, setlimitchatcount] = useState();
  const [limitagendacount, setlimitagendacount] = useState();
  const [geabonneerd, setGeabonneerd] = useState();
  const [inboxCount, setinboxCount] = useState();
  const [wwcheck, setwwcheck] = useState();

  useEffect(async() => {


    // const pushtokenuser = await AsyncStorage.getItem('pushToken');
    const voornaam = await AsyncStorage.getItem('voornaam')
     const achternaam = await AsyncStorage.getItem('achternaam')
      const telefoon = await AsyncStorage.getItem('telefoonnummer')
      const email = await AsyncStorage.getItem('email')

      
console.log('voornaam 1 ' + voornaam );
console.log('achternaam 1 ' + achternaam );
console.log('telefoonnr 1 ' + telefoon );
console.log('email 1 ' + email );
console.log('Id 111 ' + await AsyncStorage.getItem('iduser') );

const payload = {
  id: await AsyncStorage.getItem('iduser')
 

} 

const userPost = await axios.post('https://fyxedsearch.herokuapp.com/posts/gebruiker', payload)
console.log('Response333 ' + userPost.data._id);
  console.log('Response333 ' + userPost.data.Voornaam);
  console.log('Response333 ' + userPost.data.Achternaam);
  console.log('Response333 ' + userPost.data.Telefoonnummer);
  console.log('Response333 ' + userPost.data.Email_id);
  console.log('Response333 ' + userPost.data.wachtwoordsaved);
  console.log('AsyncResponsecode333 ' + await AsyncStorage.getItem('code'));
  
  if(userPost.data.wachtwoordsaved == await AsyncStorage.getItem('code')){
setwwcheck(true);
console.log("ww check 1" + wwcheck)
  }else{
    
    setwwcheck(false);
    console.log("ww check " + wwcheck)
  }


},[])

  useEffect(async () => {
    console.log("id sua " + _id)
const payload = {
id:_id

}

    const saveresult = await axios.post('https://fyxedsearch.herokuapp.com/posts/checklimitscompany', payload)

    console.log('Response!! ' + JSON.stringify(saveresult.data[0].agendacount));
    console.log('Response!! ' + JSON.stringify(saveresult.data[0].chatcount));
    console.log('Response!! ' + JSON.stringify(saveresult.data[0].limitchatcount));
    console.log('Response!! ' + JSON.stringify(saveresult.data[0].limitagenda));

    setagendacount(saveresult.data[0].agendacount)
    setchatcount(saveresult.data[0].chatcount)
    setlimitagendacount(saveresult.data[0].limitagenda)
    setlimitchatcount(saveresult.data[0].limitchatcount)
  },[])

  useEffect(async()=>{
    const value = await AsyncStorage.getItem('iduser');
    console.log('check value ' + value); 
    const payload = {
      id: value
      
  
    }
 const checkusercompany = await axios.post('https://fyxedsearch.herokuapp.com/posts/gebruiker', payload)
if (checkusercompany.data.ondernemer != false){
await AsyncStorage.setItem('idondernemer', checkusercompany.data.ondernemerId);
console.log('user is company now ' + checkusercompany.data.ondernemerId)
}else{
console.log('user is not a company ' + checkusercompany.data.ondernemer + " ID " + checkusercompany.data.ondernemerID)


}
  },[])

  useEffect(async () => {
    const emailUser = await AsyncStorage.getItem('email');
    const voornaamUser = await AsyncStorage.getItem('voornaam');
    const achternaamUser = await AsyncStorage.getItem('achternaam');
    const telefoonUser = await AsyncStorage.getItem('telefoonnummer');
    const pushtokenUser = await AsyncStorage.getItem('pushToken');
  
    const payload = {
      emailadres: emailUser,
      companysid: _id,
      pushtoken: pushtokenUser,
      lastname: achternaamUser,
      naam: voornaamUser
  
   }
  
   console.log('Email id ' + emailUser)
   
   console.log('companysid ' + _id)
  
  
   const saveresult = await axios.post('https://fyxedsearch.herokuapp.com/posts/checkofgeabboneerd', payload)
console.log("saveresult " + saveresult.data)
   if(saveresult.data == true){

  setGeabonneerd(true)
   }else{
    setGeabonneerd(false)
   }




  },[])


 const abonneerKnop = async () => {


  const emailUser = await AsyncStorage.getItem('email');
  const voornaamUser = await AsyncStorage.getItem('voornaam');
  const achternaamUser = await AsyncStorage.getItem('achternaam');
  const telefoonUser = await AsyncStorage.getItem('telefoonnummer');
  const pushtokenUser = await AsyncStorage.getItem('pushToken');

  const payload = {
    emailadres: emailUser,
    companysid: _id,
    pushtoken: pushtokenUser,
    lastname: achternaamUser,
    naam: voornaamUser

 }

 console.log('Email id ' + emailUser)
 
 console.log('companysid ' + _id)


 await axios.post('https://fyxedsearch.herokuapp.com/posts/abonnees', payload)
    

   }



  useEffect(async () => {
   
      const checkPushTokenExists = await AsyncStorage.getItem('iduser');
    
     
      console.log(checkPushTokenExists + ' iduser gino')
      if(checkPushTokenExists == undefined || checkPushTokenExists == null ){
       
      }else{
      try {
        const value = await AsyncStorage.getItem('pushToken');
        const valueuserid = await AsyncStorage.getItem('iduser');


        setUserToken(valueuserid);
        console.log('check value url ' + valueuserid);  
  
      } catch (error) {
        console.log(error)
      }
    };
  
 
  
  }, [])
  

  useEffect(async() => {
  const response = await axios.get('https://fyxedsearch.herokuapp.com/posts/gallerij')
  setdbgallerij(response.data) 
 console.log('veriii' + verification)
 console.log('Pictures ' + Pictures)

}, [])

const DATA3 = [
  {
    id: 1,
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/2048px-LEGO_logo.svg.png',
  },
  {
    id: 2,
    link: 'https://media.nu.nl/m/ly8xi6vapk2l_xwd1280.jpg/instagram-vernieuwt-uiterlijk-en-logo.jpg',
  },
  {
    id: 3,
    link: 'https://img.freepik.com/psd-gratis/logomodel-op-grijze-muur_35913-2122.jpg',
  },
 
];



const renderItem = ({ item }) =>

(
       
      <>

<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
<View style={{height: 225, width:350,alignItems:'center', justifyContent:'center', backgroundColor: 'white', borderRadius:14, alignSelf:'center', marginTop: 250}}>
{starCount < 1 ? <Text style={{marginBottom:25, fontSize: 21, fontWeight: 'bold'}}> Bedoordeel deze ondernemer </Text>
: <Text style={{marginBottom:25, fontSize: 21, fontWeight: 'bold'}}> Bedankt voor je rating! </Text>}
<StarRating
disabled={false}
maxStars={5}
rating={starCount}
selectedStar={(rating) => onStarRatingPress(rating)}
  style={{marginBottom:25}}     
       />
       <TouchableOpacity style={{marginTop:25}} onPress={()=> setModalVisible(false)}><Text>Close</Text></TouchableOpacity>
</View>


      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          // Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible2);
        }}
      >
<View style={{height: 225, width:350,alignItems:'center', justifyContent:'center', backgroundColor: 'white', borderRadius:14, alignSelf:'center', marginTop: 250}}>
{/* <Image style={{width:150, height:150,borderRadius:100}} source={{uri:picture}} /> */}
      
       <TouchableOpacity style={{marginTop:25}} onPress={()=> setModalVisible2(false)}><Text>Close</Text></TouchableOpacity>
</View>


      </Modal>

      <Pressable onPress={() => {
        // setModalVisible2(true)
        setPicture(Pictures)
        } }>
    <View style={{width:'20%', marginLeft:5, flexDirection:"row", alignItems:"center"}}>
    {_id == item.IDbedrijf && 
     <View>
    <Image style={{width:70, height:70,borderRadius:100}} source={{uri:item.Gallerij}} />
 </View>
}

    </View>
    </Pressable> 

  </>
     );


 

  const _handlePressButtonAsync = async () => {
    const idklant = await AsyncStorage.getItem('iduser');
    let dynurl = _id; 
    var string = Bedrijfsnaam;
var newString = string.replace(" ", "_");
var newString2 = string.split(' ').join('_');
console.log(" Naam new " + newString2);
    const linknew = `https://fyxed.nl/onboard/?id=${dynurl}`+`&bedrijfsnaam=${newString2}`+`&idklant=${idklant}`
    console.log("link new " + linknew)
    let result = await WebBrowser.openBrowserAsync(linknew);
    
    setResult(result);
  };

  const goBack = () => {
    navigation.goBack();

}

const sendLink = async () => {
  const mail = await AsyncStorage.getItem('email');
  const idklant = await AsyncStorage.getItem('iduser');
  var string = Bedrijfsnaam;
var newString = string.replace(" ", "_");
var newString2 = string.split(' ').join('_');
console.log(" Naam new " + newString2);
  const linknew = 'https://fyxed.nl/klantagenda' + '?token='+mail+`&id=${_id}`+`&idklant=${idklant}`+`&naambedrijf=${newString2}`
  let result = await WebBrowser.openBrowserAsync(linknew);
console.log('link seh ' + linknew)
}

const postIcon = async (companyid, companyname) => {
  const payload = {
    favorite: true,
    companyid: companyid,
    usertoken: await AsyncStorage.getItem('pushToken'),
    companynaam: companyname,
    stad: Stad,
    picture: Imagenew

  }
await axios.post('https://fyxedsearch.herokuapp.com/posts/favorites', payload)
setIcondb(true)

if(refresh == false) {
  setRefresh(true)
  console.log(refresh)
}else{
  setRefresh(false)
  console.log(refresh)


}
}

 const onStarRatingPress = async (rate) => {
    setstarCount(rate);
    console.log('starcount ' + rate)

    const mail = await AsyncStorage.getItem('email');
const payload = {
  
  rating: rate,
            companyid: _id,
            useremail: mail,
            companynaam: Bedrijfsnaam


}

   await axios.post('https://fyxedsearch.herokuapp.com/posts/rates', payload)
  }

  const linkmap = async () =>{
    let result = await WebBrowser.openBrowserAsync(maplink);


  }

const DeleteIcon = async (companyid, companyname) => {
  const usertok = await AsyncStorage.getItem('pushToken');
 const res = await axios.get(`https://fyxedsearch.herokuapp.com/posts/checkfavorite/${usertok}/${companyname}`)
console.log('Res', res.data); 
setIcondb(false)
if(refresh == false) {
  setRefresh(true)
}else{
  setRefresh(false)
}

  }



  //check in flatlist if fav is in db to show liked icon
  useEffect(async() => {

    const usertok = await AsyncStorage.getItem('pushToken');
    console.log("icontok", usertok, Bedrijfsnaam)

    axios.get(Iconcheck(await AsyncStorage.getItem('pushToken'),Bedrijfsnaam)).then(res => {
      console.log("icondata", res.data)

      setIcondb(res.data)
      // setLoading(false)
      
    }).catch(err => {
      // setLoading(false)
      // setError(err)
    })
  }, [])

  useEffect(() => {
    console.log("iconCHECKs", icondb)

   
  }, [icondb])
  
 console.log("iconcheck is", icondb)

 useEffect(async() => {
  const savediduser = await AsyncStorage.getItem('iduser');
  const inboxobj={
    "klantid":savediduser,
    "ondernemerid":_id



}
  const checkCount = await axios.post('https://fyxedsearch.herokuapp.com/posts/checkinboxklant', inboxobj);
  console.log('count db inbox ' + checkCount.data);
  setinboxCount(checkCount.data)
}, [])


useEffect(async () => {
  _retrieveData = async () => {
    console.log('pushtoken' + await AsyncStorage.getItem('iduser'))
    try {
      const value = await AsyncStorage.getItem('iduser');
      setTokenUser(value);
      const dbofficial = value.concat("", _id);
      setDb(dbofficial)
      console.log('id available' + dbofficial + " seh " + db)
      if(await AsyncStorage.getItem('iduser') === null ){
       console.log('no user id available' + dbofficial)
      }
      

    } catch (error) {
      // Error retrieving data
    }
  };

_retrieveData()

}, )

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
      <Root>
 <ScrollView style={{height:1000,}}>    
    {/* // container met arrow & hart */}
<View style={{backgroundColor:"white", height:'100%', width:'100%',alignItems:"center"}}> 
      <ImageBackground style={{width:"100%", height:"120%", marginTop:-25, resizeMode:"stretch", borderBottomRightRadius:0}} source={require('../assets/backgroundprofile.png')}>
     <View style={{marginTop:50, width:325, alignSelf:"center", height:50, justifyContent:"space-between", flexDirection: "row", alignItems:"center"}}>
        <Pressable onPress={goBack}>
        <Ionicons style={{marginRight:5, marginTop:5}} name="chevron-back-circle" size={35} color="white"/>
        </Pressable>

{/* {icondb == true ?
        <Pressable onPress={()=> DeleteIcon(_id, Bedrijfsnaam)}>
        <View style={{backgroundColor:"red", height:30, width:30, borderRadius:100, marginTop:5,justifyContent:"space-between"}}>
        <Ionicons style={{marginLeft:2.5, marginTop:2.5}} name="heart-outline" size={25} color="#FFBF00"/>
      </View>           
        </Pressable>: 
        <Pressable onPress={()=> postIcon(_id, Bedrijfsnaam)}>
        <View style={{backgroundColor:"#FFFFFF", height:30, width:30, borderRadius:100, marginTop:5,justifyContent:"space-between"}}>
        <Ionicons style={{marginLeft:2.5, marginTop:2.5}} name="heart-outline" size={25} color="#FFBF00"/>
      </View></Pressable>
        } */}
    



  </View>

  {/* Bedrijfsnaam */}
  <View style={{marginTop:80,}}>
    <Text style={{color:"white", textAlign:"left", marginLeft:50 , marginTop:20,fontSize:40, fontWeight:"bold", fontFamily:'Poppins_600SemiBold'}}>{Bedrijfsnaam}</Text>
  </View>



{/* button */}
  <View style={{marginTop:15, width:"100%",justifyContent:"center", flexDirection:"row"}}>
    <View style={{height:45, width:180, backgroundColor:"white", display:"flex",justifyContent:"space-evenly",flexDirection:"row",borderRadius:20,shadowColor: "#000",
        shadowOffset: {
      	width: 0,
	      height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,}}>
      <Ionicons style={{marginTop:5}} name="location-outline" size={30} color="black"/> 
      <Text style={{color:"black", textAlign:"center", fontSize:18,fontWeight:"bold", fontFamily:'Poppins_400Regular',marginTop:10, marginLeft:-10}}>{Stad}, NL</Text>
  
   
  </View>

{geabonneerd == true && 
<Pressable onPress={async()=> {
  const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
  const checkPushTokenExists2 = await AsyncStorage.getItem('iduser');
   console.log(checkPushTokenExists + ' Pushtoken')
 
   if(checkPushTokenExists == undefined || checkPushTokenExists == null){
    Dialog.show({
      type: ALERT_TYPE.WARNING,
      title: 'Pushnotificaties staan uit',
      textBody: 'Verwijder en installeer de app opnieuw en accepteer pushnotificaties om deze functie te kunnen gebruiken!',
      button: 'close',
    })}else{
      if(checkPushTokenExists2 == undefined || checkPushTokenExists2 == null){
        Dialog.show({
          type: ALERT_TYPE.WARNING,
          title: 'Creer eerst een profiel',
          textBody: 'Maak eerst een profiel aan om te kunnen abonneren in de menu.',
          button: 'close',
        })
      }else{
        abonneerKnop()
        setGeabonneerd(false)

      }

     }
}}>
  <View style={{width: 120, height: 35, marginLeft:35, marginTop:5, backgroundColor:"black", borderRadius:9}}>
<Text style={{color:"white", textAlign:"center", marginTop: 9}}>Geabonneerd</Text>
</View>
  
  </Pressable>}

  {geabonneerd == false &&
  <Pressable onPress={async()=> {
    const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
    const checkPushTokenExists2 = await AsyncStorage.getItem('iduser');
    console.log(checkPushTokenExists + ' Pushtoken')

    if(checkPushTokenExists == undefined || checkPushTokenExists == null){
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Pushnotificaties staan uit',
        textBody: 'Verwijder en installeer de app opnieuw en accepteer pushnotificaties om deze functie te kunnen gebruiken!',
        button: 'close',
      })}else{
  
    if(checkPushTokenExists2 == undefined || checkPushTokenExists2 == null ){
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Creer eerst een profiel',
        textBody: 'Maak eerst een profiel aan om te kunnen abonneren in de menu.',
        button: 'close',
      })}else{
    abonneerKnop()
    setGeabonneerd(true)
  }}}
    }>
<View style={{width: 120, height: 35, marginLeft:35, marginTop:5, backgroundColor:"black",borderRadius:9}}>
<Text style={{color:"white", textAlign:"center", marginTop: 9}}>Abonneer</Text>
</View>
</Pressable>}
  
</View>
 



{/* gallerij */}



<View style={{alignSelf:"center", backgroundColor:"white", height:80, width:'80%', borderRadius:20, marginTop:10,
    shadowColor: "#000",
  shadowOffset: {
	width: 0,
	height: 5,
},
  shadowOpacity: 0.36,
  shadowRadius: 6.68}}>
{Pictures === "true" &&
    <FlatList
                horizontal
                data={dbgallerij}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}

              /> }

{Pictures === "false" &&
<View>
<View style={{height:30, width:'100%',marginTop: 10, justifyContent: "space-around", flexDirection:"row"}}>
  <Text style={{color:"black", textAlign:"left", fontSize:14, fontWeight:"bold", fontFamily:'Poppins_600SemiBold',}}>Gallerij</Text>
  <Text style={{color:"black", textAlign:"right", marginRight:10,fontSize:10,}}>Zie alle →</Text>
  </View>

<View>
  <Text style={{color:"#6D6B6C", textAlign:"center", fontSize:18}}>Nog geen foto's beschikbaar</Text>
  </View>
  </View>
  }
  

</View>
  
              

{/* ICON RATING */}


<View style={{height:100, width:360, flexDirection:"row", alignSelf:"center", alignItems:"center", justifyContent:"space-around"}}>
              

<View>
<Pressable onPress={() => setModalVisible(true)}>
    <View style={{backgroundColor:"#EDEDED", justifyContent:'center',height:50, width:80, borderRadius:10, alignItems:"baseline", marginTop:20,
      shadowColor: "#000",
      shadowOffset: {
	    width: 0,
	    height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68, flexDirection:'row'}}>
        
  <Ionicons style={{marginTop:10,}} name="star-half-sharp" size={20} color="#FFBF00"/> 
      <Text>{$numberDecimal}</Text>
      {/* <Text style={{color:"#6D6B6C", fontSize:9, textAlign:"center"}}>0 Ratings</Text> */}

</View>



</Pressable>

      </View>




   

              
{/* ICON NOT VERIFIED */}

  {verification == false &&
  <View style={{backgroundColor:"#EDEDED", height:50, width:80, borderRadius:10,  marginTop:20,borderWidth:1, borderColor:'blue', 
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,}}>
    <Ionicons style={{marginTop:8, alignSelf:"center"}} name="close-sharp" size={20} color="red"/> 
    <Text style={{fontSize:10, textAlign:"center"}}>not verified</Text>
   </View>}

   {verification == true &&
  <View style={{backgroundColor:"#EDEDED", height:50, width:80, borderRadius:10 ,marginTop:20, 
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68}}>
<Entypo name="check" size={24} color="green" style={{marginTop: 8, alignSelf:'center'}}/>
    <Text style={{fontSize:10, textAlign:"center"}}>Verified</Text>
   </View>}


{/* calender NB */}
<Pressable onPress={async() =>{
 


     const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
     const checkPushTokenExists2 = await AsyncStorage.getItem('iduser');
     console.log(checkPushTokenExists + ' Pushtoken')
     console.log(checkPushTokenExists2 + ' Pushtoken 2')
   
     if(checkPushTokenExists == undefined || checkPushTokenExists == null ){
       Dialog.show({
         type: ALERT_TYPE.WARNING,
         title: 'Pushnotificaties staan uit',
         textBody: 'Verwijder en installeer de app opnieuw en accepteer pushnotificaties om deze functie te kunnen gebruiken!',
         button: 'close',
       })}else{


        if(checkPushTokenExists2 == undefined || checkPushTokenExists2 == null){
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Creer eerst een profiel',
            textBody: 'Maak eerst een profiel aan om te kunnen abonneren in de menu.',
            button: 'close',
          })
        }else{
      
  if(agendacount < limitagendacount){
    if(wwcheck == true){
      sendLink()

    }else{
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: 'Wachtwoord onjuist',
        textBody: 'Vul de juiste wachtwoord in op je profiel pagina om gebruik te kunnen maken van deze functie.',
        button: 'close',
      })
    }
    

  }else{

    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Ondernemer vol',
      textBody: 'Sorry, de ondernemer is momenteel erg druk!',
      button: 'close',
    })
    const payload = {
      "idbedrijf":_id,
      "limiettitle":"Een klant probeert een afspraak te boeken!",
      "limietmessage":"Upgrade je account limiet en mis geen potentiele boekingen!"
      }
  await axios.post('https://fyxedsearch.herokuapp.com/posts/limitbedrijf', payload)
  }
        }

}
}
  
  }>
    <View style={{backgroundColor:"#EDEDED", height:50, width:80, borderRadius:10, marginTop:20, justifyContent:"space-around", display:"flex", alignItems:"center",
      shadowColor: "#000",
      shadowOffset: {
	    width: 0,
	    height: 5,
      },
      shadowOpacity: 0.36,
      shadowRadius: 6.68,}}> 
      <Feather name="calendar" size={24} color="black" />
      <Text style={{fontSize:10}}>Calendar</Text>
    </View></Pressable>
  
  </View>


{/* TEXT */}

<View style={{width:300, alignSelf:"center", marginTop:30}}>

    <Text style={{fontSize:14, marginBottom:25}}>{Beschrijving}</Text>
     

      {verification == false &&
      <Button title="Dit is mijn bedrijf" onPress={_handlePressButtonAsync} />}
</View>

{/* SIGN-UP LINK */}
    
<View style={{width:350,flexDirection:"row", justifyContent:"space-around", marginTop:50, alignSelf:'center'}}>
  <TouchableOpacity onPress={linkmap} style={{backgroundColor:"#FFBF00", borderRadius:10, height:50, width:155, justifyContent:"center"}}>
    <Text style={{textAlignVertical:"center", textAlign:"center"}}>Map</Text>
  </TouchableOpacity>

{verification == true &&
  <TouchableOpacity onPress={async() =>{
    const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
    const checkPushTokenExists2 = await AsyncStorage.getItem('iduser');
    console.log(checkPushTokenExists + ' Pushtoken')
  
    if(checkPushTokenExists == undefined || checkPushTokenExists == null ){
      Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Pushnotificaties staan uit',
        textBody: 'Verwijder en installeer de app opnieuw en accepteer pushnotificaties om deze functie te kunnen gebruiken!',
        button: 'close',
      })}else{
        if(checkPushTokenExists2 == undefined || checkPushTokenExists2 == null){
          Dialog.show({
            type: ALERT_TYPE.WARNING,
            title: 'Creer eerst een profiel',
            textBody: 'Maak eerst een profiel aan om te kunnen abonneren in de menu.',
            button: 'close',
          })
        }else{
    
    if(chatcount < limitchatcount){
     

    

/* 1. Navigate to the Details route with params */
navigation.navigate('chat', {
 _iden: _id,
 dbase: db,
 user2: iduser,
 bedrijf: Bedrijfsnaam,
 userpopup: usernamepop,
 pic: Imagenew,
 inboxnummer: inboxCount,
 ondernemerid: _id,
});
     
      
}else{

  const press = async() =>{
    console.log('test press')
    Dialog.show({
      type: ALERT_TYPE.SUCCESS,
      title: 'Het spijt ons!',
      textBody: 'De chat limiet van deze ondernemer is helaas tot zijn einde gekomen, Probeer het later nog een keer!',
      button: 'close',
    })
 
    const payload = {
      "idbedrijf":_id,
      "limiettitle":"Een klant probeert je een chatbericht te sturen!",
      "limietmessage":"Upgrade je account limiet voor meer chats en mis geen potentiele leads!"
      }
  await axios.post('https://fyxedsearch.herokuapp.com/posts/limitbedrijf', payload)
  }
   press()
}}}


}} style={{borderRadius:10,height:50, width:100, flexDirection:"row", alignItems:"center", marginRight:1, justifyContent:'space-between'}}>
    <Text style={{textAlignVertical:"center", textAlign:"center"}}>Chat nu</Text>
    <FontAwesome5 name="long-arrow-alt-right" size={32} color="black"/>
  </TouchableOpacity>}

  {verification == false || verification == undefined &&
  <TouchableOpacity style={{borderRadius:10,height:50, width:130, flexDirection:"row", justifyContent:"space-around", alignItems:"center", marginLeft:15, justifyContent:'space-between'}}>
    <Text style={{textAlignVertical:"center", textAlign:"center"}}>Geen chat{"\n"}mogelijk</Text>
    <FontAwesome5 name="long-arrow-alt-right" size={32} color="black"/>
  </TouchableOpacity>}

</View>
  
<View style={{width:"100%", height:40,justifyContent:"center", alignItems:"center", marginTop:30}}>
<Image style={{width:75, height:15, alignItems:"center", marginTop:10,  }}source={require('../assets/fyxedlogo.png')}/> 
</View>

</ImageBackground>
</View> 
</ScrollView> 
</Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
});