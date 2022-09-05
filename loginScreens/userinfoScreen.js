import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';
import BuildingAFormExample from './formbedrijf'
import DropdownScreen from './dropdown'

// import { Dropdown } from 'react-native-element-dropdown';


export default function UserInfoScreen() {
    return (
      <View style={styles.container}>
        
<View style={styles.bgview}>

       
        <View style={styles.header}>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image source={require('../assets/arrow.png')} style={styles.arrowicon} />
        <Text style={styles.textlogin}>
          Profiel
          </Text>
        </View> 
        

<View><Image style={{width:85, height:75}} source={require('../assets/bubbles.png')} />
</View>
</View >



<View style={styles.hiview}>
<Text style={styles.textgevonden}>Vind honderden verschillende bedrijven op Fyxed</Text>
</View>
<View style={styles.loginContainerParent2}>

<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      // onChangeText={text => onChangeText(text)}
      // value={value}
      color="black"
      placeholder="Naam"
      placeholderTextColor="black" 
    />

<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      // onChangeText={text => onChangeText(text)}
      // value={value}
      color="black"
      placeholder="Telefoonnummer"
      placeholderTextColor="black" 
    />

    <TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      // onChangeText={text => onChangeText(text)}
      // value={value}
      color="black"
      placeholder="Postcode"
      placeholderTextColor="black" 
    />
    <TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      // onChangeText={text => onChangeText(text)}
      // value={value}
      color="black"
      placeholder="Adress"
      placeholderTextColor="black" 

    />

<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      // onChangeText={text => onChangeText(text)}
      // value={value}
      color="black"
      placeholder="Huisnummer"
      placeholderTextColor="black" 
    />


  


    


</View>

<Pressable onPress={() => { console.warn("grilled cheese") }} >
<View style={{marginTop:35, width:"100%", justifyContent:"center", alignItems:"center"}}>
<View style={{height:45, width:195, backgroundColor:"#FFBF00", justifyContent:"center",borderRadius:20}}>
<Text style={{color:"white", textAlign:"center",}}>Next</Text>
</View>
</View>
</Pressable>

</View>

        <StatusBar style="auto" />
        
      </View>
    );
  }

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
   

  },

  iconlogin: {
height: 30,
width: 30,
justifyContent: 'space-around',
flexDirection: 'row',
paddingLeft: 50
  },

   
      
  
  loginContainerParent2: {

  flexDirection: 'column',
    marginTop: 25,
  borderRadius: 20,
      // borderWidth: 1,
      borderColor: '#ffffff',
      backgroundColor: '#FFFFFFAD',
     justifyContent: 'space-between',
      height: 350,
    
      width: 335,
      alignSelf: 'center',
     padding: 20
      
  

  
  },


  loginContainer: {
height: 350,
width: 300,
// borderRadius: 14,
//     borderWidth: 1,
//     borderColor: '#ffffff',
    // backgroundColor: '#ffffff',
    
  



  },

  hiview: {
   
    // height: 80,
    // borderRadius: 14,
    // borderWidth: 1,
    // borderColor: '#ffffff',
    flexDirection: 'row',
    alignItems:'center',
    width: '100%',
    justifyContent: 'space-between',
    justifyContent: 'center'
  

  },

  background: {
height: 600,



  },

  bgview: {
height: 600,
// width: 400,
marginBottom: 500,


  },

  arrowicon: {
  height: 25,
  width: 25

  },

  header: {
    // borderRadius: 14,
    // borderWidth: 1,
    // // borderColor: '#ffffff',
    height: 80, 

   justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15


    

  },

  textlogin: {
    marginTop: 65,
  color: '#ffffff',
  fontSize: 22,
  marginLeft: 25,
  fontWeight: 'bold',
  textAlignVertical: 'center',
  height: 100
  },

  textgevonden: {
    color: '#ffffff',
    fontSize: 16,
    width: 250,
    textAlign: 'center',
  
    fontWeight: 'normal',
  marginTop: 25,
    
    },

  logoheader: {
height: 35,
width: 200


  },

  iconhi: {
    height: 40,
    width: 40,
    marginTop: 55,
    marginLeft: 5
    
    
      }

      
    

});
