import { StyleSheet, StatusBar ,Text, View, Image, TextInput, Button, Touchable, Pressable, ImageBackground, FlatList } from 'react-native';
import { AntDesign, MaterialIcons, Ionicons  } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect, useFocusEffect } from "react";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
  import axios from 'axios';
import {fetchAllNfts, filterNfts, fetchSearchNfts, fetchFilterStad, Iconcheck} from '../src/endpoints'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Appmodal from './modal';
import DropdownComponent from './picker'
import {useSelector, useDispatch} from 'react-redux';
import Favorieten from './Favorieten';
import { TabNav } from '../App';
// import { convertAbsoluteToRem } from 'native-base/lib/typescript/theme/tools';
// import { Icon } from 'react-native-elements';
// import { color } from 'react-native-elements/dist/helpers';
// import reactDom from 'react-dom';
// import { Center, Column } from 'native-base';

export default function Search({navigation}) {
  const [text, onChangeText] = useState("");
  const [nfts, setNfts] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState('top')
  const [allemaal, setAllemaal] = useState('top')
  const {stadSearch} = useSelector(({appReducer}) => appReducer);
  const [icondb, seticondb] = useState()
  const [cat, setLoadcat] = useState(false)
  const [catvalue, setLoadcatValue] = useState('')


  const goTo = () => {
navigation.navigate('settings');
  }

  // const Tab = createBottomTabNavigator();

  // const TabNav = () => {
  //   return (
  //     // <View style={{}}>
  //     <Tab.Navigator screenOptions={noTabOption} style={{backgroundColor:'red'}}>
  
  //     <Tab.Screen name="search" component={Search} options={{tabBarIcon: ({focused}) => (
  //     <IconComponent name="md-home-outline" focused={focused} />), tabBarLabel: 'Home'}} />
  
  //     <Tab.Screen name="chatmenu" component={Chatinbox} options={{tabBarIcon: ({focused}) => (<IconComponent name="md-search-outline" focused={focused} />), tabBarLabel: 'Inbox'}} />
  //     <Tab.Screen name="favorites" component={Favorieten} options={{tabBarIcon: ({focused}) => (<IconComponent name="md-notifications-outline" focused={focused} />), tabBarLabel: 'Favorieten'}} />
  //     {/* <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{tabBarIcon: ({focused}) => (<IconComponent name="md-person-outline" focused={focused} />), tabBarLabel: 'You'}} /> */}
  //     </Tab.Navigator>
  //     // </View>
  //   );
  // }

  //Block terug button
  React.useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (0 == 0) {
          // If we don't have unsaved changes, then we don't need to do anything
          // return;
          e.preventDefault();
        }

        // Prevent default behavior of leaving the screen
        e.preventDefault();

        // Prompt the user before leaving the screen
        console.log('cant go back')
      }),
    [navigation]
  );
           

  // Load alle companies
    useEffect(async()=>{
       
      axios.get(fetchAllNfts()).then(res => {
        setNfts(res.data)
        // setLoading(false)
        console.log("first loading", text)
        // TabNav()
      }).catch(err => {
        setLoading(false)
        setError(err)
      })
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
    
    

  

    
    
    //search company

      useEffect(()=>{
        console.log('text!!! ' + text + ' stadsearch ' + stadSearch )

        if (text.length > 0) {
        axios.get(fetchSearchNfts(text, stadSearch)).then(res => {
          setNfts(res.data)
          // setLoading(false)
          console.log("searching", text, stadSearch)
        }).catch(err => {
          // setLoading(false)
          // setError(err)
        })
      
        if(text == "" && stadSearch != null){
          axios.get(fetchSearchNfts("Search", stadSearch)).then(res => {
            setNfts(res.data)
            setLoading(false)
            console.log("searching search 1" + ' text ' + text + 'stad ' + stadSearch)
          }).catch(err => {
            setLoading(false)
            setError(err)
          })
          if(text == null && stadSearch == null){
            axios.get(fetchAllNfts()).then(res => {            
              setNfts(res.data)
            // setLoading(false)
            console.log("searching search 2" + ' text ' + text + 'stad ' + stadSearch)
          }).catch(err => {
            // setLoading(false)
            // setError(err)
          })
        }}
         
      }},[text, stadSearch])

      useEffect(()=>{
console.log('Value ' + filter + ' changed')

      },[filter])

      useEffect(async () => {
        // await AsyncStorage.setItem('pushToken', expoPushToken)
        const checkPushTokenExists = await AsyncStorage.getItem('pushToken');
    console.log(checkPushTokenExists + ' Pushtoken')

    
    }, [])

   
    const category = (value) => {

      if(cat == false){
        setLoadcat(true)
        setLoadcatValue(value)
        onChangeText("")

      }else{
        setLoadcat(false)
        setLoadcatValue(value)
        onChangeText("")
      }
   
    }
     
useEffect(() => {
  if(text.length < 1 && catvalue != null && stadSearch != null){
    axios.get(fetchSearchNfts(catvalue, stadSearch)).then(res => {
      setNfts(res.data)
      onChangeText("")
      // setLoading(false)
      console.log("searching category", catvalue, stadSearch)
    }).catch(err => {
      // setLoading(false)
      // setError(err)
    })

  }


  
}, [cat, stadSearch])

    
      

      const cancelSearch = async (alles) => {
        if(text.length > 0){

      axios.get(fetchSearchNfts("Search", stadSearch)).then(res => {
            setNfts(res.data)
            setLoading(false)
            console.log("searching search 1!!!" + ' text ' + text + 'stad ' + stadSearch)
          }).catch(err => {
            setLoading(false)
            setError(err)
          })
          onChangeText("");
    }else{
      axios.get(fetchSearchNfts("Search", stadSearch)).then(res => {
        setNfts(res.data)
        setLoading(false)
        console.log("searching search 1" + ' text ' + text + 'stad ' + stadSearch)
      }).catch(err => {
        setLoading(false)
        setError(err)
      })
    }

      }

const filterSearch = (val) => {
console.log(val)
if(val == 'Bedrijven'){
  setFilter('Bedrijven')
  return console.log('Bedrijven ' + filter)
}

if(val == 'Plaats'){
  setFilter('Plaats')
  return console.log('Plaats ' + filter)
}

if(val == 'Top'){
  setFilter('Top')
  return console.log('Top ' + filter)
}

}

      const goToScreen = (_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew, $numberDecimal, verification, gallerij, Pictures, agenda, Beschrijving, maplink) => {
        navigation.navigate('profielpage', {_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew, $numberDecimal, verification, gallerij,Pictures, agenda, Beschrijving, maplink})
      }

    const DATA = [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'First Item',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Second Item',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Third Item',
        },
       
      ];
    
      
      const renderItem = ({item}) => {
        const {_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew, rating: {$numberDecimal}, verification, gallerij, Pictures, agenda, Beschrijving, maplink} = item
      
        return (
          <>
        <View style={styles.item}>
        <Pressable onPress={() => goToScreen(_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew, $numberDecimal, verification, gallerij, Pictures, agenda, Beschrijving, maplink)}>

           <ImageBackground resizeMode= 'cover' style={{width:227, height: hp('40%'), borderRadius:25,  overflow: 'hidden' }} source={{ uri: Imagenew }} >
<View style={{flexDirection:"row"}}> 
<MaterialIcons style={{marginLeft:6, marginTop:9,}} name="star-outline" size={25} color="#FFFFFF"/>
<Text style={{color:"white", fontSize:20, fontWeight:"bold",marginLeft:2, marginTop:10}}>{$numberDecimal}</Text>
<View style={{marginTop:9, width:"100%", justifyContent:"center", alignItems:"center", marginLeft:28}}>


<Pressable>
{/* <View style={{backgroundColor:"#FFFFFF70", height:25, width:25, borderRadius:100}}>
<Ionicons style={{marginLeft:2.5, marginTop:2.5}} name="heart-outline" size={20} color="black"/>
</View> */}
</Pressable>

</View>
</View> 
<View style={{width:205, height:80, backgroundColor:"#FFFFFF99", marginTop:100, marginLeft:11, borderRadius:10}}>
<Text style={{color:"black", fontSize:16, marginTop:7, marginLeft:22}}>{Bedrijfsnaam}</Text>
<View style={{flexDirection:"row"}}>
<Ionicons style={{marginLeft:17, marginTop:2.5}} name="location-sharp" size={20} color="black"></Ionicons>
<Text style={{color:"black", fontSize:14, marginTop:5, marginLeft:4}}>{Stad}</Text>
</View>
</View>
</ImageBackground> 
</Pressable>
        </View>
   

      </>
        )
      }
    
      

  
         
    
const DATA2 = [
        {
          id: '1',
          title: 'Kapper',
        },
        {
          id: '2',
          title: 'Timmerman',
        },
        {
          id: '3',
          title: 'Schoonheidsspecialist',
        },
        {
          id: '4',
          title: 'Programmeur',
        },
        {
          id: '5',
          title: 'Schilder',
        },
        {
          id: '6',
          title: 'Hondenuitlater',
        },

      ];



    //   ======catagorien flatlist======

    const renderItem2 = ({ item }) => (
      <Pressable onPress={()=> category(item.title)}>
        <View style={styles.item}>
        <View style={{height:30, width: 140, backgroundColor:"white", borderRadius:10, borderColor:"black", borderWidth:1, marginLeft:10, marginTop:10, flexDirection:"row", shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 1,
},
shadowOpacity: 0.36,
shadowRadius: 4.68,

elevation: 7,}}>
  
<Image style={{height:18, width:12.89, marginLeft:5 , marginTop:4.5}} source={require('../assets/kapper.png')}></Image>
<Text style={{color:"black", fontSize:10, marginTop:8, marginLeft:7, fontFamily: 'Poppins'}}>{item.title}</Text>

</View>
        </View>
        </Pressable>
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
<View style={{ backgroundColor:"white", width:"100%", height:1000}}>
<ImageBackground style={{width:"100%",height:1000}} source={require('../assets/background.png')}>






{/*====== logo settings ====== */}

<View style={{width:"100%", height:20, alignItems:"center",marginTop:20 }}>
<Image style={{width:53, height:14}} source={require('../assets/fyxedlogo.png')}></Image>
</View>


<View style ={{flexDirection: 'row', alignItems:'center', justifyContent: 'space-between', marginRight:25}}>
<View style={{marginTop:20}}>
<Text style={{color:"black", fontSize:20, fontWeight:"bold", fontStyle:"Poppins", marginLeft:15, fontFamily: 'Poppins_600SemiBold'}}>Waar ben je naar opzoek?</Text>
</View>

{/* <View style={{marginTop:4,marginLeft:330, width:"100%", justifyContent:"center", alignItems:"center"}}> */}
{/* <Pressable onPress={goTo}>
<View style={{width:25, height:25,borderRadius:100, backgroundColor:"white", alignItems:"center", marginTop:15}}>
<MaterialIcons style={{marginTop:2}} name="settings" size={20} color="black" />
</View>
</Pressable> */}
</View>

{/* </View> */}






{/*====== header ====== */}









{/* ===== searchbar =====*/}

<View style={{flexDirection: 'row' ,marginTop:25, marginLeft:15, justifyContent:"space-between",backgroundColor:"white",width:'90%', height:40, borderRadius:10, borderColor:"black", borderWidth:1, shadowColor: "#00090",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.36,
shadowRadius: 2.68,

elevation: 11, }}>
<TextInput onChangeText={onChangeText} style={{color:"#black", marginLeft:12,marginTop:3, width:150, backgroundColor: 'white'}}placeholder="search" ></TextInput>
<Pressable onPress={() => { console.warn("search") }} >
<View style={{marginTop:4,marginRight:15, width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{height:30, width:30, backgroundColor:"black", justifyContent:"center",borderRadius:10}}>
<MaterialIcons style={{marginLeft:5}} name="search" size={20} color="white" />
</View>
</View>
</Pressable>
</View>






{/* ====== categorieën ====== */}

<View style={{marginTop:20 , width:"100%"}}>


<Text style={{color:"black", fontSize:18, fontWeight:"bold", fontStyle:"Poppins", marginLeft:15,fontFamily:"Poppins_700Bold"}}>Categorieën</Text>
<FlatList
                horizontal
                data={DATA2}
                renderItem={renderItem2}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}

              />
{/* <View style={{flexDirection:"row" , marginLeft:10}}>
<View style={{height:30, width:70, backgroundColor:"white", borderRadius:10, borderColor:"black", borderWidth:1, marginLeft:10, marginTop:10, flexDirection:"row"}}>
<Image style={{height:18, width:12.89, marginLeft:5 , marginTop:4.5}} source={require('../assets/kapper.png')}></Image>
<Text style={{color:"black", fontSize:10, marginTop:8, marginLeft:7}}>Kapper</Text>
</View>
<View style={{height:30, width:70, backgroundColor:"white", borderRadius:10, borderColor:"black", borderWidth:1, marginLeft:10, marginTop:10, flexDirection:"row"}}>
<Image style={{height:18, width:12.89, marginLeft:5 , marginTop:4.5}} source={require('../assets/welness.png')}></Image>
<Text style={{color:"black", fontSize:10, marginTop:8, marginLeft:5}}>Welness</Text>
</View>
<View style={{height:30, width:70, backgroundColor:"white", borderRadius:10, borderColor:"black", borderWidth:1, marginLeft:10, marginTop:10, flexDirection:"row"}}>
<Image style={{height:18, width:12.89, marginLeft:5 , marginTop:4.5}} source={require('../assets/beauty.png')}></Image>
<Text style={{color:"black", fontSize:10, marginTop:8, marginLeft:8}}>beauty</Text>
</View>
<View style={{height:30, width:70, backgroundColor:"white", borderRadius:10, borderColor:"black", borderWidth:1, marginLeft:10, marginTop:10, flexDirection:"row"}}>
<Image style={{height:18, width:12.89, marginLeft:5 , marginTop:4.5}} source={require('../assets/klusjes.png')}></Image>
<Text style={{color:"black", fontSize:10, marginTop:8, marginLeft:5}}>Klusjes</Text>
</View>
<View style={{height:30, width:70, backgroundColor:"white", borderRadius:10, borderColor:"black", borderWidth:1, marginLeft:10, marginTop:10, flexDirection:"row"}}>
<Image style={{height:18, width:12.89, marginLeft:5 , marginTop:4.5}} source={require('../assets/bijles.png')}></Image>
<Text style={{color:"black", fontSize:10, marginTop:8, marginLeft:5}}>Bijles</Text>
</View>
</View> */}
</View>







{/* ===== dropdowns ===== */}

<View style={{flexDirection:"row",alignItems:"center", justifyContent:'space-around' }}>
 <Text style={{color:"black", fontSize:18, fontWeight:"bold", fontFamily:"Poppins_700Bold"}}>Populair</Text>
<MaterialIcons style={{marginRight: 0}} name="arrow-drop-down" size={40} color="#FFBF00" />

<DropdownComponent />
</View>






{/* ===== profiles ====== */}

<View style={{width:"100%", height:400, flexDirection:"row", }}>
<FlatList
                horizontal
                data={nfts}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                showsHorizontalScrollIndicator={false}

              />
  
{/* <ImageBackground style={{width:227, height:330, borderRadius:25, marginLeft:20,  overflow: 'hidden'}} source={require('../assets/barbershop.jpg')} >
<View style={{flexDirection:"row"}}> 
<MaterialIcons style={{marginLeft:6, marginTop:9,}} name="star-outline" size={25} color="#FFFFFF"/>
<Text style={{color:"white", fontSize:20, fontWeight:"bold",marginLeft:2, marginTop:10}}>4.7</Text>
<View style={{marginTop:9, width:"100%", justifyContent:"center", alignItems:"center", marginLeft:28}}>
<View style={{backgroundColor:"#FFFFFF70", height:25, width:25, borderRadius:100}}>
<Ionicons style={{marginLeft:2.5, marginTop:2.5}} name="heart-outline" size={20} color="black"/>
</View>
</View>
</View> 
<View style={{width:205, height:61, backgroundColor:"#FFFFFF99", marginTop:200, marginLeft:11, borderRadius:10}}>
<Text style={{Color:"black", fontSize:16, fontWeight:"bold", marginTop:7, marginLeft:22}}>Dadbeat barbers</Text>
<View style={{flexDirection:"row"}}>
<Ionicons style={{marginLeft:17, marginTop:2.5}} name="location-sharp" size={20} color="black"></Ionicons>
<Text style={{color:"black", fontSize:14, marginTop:5, marginLeft:4}}>Arnhem,NL</Text>
</View>
</View>
</ImageBackground> 


<ImageBackground style={{width:227, height:330, borderRadius:25, marginLeft:30,  overflow: 'hidden'}} source={require('../assets/BedreesPT.jpg')} >
<View style={{flexDirection:"row"}}>
<MaterialIcons style={{marginLeft:6, marginTop:9}} name="star-outline" size={25} color="#FFFFFF" />
<Text style={{color:"white", fontSize:20, fontWeight:"bold",marginLeft:2, marginTop:10 }}>4.2</Text>
<View style={{marginTop:9, width:"100%", justifyContent:"center", alignItems:"center", marginLeft:28}}>
<View style={{backgroundColor:"#FFFFFF70", height:25, width:25, borderRadius:100}}>
<Ionicons style={{marginLeft:2.5, marginTop:2.5}} name="heart-outline" size={20} color="black"/>
</View>
</View>
</View>
<View style={{width:205, height:61, backgroundColor:"#FFFFFF99", marginTop:200, marginLeft:11, borderRadius:10}}>
<Text style={{Color:"black", fontSize:16, fontWeight:"bold", marginTop:7, marginLeft:22}}>Bedrees PT</Text>
<View style={{flexDirection:"row"}}>
<Ionicons style={{marginLeft:17, marginTop:2.5}} name="location-sharp" size={20} color="black"></Ionicons>
<Text style={{color:"black", fontSize:14, marginTop:5, marginLeft:4}}>Arnhem,NL</Text>
</View>
</View>  
</ImageBackground>  */}
</View>



</ImageBackground>
</View>

    );
    }
  }
    
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
          
        },
        item: {
          backgroundColor: '#FFFFFF10',
          padding: 1,
          marginVertical: 8,
          marginHorizontal: 1
          
        },
        title: {
          fontSize: 32,
        },
      });

      const styles2 = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 1,
          width:'100%'
          
        },
        item: {
          backgroundColor: '#FFFFFF',
          padding: 1,
          marginVertical: 8,
          marginHorizontal: 1,
        
          
        },
        title: {
          fontSize: 32,
          
        },
  });