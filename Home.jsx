
import { Pressable, Text, View } from "react-native";
import Login from "./Login";
import { styl,colpal,token } from "./App";
import { useEffect } from "react";

let redr=()=>{};
let funcc=()=>{if (token==null)
    redr();
return <></>};
function Home(props) {
    redr=()=>{
        console.log("Redirected to Login")
        props.navigation.navigate("Login")
    }
    useEffect(()=>{   
        if (token==null)
            redr();
    },[props])

    return (
        <>
        
        <View className="w-full h-full absolute justify-center items-center" style={{backgroundColor:styl.bg}}  >
        <Text className="text-2xl font-bold" style={{color:styl.t1}}>Welcome to Split/It</Text>
        <Pressable className=" mt-6 py-2 px-3 rounded-lg " style={{backgroundColor:colpal.colorful.green}}  onPress={()=>{console.log("to Login");props.navigation.navigate("Login")}}><Text style={{color:styl.inp}}>Login</Text></Pressable>
        </View>
        
        </>
     );
}

export default Home;