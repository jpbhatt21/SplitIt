import { useEffect, useRef,useState } from 'react';
import { Text, View, TextInput, Button, Pressable, Image } from 'react-native';
import { styl,colpal,user,token,uid, setToken, setUid, setUser } from './App';
import GridLines from './grid';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Alert } from 'react-native';
import {KeyboardAvoidingView} from 'react-native';
let storeUSR=async (token,uname,uid)=>{
    let data={token:token,uname:uname,uid:uid}
    try {
        await AsyncStorage.setItem('tok', JSON.stringify(data));
        }
    catch (e) {
        console.log(e)
        }
    }


const URL =  'uri';
const socket = io(URL);
socket.emit('connection', 'Hello World!');
function Login(props) {
    const ref=useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    useEffect(()=>{
        socket.on('auth', (data)=>{
            console.log(data)
            if (data.data[0]!="inc")
            {
                setToken( data.data[0])
                setUid (data.data[1])

                storeUSR(token,user, uid)
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                  });
            }
            else{
                Alert.alert("Oops!","Invalid Username or Password")
            }
        })
    },[])
    const submit=()=>{
    let uname=username.trim()
    setUser(uname)
    let pass=password.trim()
    if (uname.length<4 || pass.length<4){
        Alert.alert("Oops!","Username and Password must be atleast 4 characters long")
        return
    }
    else if (uname.includes(" ") || pass.includes(" ")){
        Alert.alert("Oops!","Username and Password must not contain spaces")
        return
    }
    else{
        socket.emit('authenticate', {name:uname,pass:pass})
    }
    }
    return (
        <>
            {token==null?
        <KeyboardAvoidingView className="w-full h-full absolute justify-center items-center z-1" style={{backgroundColor:styl.bg}} behavior="padding" enabled >
            <Text className="text-2xl font-bold" style={{color:styl.t2}}>Welcome to Split/It</Text>
            <View className="w-64 "><Text className="text-md mt-4" style={{color:styl.t1}}>Username:</Text></View>
            <TextInput autoCapitalize='none' className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} onChangeText={(val)=>{setUsername(val)}} onSubmitEditing={()=>ref.current.focus()} enterKeyHint='next' blurOnSubmit={false} placeholder=""/>
            <View className="flex flex-row w-64 mt-2">
                <Text className="text-md w-[86px] " style={{color:styl.t1}}>Password:</Text>
                <Pressable className=" w-[170px] items-end"   onPress={()=>{props.navigation.navigate("ForgotPass")}}><Text  style={{color:colpal.frost.b3, fontSize:12}}>Forgot Password?</Text></Pressable>
            </View>
            <TextInput autoCapitalize='none' className="w-64 h-10 mt-1 p-2 rounded-lg" secureTextEntry={true} onChangeText={(val)=>{setPassword(val)}} style={{backgroundColor:styl.inp,color:styl.t1}} onSubmitEditing={()=>{submit();}}  ref={ref} placeholder=""/>
            
            <Pressable className=" mt-3 py-2 px-3 rounded-lg " style={{backgroundColor:colpal.colorful.green}}  onPress={()=>{console.log(username," ",password);submit();}}><Text style={{color:styl.inp}}>Login</Text></Pressable>
            <Pressable className=" w-full flex flex-row justify-center items-center mt-4"   onPress={()=>{props.navigation.navigate("Register")}}><Text style={{fontSize:12}}>Don't have an account? </Text><Text  style={{color:colpal.frost.b3, fontSize:12}}>Register</Text></Pressable>
        </KeyboardAvoidingView>:<></>
        }</>
    );
}

export default Login;
export {socket}