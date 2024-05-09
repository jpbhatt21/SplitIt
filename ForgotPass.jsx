import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { Text, Pressable } from 'react-native';
import { colpal, styl } from './App';
import { socket } from './Login';
import { KeyboardAvoidingView } from 'react-native';
let otp1=null
let email1=null

let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
function ForgotPass (props) {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [visible, setVisible] = useState(false);
    useEffect(()=>{
        socket.on('forgot', (data)=>{
            console.log(data)
            if (data.data[0]!="inc")
            {
                setVisible(true)
            }
            else{
                Alert.alert("Oops!","Email not found")
            }
        })
        socket.on('otp', (data)=>{
            console.log(data)
            if (data.data[0]!="inc")
            {
                
                console.log("OTP: ",otp1)
                console.log("Email: ",email1)
                props.navigation.navigate("Reset", {email:email1,otp:otp1})
            }
            else{
                Alert.alert("Oops!","Invalid OTP")
            }
        })
    },[])

    const submit=()=>{
        if (email.length<4){
            alert("Email must be atleast 4 characters long")
            return
        }
        else if (email.includes(" ")){
            alert("Email must not contain spaces")
            return
        }
        else{
            socket.emit('forgotrequest', {email:email})
        }
    }
    const submit2=()=>{
        otp1=otp
        email1=email
        socket.emit('otpverify', {email:email,otp:parseInt(otp)})
        
    }
    if (otp.length>=4)
        {
            submit2()
        }
    return (
        <>
       
        <KeyboardAvoidingView className="w-full h-full absolute justify-center items-center z-1" style={{backgroundColor:styl.bg}} behavior="padding" enabled>
            <Text className="text-2xl font-bold" style={{color:styl.t2}}>{!visible?"Forgot Password":"OTP Sent!"}</Text>
            {!visible?
            <>
             <View className="flex flex-row w-64 mt-2">
                <Text className="text-md w-[86px] " style={{color:styl.t1}}>Email:</Text>
                <Pressable className=" w-[170px] items-end"   ><Text  style={{color:colpal.colorful.red, fontSize:12,opacity:reg.test(email)||email==""?0:1}}>Invalid email</Text></Pressable>
            </View>
            <TextInput  autoCapitalize='none' className="w-64 h-10 mt-1 p-2 rounded-lg " style={{backgroundColor:styl.inp,color:styl.t1}} onChangeText={(val)=>{setEmail(val)}} onSubmitEditing={()=>{ reg.test(email)?submit():()=>{}}} enterKeyHint='done' blurOnSubmit={false} placeholder=""/>
            </>:<></>}
            {visible?
            <>
            <View className="w-64 "><Text className="text-lg mt-4" style={{color:styl.t1}}>OTP:</Text></View>
            <View className="flex flex-row w-64 mt-2 ">
            
            <Text  className="w-14 text-lg m-1 h-fit  p-2 rounded-lg text-center " style={{backgroundColor:styl.inp,color:styl.t1}}   >{otp[0]}</Text>
            <Text className="w-14 text-lg m-1 min-h-[48px] h-fit  p-2 rounded-lg text-center " style={{backgroundColor:styl.inp,color:styl.t1}} >{otp[1]}</Text>
            <Text className="w-14 text-lg m-1 h-fit  p-2 rounded-lg  text-center" style={{backgroundColor:styl.inp,color:styl.t1}} >{otp[2]}</Text>
            <Text className="w-14 text-lg justify-center m-1 h-fit  text-center  rounded-lg  p-2" style={{backgroundColor:styl.inp,color:styl.t1}} >{otp[3]}</Text>
            <TextInput keyboardType = 'numeric'  autoCapitalize='none' className="absolute w-64 h-max  p-2 rounded-lg  " style={{opacity:0}} value={otp} cursorColor={styl.bg} onChangeText={(val)=>{
                
                if (val.length>0 &&  isNaN(val[val.length-1]))
                    return
                setOtp(val)
                console.log(val)
            }} maxLength={4} textContentType='oneTimeCode' onSubmitEditing={()=>{submit2()}} enterKeyHint='done' blurOnSubmit={true} placeholder=""/>
            </View>
            </>:<></>}
            <Pressable className=" mt-3 py-2 px-3 rounded-lg mb-10 " style={{backgroundColor:colpal.colorful.green}}  onPress={()=>{visible?submit2():reg.test(email)?submit():()=>{}}}><Text style={{color:styl.inp}}>{!visible?"Send OTP":"Submit"}</Text></Pressable>
        </KeyboardAvoidingView >
        
        </>
    );
};

export default ForgotPass;
export {otp1,email1}