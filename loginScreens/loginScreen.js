import { StyleSheet, Text, View, Image, ImageBackground, TextInput, Button, Touchable, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Icon } from 'react-native-elements';
import { color } from 'react-native-elements/dist/helpers';

export default function Login({navigation}) {

const seh = "test";

    return (
      <View style={styles.container}>
        
<View style={styles.bgview}>
<ImageBackground source={require('../assets/model2.png')} resizeMode="contain" style={styles.background}>
       
        <View style={styles.header}>
          
        <Image source={require('../assets/arrow.png')} style={styles.arrowicon} />
        <Image source={require('../assets/fyxedlogo.png')} style={styles.logoheader} />
</View >

<View style={styles.hiview}>

  <Text style={styles.textlogin}>
Login
</Text>


<Image source={require('../assets/fyxedicon.png')} resizeMode="contain" style={styles.iconhi} />

</View>
<View style={styles.loginContainerParent2}>


<Pressable style={{ height: 30, width: 300, paddingLeft: 15, flexDirection: 'row', alignItems: 'center', paddingBottom: 75}}
>
<Image source={require('../assets/profilelogin.png')} resizeMode="contain" style={styles.iconprofile} />

<View style={{paddingLeft: 15, paddingTop: 80, width: 300, height: 150}}>
<Text style= {{fontSize: 16, color: 'white', fontWeight: 'bold'}}>Levi Grey</Text>
<Text style= {{fontSize: 16, color: 'white'}}>levigreyofficial@gmail.com</Text>
</View>

  
</Pressable>  



<TextInput
      style={{ height: 45, borderWidth: 1, backgroundColor: '#ffffff', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 8}}
      // onChangeText={text => onChangeText(text)}
      // value={value}
      color="black"
      placeholder="Password"
      placeholderTextColor="black" 
    />

<Pressable onPress={() => {navigation.navigate('Signup', seh);}} style={{ height: 45, borderWidth: 1, backgroundColor: '#FFBF00', width: 300, borderRadius: 20, alignSelf: 'center', paddingLeft: 35, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
>


  <Text style= {{fontSize: 16, paddingRight: 50, color: 'white'}}>Continue</Text>
</Pressable>

<Pressable style={{ height: 45, width: 300, alignSelf: 'center', paddingLeft: 15, flexDirection: 'row', alignItems: 'center' }}
>

  <Text style= {{fontSize: 16, paddingRight: 50, color: '#FFBF00'}}>Forgot your password?</Text>
</Pressable>  




</View>

</ImageBackground>
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
paddingTop: 15,
  flexDirection: 'column',

  borderRadius: 20,
      // borderWidth: 1,
      borderColor: '#ffffff',
      backgroundColor: '#FFFFFFAD',
     
      height: 270,
      justifyContent:'space-around',
    
      width: 335,
      alignSelf: 'center',
      // justifyContent: 'space-evenly'
      
  

  
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
   
    height: 150,
    // borderRadius: 14,
    // borderWidth: 1,
    // borderColor: '#ffffff',
    flexDirection: 'row',
    alignItems:'center',
    width: 180,
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
    
    justifyContent: 'center',
    paddingLeft: 10,
    width: 225,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'

  },

  textlogin: {
  color: '#ffffff',
  fontSize: 40,
  marginLeft: 40,
  fontWeight: 'bold',
  marginTop: 50

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
    
    
      },

      iconprofile: {
        height: 70,
        width: 70,
        marginTop: 55,
        marginLeft: 5
        
        
          }

    

});
