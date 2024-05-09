import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Text, Pressable } from 'react-native';
import { colpal, styl } from './App';
import { socket } from './Login';
import { KeyboardAvoidingView } from 'react-native';
import { otp1,email1 } from './ForgotPass';
function ResetPassword(props) {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const ref=useRef()
    useEffect(()=>{
        socket.on('reset', (data)=>{
            console.log(data)
            if (data.data[0]!="inc")
            {
                Alert.alert("Success","Password Reset Successfully")
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                  });
            }
            else{
                Alert.alert("Oops!","Invalid OTP")
            }
        })
    },[])
    const submit = () => {
        if (password !== confirmPassword) {
            Alert.alert("Oops!", "Passwords do not match");
            return;
        }
        if (password.length < 4) {
            Alert.alert("Oops!", "Password must be at least 4 characters long");
            return;
        }
        if (password.includes(" ")) {
            Alert.alert("Oops!", "Password must not contain spaces");
            return;
        }
        // Emit event to server to reset password
        console.log(props.email,props.otp,password);
        socket.emit('resetpass', { email:props.route.params.email , otp:parseInt( props.route.params.otp), pass: password});
    }

    return (
        
        <KeyboardAvoidingView className="w-full h-full absolute justify-center items-center" style={{backgroundColor:styl.bg}} behavior="padding" enabled>
            <Text className="text-2xl font-bold" style={{color:styl.t2}}>Reset Password</Text>
            <View className="w-64 "><Text className="text-md mt-4" style={{color:styl.t1}}>New Password:</Text></View>
            <TextInput autoCapitalize='none' secureTextEntry={true} className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} enterKeyHint='next' onSubmitEditing={()=>ref.current.focus()} blurOnSubmit={false} onChangeText={setPassword} />
            <View className="w-64 "><Text className="text-md mt-4" style={{color:styl.t1}}>Confirm Password:</Text></View>
            <TextInput autoCapitalize='none' ref={ref} secureTextEntry={true} className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} onChangeText={setConfirmPassword} onSubmitEditing={submit} />
            <Pressable className=" mt-6 py-2 px-3 rounded-lg " style={{backgroundColor:colpal.colorful.green}} onPress={submit}><Text style={{color:styl.inp}}>Reset Password</Text></Pressable>
        </KeyboardAvoidingView>
    );
}

export default ResetPassword;