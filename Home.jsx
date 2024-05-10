
import { Pressable, Text, View } from "react-native";
import Login from "./Login";
import { styl,colpal,token } from "./App";
import { useEffect } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Register from "./Register";
import ForgotPass from "./ForgotPass"; 
import Icon from 'react-native-vector-icons/Ionicons';
const Tab = createBottomTabNavigator();
let redr=()=>{};
let funcc=()=>{if (token==null)
    redr();
return <></>};
function Home(props) {
    redr=()=>{
        console.log("Redirected to Login")
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
    }
    useEffect(()=>{   
        if (token==null)
            redr();
    },[props])

    return (
        <>
        
        
        <Tab.Navigator   screenOptions={{headerShown:false,tabBarStyle:{ backgroundColor:styl.fg1, height:64},tabBarActiveTintColor:colpal.frost.b3 , tabBarInactiveTintColor:styl.t2, tabBarItemStyle:{margin:5,borderRadius:10,alignItems:"center", justifyContent:"center"} }}  >
            <Tab.Screen name="Register" component={Register} options={{tabBarIcon:({size,color,focused})=>(<Icon name={focused?"people":"people-outline"} color={color}  size={size}/>)}}/>
            <Tab.Screen name="Register2" component={Register} options={{tabBarIcon:({size,color,focused})=>(<Icon name={focused?"person":"person-outline"} color={color}  size={size}/>)}}/>
            <Tab.Screen name="ForgotPass" component={ForgotPass} options={{tabBarIcon:({size,color,focused})=>(<Icon name={focused?"settings":"settings-outline"} color={color} size={size}/>)}}/>
        </Tab.Navigator>
        
        
        
        
        </>
     );
}

export default Home;