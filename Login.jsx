import { useEffect, useRef,useState } from 'react';
import { Text, View, TextInput, Button, Pressable, Image } from 'react-native';
import { styl,colpal,user,token,uid, setToken, setUid, setUser } from './App';
import GridLines from './grid';
import { io } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage';  
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
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
                props.navigation.navigate("Home")
            }
            else{
                alert("Invalid Username or Password")
            }
        })
    },[])
    const submit=()=>{
    let uname=username.trim()
    setUser(uname)
    let pass=password.trim()
    if (uname.length<4 || pass.length<4){
        alert("Username and Password must be atleast 4 characters long")
        return
    }
    else if (uname.includes(" ") || pass.includes(" ")){
        alert("Username and Password must not contain spaces")
        return
    }
    else{
        socket.emit('authenticate', {name:uname,pass:pass})
    }
    }
    return (
        <>
        <View className="w-full h-full absolute justify-center items-center" style={{backgroundColor:styl.bg}}  >
            {token==null?
        <View className="w-full h-full absolute justify-center items-center z-1"  >
            <Text className="text-2xl font-bold" style={{color:styl.t1}}>Welcome to Split/It</Text>
            <TextInput autoCapitalize='none' className="w-64 h-10 mt-6 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} onChangeText={(val)=>{setUsername(val)}} onSubmitEditing={()=>ref.current.focus()} enterKeyHint='next' blurOnSubmit={false} placeholder="Username"/>
            <TextInput autoCapitalize='none' className="w-64 h-10 mt-2 p-2 rounded-lg" secureTextEntry={true} onChangeText={(val)=>{setPassword(val)}} style={{backgroundColor:styl.inp,color:styl.t1}} onSubmitEditing={()=>{submit();}}  ref={ref} placeholder="Password"/>
            <Pressable className=" mt-6 py-2 px-3 rounded-lg " style={{backgroundColor:colpal.colorful.green}}  onPress={()=>{console.log(username," ",password);submit();}}><Text style={{color:styl.inp}}>Login</Text></Pressable>
        </View>:<></>
        }
        </View>
        </>
    );
}

export default Login;
export {socket}