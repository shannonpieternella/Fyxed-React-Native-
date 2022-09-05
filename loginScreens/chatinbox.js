import React, { useState, useEffect } from "react";
import { Box, FlatList, Heading, Avatar, HStack, VStack, Text, Spacer, Center, NativeBaseProvider, View } from "native-base";
import axios from 'axios';
import {Pressable} from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from '@expo/vector-icons';



const Chatinbox = () => {
  const [inbox, setInbox] = useState([])
  const [checkondernemer, setCheckOndernemer] = useState('');
  const [name, setName] = useState('');
  const navigation = useNavigation(); 

  useEffect(async () => {
    const value = await AsyncStorage.getItem('idondernemer');
    setCheckOndernemer(value)
    name(value)
 console.log(value + "  value isissi NOW")

  }, [])
  
  const home = () => {
    navigation.navigate('chat', {
      _id,
      dbase: db,
      user2: tokenuser,
      bedrijf: Bedrijfsnaam,
      userpopup: usernamepop,
      chatinbox:true
      // pic: Imagenew
    });

    console.log('send nav to chat 2')
  };

  useFocusEffect(
    React.useCallback(async() => {



      if(await AsyncStorage.getItem('idondernemer') != null){
      const value1 = await AsyncStorage.getItem('idondernemer');
        const response = await axios.get(`https://fyxedsearch.herokuapp.com/posts/inboxget/${value1}`);
        const dbdata = await response.data;
        setInbox(dbdata)
        console.log('mongo 1' + dbdata)
      }
      if(await AsyncStorage.getItem('idondernemer') == null){
        const value = await AsyncStorage.getItem('iduser');
        const response2 = await axios.get(`https://fyxedsearch.herokuapp.com/posts/inboxuser/${value}`);
        const dbdata2 = await response2.data;
        setInbox(dbdata2)
        console.log('mongo 2' + dbdata2 + " " + value)
      }
      
     
  }, []),
  );

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
  // useEffect(async() => {
  //   const response = await axios.get('https://fyxedsearch.herokuapp.com/posts/inboxget');
  //   const dbdata = await response.data;
  //   setInbox(dbdata)
  //   console.log('mongo ' + dbdata)
  // }, [])


  
//   // const data = [{
//   //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//   //   fullName: "Aafreen Khan",
//   //   timeStamp: "12:47 PM",
//   //   recentText: "Good Day!",
//   //   avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
//   // }, {
//   //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//   //   fullName: "Sujitha Mathur",
//   //   timeStamp: "11:11 PM",
//   //   recentText: "Cheer up, there!",
//   //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
//   // }, {
//   //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
//   //   fullName: "Anci Barroco",
//   //   timeStamp: "6:22 PM",
//   //   recentText: "Good Day!",
//   //   avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
//   // }, {
//   //   id: "68694a0f-3da1-431f-bd56-142371e29d72",
//   //   fullName: "Aniket Kumar",
//   //   timeStamp: "8:56 PM",
//   //   recentText: "All the best",
//   //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
//   // }, {
//   //   id: "28694a0f-3da1-471f-bd96-142456e29d72",
//   //   fullName: "Kiara",
//   //   timeStamp: "12:47 PM",
//   //   recentText: "I will call today.",
//   //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
//   // },
//   // {
//   //   id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//   //   fullName: "Aafreen Khan",
//   //   timeStamp: "12:47 PM",
//   //   recentText: "Good Day!",
//   //   avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
//   // }, {
//   //   id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//   //   fullName: "Sujitha Mathur",
//   //   timeStamp: "11:11 PM",
//   //   recentText: "Cheer up, there!",
//   //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
//   // }, {
//   //   id: "58694a0f-3da1-471f-bd96-145571e29d72",
//   //   fullName: "Anci Barroco",
//   //   timeStamp: "6:22 PM",
//   //   recentText: "Good Day!",
//   //   avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
//   // }, {
//   //   id: "68694a0f-3da1-431f-bd56-142371e29d72",
//   //   fullName: "Aniket Kumar",
//   //   timeStamp: "8:56 PM",
//   //   recentText: "All the best",
//   //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
//   // }, {
//   //   id: "28694a0f-3da1-471f-bd96-142456e29d72",
//   //   fullName: "Kiara",
//   //   timeStamp: "12:47 PM",
//   //   recentText: "I will call today.",
//   //   avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
//   // }

// ];
  return <Box>
        

<View style ={{flexDirection: 'row', width: '25%'}}>
<Heading fontSize="xl" p="25" pb="30" width= '325'>
    Inbox
      </Heading>
      {/* <Pressable onPress={() => 
    navigation.navigate('authondernemer')}>
<Entypo style ={{marginTop: 25}} name="menu" size={36} color="black" />    
</Pressable> */}
  </View>
  
     


   
      <FlatList style={{height: 500}} data={inbox} renderItem={({
      item
    }) => <Box borderBottomWidth="1" _dark={{
      borderColor: "gray.600"
    }} borderColor="coolGray.200" pl="0" pr="0" py="2">
    <Pressable onPress={() => {
    navigation.navigate('chat', {
      id: item._id,
      dbase: item.dbname,
      user2: item.user,
      bedrijf: item.naambedrijf,
      userpopup: item.naamuser,
      chatinbox: true,
      ondernemerid: item.ondernemer,
      klantid: item.user

    });}}>


            <HStack space={3} justifyContent="space-between">
            {checkondernemer != null &&     <Avatar marginLeft="5" size="90px" source={{
          uri: "https://scontent-ams4-1.xx.fbcdn.net/v/t39.30808-6/277672988_385963013536774_4903547673336877967_n.png?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=wg85OsonnnkAX-5qWBb&_nc_ht=scontent-ams4-1.xx&oh=00_AT_LEmA8jvQlTSf5d3xBZ2-2-JF8A-QWjChKaIjZRpQW9w&oe=6318F75E"
        }} />}

{checkondernemer == null &&     <Avatar marginLeft="5" size="90px" source={{
          uri: item.imagecompany
        }} />}
        
              <VStack>
              {checkondernemer == null && 
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.naambedrijf}
                </Text>}

                {checkondernemer != null && 
                <Text _dark={{
            color: "warmGray.50"
          }} color="coolGray.800" bold>
                  {item.naamuser}
                </Text>}


                <Text color="coolGray.600" _dark={{
            color: "warmGray.200"
          }}>
                  {item.lastsentence}
                </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
          color: "warmGray.50"
        }} color="coolGray.800" alignSelf="flex-start">
                {item.timeStamp}
              </Text>
            </HStack>
            </Pressable>
          </Box>} keyExtractor={item => item.id} />
       
    </Box>;
};

    export default () => {
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Chatinbox />
            </Center>
          </NativeBaseProvider>
        );
    };
    