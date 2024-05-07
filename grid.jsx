import React from 'react';
import { View } from 'react-native';

function GridLines() {
    const rows = [...Array(10).keys()];
    const cols = [...Array(10).keys()];
    let rs=rows.map((row) => (
        <View className="flex flex-row" key={row}>
            
            <View className="w-full h-0 m-[5vw] border border-gray-300" />
        </View>
    ));
    let cs=cols.map((col) => (   <View className="flex flex-row" key={col}>
            
    <View className="w-full h-0 m-5 border border-gray-300" />
</View>));

    return (
        <View className="flex-1  items-center">
           
            
            <View className="absolute top-1/4 ">
            {rs}
            </View>
            <View className="absolute top-[22.5%] rotate-90">
            {rs}
            </View>


        </View>
    );
}

export default GridLines;