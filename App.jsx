import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  Colors
} from 'react-native/Libraries/NewAppScreen';
import Home from './Home';
import Login,{socket} from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import ForgotPass from './ForgotPass';
import ResetPassword from './Reset';
import Register from './Register';
const Stack = createNativeStackNavigator();
const colpal={light:{bg:"#D8DEE9",inp:"#E5E9F0",fg1:"#ECEFF4",fg2:"#f6f8ff",t1:"#3B4252",t2:"#2E3440",t3:"#434C5E",t4:"#4C566A"},dark:{bg:"#3B4252",inp:"#2E3440",fg1:"#434C5E",fg2:"#4C566A",t1:"#D8DEE9",t2:"#E5E9F0",t3:"#ECEFF4",t4:"#f6f8ff"},frost:{b1:"#88C0D0",b2:"#88C0D0",b3:"#81A1C1",b4:"#45E81AC"},colorful:{red:"#BF616A",orange:"#D08770",yellow:"#EBCB8B",green:"#A3BE8C",purple:"#B48EAD"}} 
let styl={}
let user=null
let token=null
let uid=null
const disp=
<NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPass" component={ForgotPass} />
            <Stack.Screen name="ResetIt"  component={ResetPassword} />
            <Stack.Screen  name="Register" component={Register} />
          </Stack.Navigator>
        </NavigationContainer>

function setUser(u){
  user=u
}
function setToken(t){
  token=t
}
function setUid(u){
  uid=u
}
let setS=()=>{}
let getUSR=async ()=>{
    try {
        const value = await AsyncStorage.getItem('tok');
        if (value !== null) {
            let data=JSON.parse(value)

            token=data.token
            user=data.uname
            uid=data.uid
            console.log("Token: ",token)
            socket.emit('token', {name:user,token:token})
            setS(disp)
        }
        else{
          await new Promise((r)=>setTimeout(r,1))
            setS(disp)
        }
    } catch (e) {
        console.log(e)
    }
    
}
getUSR()
function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [stk, setStl] = useState(<></>)
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(()=>{
    socket.on('cd', (data)=>{
        console.log(data)
        if (data.data[0]!="inc")
        {
            ;
        }
        else{
          token=null
          uid=null
          user=null
            alert("Session Expired")
        }
        setS(disp)
    })
},[])
  styl=isDarkMode?colpal.dark:colpal.light
  setS=setStl
  
  return (
    <SafeAreaView className="w-full h-screen" style={{backgroundColor:styl.bg}}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={styl.bg}
      />
      {stk}
    </SafeAreaView>
  );
}


export {styl,colpal,user, uid, token,setUser,setToken,setUid};
export default App;