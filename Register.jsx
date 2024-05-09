import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Text, Pressable } from 'react-native';
import { colpal, styl } from './App';
import { socket } from './Login';
import { KeyboardAvoidingView } from 'react-native';
let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
function Register(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const ref1=useRef()
    const ref2=useRef()
    const ref3=useRef()
    const [emop, setEmop] = useState(0);

    const submit = () => {
        if (password !== confirmPassword) {
            Alert.alert("Oops!", "Passwords do not match");
            return;
        }
        if (username.length < 4 || password.length < 4) {
            Alert.alert("Oops!", "Username and Password must be at least 4 characters long");
            return;
        }
        if (username.includes(" ") || password.includes(" ")) {
            Alert.alert("Oops!", "Username and Password must not contain spaces");
            return;
        }
        // Emit event to server to register user
        console.log(username, email, password);
    }

    return (
        <KeyboardAvoidingView className="w-full h-full absolute justify-center items-center" style={{backgroundColor:styl.bg}} behavior="padding" enabled>
            <Text className="text-2xl font-bold" style={{color:styl.t2}}>Register</Text>
            <View className="flex flex-row w-64 mt-2">
                <Text className="text-md w-[86px] " style={{color:styl.t1}}>Username:</Text>
                <Pressable className=" w-[170px] items-end"   ><Text  style={{color:colpal.colorful.red, fontSize:12,opacity:reg.test(email)?0:0}}>Username Taken!</Text></Pressable>
            </View>
            <TextInput autoCapitalize='none' className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} enterKeyHint='next' onSubmitEditing={()=>ref1.current.focus()} blurOnSubmit={false} onChangeText={setUsername} />
            <View className="flex flex-row w-64 mt-2">
                <Text className="text-md w-[86px] " style={{color:styl.t1}}>Email:</Text>
                <Pressable className=" w-[170px] items-end"   ><Text  style={{color:colpal.colorful.red, fontSize:12,opacity:reg.test(email)?0:emop}}>Invalid email</Text></Pressable>
            </View>
            <TextInput autoCapitalize='none' ref={ref1} className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} enterKeyHint='next' onSubmitEditing={()=>{reg.test(email)?setEmop(0):setEmop(1) ;ref2.current.focus()}} blurOnSubmit={false} onChangeText={setEmail} />
            <View className="w-64 "><Text className="text-md mt-2" style={{color:styl.t1}}>Password:</Text></View>
            <TextInput autoCapitalize='none' ref={ref2} secureTextEntry={true} className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} enterKeyHint='next' onSubmitEditing={()=>ref3.current.focus()} blurOnSubmit={false} onChangeText={setPassword} />
            <View className="w-64 "><Text className="text-md mt-2" style={{color:styl.t1}}>Confirm Password:</Text></View>
            <TextInput autoCapitalize='none' ref={ref3} secureTextEntry={true} className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} onChangeText={setConfirmPassword} onSubmitEditing={()=>{reg.test(email)?submit():()=>{}}} />
            <Pressable className=" mt-6 py-2 px-3 rounded-lg " style={{backgroundColor:colpal.colorful.green}} onPress={()=>{reg.test(email)?submit():()=>{}}}><Text style={{color:styl.inp}}>Register</Text></Pressable>
        </KeyboardAvoidingView>
    );
}

export default Register;