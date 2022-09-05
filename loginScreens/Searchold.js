import { StyleSheet, Searchbar, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable,CheckBox, FlatList } from 'react-native';
import { Icon,SearchBar } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import reactDom from 'react-dom';
import React, { useState, useEffect } from "react";
import { Feather, Entypo, Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import {fetchAllNfts, filterNfts, fetchSearchNfts, fetchFilterStad} from '../src/endpoints'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Appmodal from './modal';
import DropdownComponent from './picker'
import {useSelector, useDispatch} from 'react-redux';
import { StatusBar } from 'expo-status-bar';

// import Toestemmingof from './toestemming'



export default function Searchold({navigation}) {
    const [text, onChangeText] = useState("");
    const [nfts, setNfts] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [filter, setFilter] = useState('top')
    const [allemaal, setAllemaal] = useState('top')
    const {stadSearch} = useSelector(({appReducer}) => appReducer);
   
    
    //stad filter plus search value
    // useEffect(async()=>{
    //   console.log("Searching steden", stadSearch)
    //   // console.log('Awooo nos a kambia')
    //   if(text == undefined || text == null || text == ""){
    //     axios.get(fetchFilterStad("undefined", stadSearch)).then(res => {
    //       setNfts(res.data)
    //       // setLoading(false)
    //       console.log("Searching steden 1", stadSearch)
    //       console.log("Searching data", res.data)
    //     }).catch(err => {
    //       setLoading(false)
    //       // setError(err)
    //     })
    //   }else{
    //     axios.get(fetchFilterStad(text, stadSearch)).then(res => {
    //       setNfts(res.data)
    //       console.log("Searching steden 2", stadSearch)
    //       console.log("Searching steden 2 text", text)

    //       // setLoading(false)
          
    //     }).catch(err => {
    //       setLoading(false)
    //       // setError(err)
    //     })

    //   }
     
    //         },[stadSearch])
  //   useEffect(async()=>{
  //   axios.get(fetchSearchNfts("Search", stadSearch)).then(res => {
  //     setNfts(res.data)
  //     setLoading(false)
  //     console.log("searching search 1" + ' text ' + text + 'stad ' + stadSearch)
  //   }).catch(err => {
  //     setLoading(false)
  //     setError(err)
  //   })
  // },[allemaal])

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
           
    useEffect(async()=>{
       
      axios.get(fetchAllNfts()).then(res => {
        setNfts(res.data)
        // setLoading(false)
        console.log("first loading", text)
      }).catch(err => {
        setLoading(false)
        setError(err)
      })
    },[])

      useEffect(()=>{
        console.log('text!!! ' + text + ' stadsearch ' + stadSearch )

        if (text.length > 0) {
        axios.get(fetchSearchNfts(text, stadSearch)).then(res => {
          setNfts(res.data)
          setLoading(false)
          console.log("searching", text, stadSearch)
        }).catch(err => {
          setLoading(false)
          setError(err)
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
          if(text == "" && stadSearch == null){
            axios.get(fetchAllNfts()).then(res => {            setNfts(res.data)
            setLoading(false)
            console.log("searching search 2" + ' text ' + text + 'stad ' + stadSearch)
          }).catch(err => {
            setLoading(false)
            setError(err)
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

      const goToScreen = (_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew) => {
        navigation.navigate('profielpage', {_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew})
      }
    
      const renderItem = ({item}) => {
        const {_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew} = item
      
        return (
          <>
{/* <Toestemmingof /> */}
<Pressable onPress={() => goToScreen(_id, Email_id, Bedrijfsnaam, Telefoonnummer, Straatnaam, Huisnummer, Postcode, Stad, Bedrijfstype, Imagenew)}>
  

  {/* container          */}
 <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, height: 150}}>

  {/* View list companies */}
 <View style ={{flexDirection:'row', width: '86%', borderRadius: 14, marginTop: 10}}>
  
  {/* View images */}

<View style={{height:12,backgroundcolor:"white", height: 100, justifyContent: 'center'}}>
<Image source={{uri: Imagenew}} style={{width:100, height:100, borderRadius:14}}  />
</View>

  {/* View gegevens */}

<View style={{marginLeft: 10, marginTop: 10}}>
<Text style={{fontSize:16, fontWeight:"bold", color:"black"}}>{Bedrijfsnaam}</Text>
<Text style={{fontSize:16, color:"black", color:"#FFBF00"}}>{Stad}</Text>
</View>
 
</View> 


</View>
</Pressable>
          </>
        )
      }
   
   
    return (

     // Container en nav
     <View style={{backgroundColor:"white", height:"100%", width:"100%"}}> 


     {/* logo    */}
     <View style={{ flexDirection: 'row', justifyContent:"space-between"}}>
    <Image style={{width:25, height:25, marginTop:30, marginLeft:20}} source={require('../assets/fyxedicon.png')} />
    </View>

{/* View voor searchbar en cancel button */}

<View style={{flexDirection: 'row', alignItems: 'center', width: '100%', height: 50, justifyContent: 'space-between'}}>

{/* searchbar */}
<View style={{flexDirection: 'row', marginLeft:21, justifyContent:"space-between",backgroundColor:"grey", width:250, borderRadius:10, borderwith:1, height:40, alignItems:'center'}}>
<Ionicons name="md-search-outline" size={20} color="black" style={{marginLeft:7, marginTop:5}}/>
<TextInput onChangeText={onChangeText} value={text} style={{color:"black", marginLeft:10, width:270, height:30}} placeholder="Search"></TextInput>
</View>

{/* Cancel button */}
<Pressable onPress={() => cancelSearch(true)}>
<View>
<Text style={{fontSize:18, fontWeight:"bold", color:"black", marginRight:20}}>Cancel</Text>
</View>
</Pressable>


</View>

{/* selectie */}

<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
{/* <Pressable onPress={() => filterSearch('Top')}>
<Text style={{fontSize:16, fontWeight:"bold", color:"black", marginLeft:25,}}>Top</Text>
</Pressable> */}
{/* <Pressable onPress={() => filterSearch('Bedrijven')}>
<Text style={{fontSize:16, fontWeight:"bold", color:"black"}}>Bedrijven</Text>
</Pressable> */}
<Pressable onPress={() => filterSearch('Plaats')}>
  <View style={{flexDirection: 'row', justifyContent: 'space-around', width: 300, justifyContent: 'center', alignItems: 'center'}}>
  <Text style={{fontSize:16, fontWeight:"bold", color:"black", marginRight: 20}}>Plaats</Text>

<DropdownComponent />
  </View>

</Pressable>
</View>




{/* recent */}
<View style={{flexDirection: 'row', justifyContent:"space-between", marginTop:30, textAlignVertical:"center", alignItems:"center"}}>
<Text style={{fontSize:22, fontWeight:"bold", color:"black", marginLeft:25}}>Recent</Text>
<Pressable onPress={()=> cancelSearch(false)}>
<Text style={{fontSize:16, fontWeight:"bold", color:"#FFBF00", marginRight:25}}>Allemaal</Text> 
</Pressable>

</View>

{/* Searchcontent */}

<View>

<View>
<FlatList data={nfts} renderItem={renderItem} keyExtractor={item => item._id} showsVerticalScrollIndicator={false} />
</View>
   



</View>




    </View>
    );
  }