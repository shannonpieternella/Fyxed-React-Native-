import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Hi from './loginScreens/hiScreen';
import Signup from './loginScreens/signupScreen';
import Login from './loginScreens/loginScreen';
import BedrijfsInfoScreen from './loginScreens/bedrijfsInfoScreen';
import BuildingAFormExample from './loginScreens/formbedrijf';
import ProfielUsers from './loginScreens/ProfielUsers'
import Pushnotification from './loginScreens/Pushnotification'
import StartScreen from './loginScreens/startScreen'
import UserInfoScreen from './loginScreens/userinfoScreen'
import Search from './loginScreens/Search'
import Profielpage from './loginScreens/Profielpage'
import {Provider} from 'react-redux';
import configureStore from './src/store';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Push from "./src/store/utils/notifications"
import { Ionicons } from '@expo/vector-icons';
import {RFValue} from 'react-native-responsive-fontsize'



// import App from './loginScreens/formbedrijf';

import { NativeBaseProvider, Box } from "native-base";
import formbedrijf from './loginScreens/formbedrijf';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState, useEffect } from "react";
import {colors} from './src/store/utils';
import Firechat from './loginScreens/chat';
import Firechat2 from './loginScreens/chat2';
import Chatinbox from './loginScreens/chatinbox';
import Favorieten from './loginScreens/Favorieten';
import Searchold from './loginScreens/Searchold';
import Settings from './loginScreens/settings';
import Authondernemer from './loginScreens/authcompany';
import Dashboardondernemer from './loginScreens/dashboardondernemer';



const store = configureStore();
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const noTabOption = {tabBarShowLabel: true, headerShown: false};
const noHeaderOption = {headerShown: false};
const HeaderOption = {headerShown: true};

const IconComponent = ({ focused, name }) => {
  return <Ionicons name={name} size={RFValue(24)} color={focused ? colors.primary : colors.gray} />;
}

const TabNav = () => {
  return (
    // <View style={{}}>
    <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false, tabBarStyle:{backgroundColor:'black', height: '10%', borderRadius: 54, width: "90%", alignSelf:'center', marginBottom: 21} }}> 

    <Tab.Screen name="search" component={Search} options={{tabBarIcon: ({focused}) => (
    <IconComponent name="md-home-outline" focused={focused} />), tabBarLabel: 'Home'}} />

    <Tab.Screen name="chatmenu" component={Chatinbox} options={{tabBarIcon: ({focused}) => (<IconComponent name="chatbox-ellipses-outline" focused={focused} />), tabBarLabel: 'Inbox'}} />
    <Tab.Screen name="signup" component={Signup} options={{tabBarIcon: ({focused}) => (<IconComponent name="md-notifications-outline" focused={focused} />), tabBarLabel: 'Profielpage'}} />
    {/* <Tab.Screen name="ProfileScreen" component={ProfileScreen} options={{tabBarIcon: ({focused}) => (<IconComponent name="md-person-outline" focused={focused} />), tabBarLabel: 'You'}} /> */}
    </Tab.Navigator>
    // </View>
  );
}

export default function App() {
  const [expoToken, setExpoToken] = useState(false);

  useEffect(() => {
  console.log('Fyxed');

}, [])



useEffect(async () => {
  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('pushToken');
      setExpoToken(value);
      console.log('check value ' + expoToken);  

    } catch (error) {
      console.log(error)
    }
  };

_retrieveData()

}, [])


  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
    <NativeBaseProvider>
    <NavigationContainer>
     <Stack.Navigator screenOptions={noHeaderOption}>
     {expoToken == null && <Stack.Screen name="startpush" component={StartScreen} />}
     {expoToken != null && <Stack.Screen name="startScreen" component={TabNav} />}    
     <Stack.Screen name="authondernemer" component={Authondernemer} />
     <Stack.Screen name="nextpage" component={TabNav} />

        <Stack.Screen name="pushnotification" component={Pushnotification} />
        
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Bedrijfsinfoscreen" component={BedrijfsInfoScreen} />
        <Stack.Screen name="searchold" component={Searchold} />
        <Stack.Screen name="chatinbox" component={Chatinbox} />
        <Stack.Screen name="chat" component={Firechat} options={{ title: 'My home' }} />
        <Stack.Screen name="chat2" component={Firechat2} options={{ title: 'My home' }} />
        <Stack.Screen name="search" component={Search} />
        <Stack.Screen name="profielpage" component={Profielpage} />
        <Stack.Screen name="favorieten" component={Favorieten} />
        <Stack.Screen name="settings" component={Settings} />
        <Stack.Screen name="Dashboardondernemer" component={Dashboardondernemer} />
      </Stack.Navigator>
     
      
    </NavigationContainer>
    </NativeBaseProvider>
    </Provider>
     </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  }
});


// export default function App() {
//   return (
//     <App />
//   );
// }


