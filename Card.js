import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ScrollView, Linking, ImageBackground} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Card({title, description, imageUrl, link}) {
  return (
   <TouchableOpacity style={{height: 250, marginBottom: 25, width: 365, shadowColor: "#999999", shadowOffset: {width: -1, height: 2}, shadowOpacity: 1,shadowRadius: 3,}} onPress={() => Linking.openURL(link)}>
          <ImageBackground source={{uri: imageUrl}} resizeMode="cover" style={{flex: 1, justifyContent: 'center'}} imageStyle={{borderRadius: 30}}>
            <View 
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: "center",
                backgroundColor: 'rgba(0,0,0,0.5)',
                borderRadius: 30
              }}
            >
            <Text style={{color: 'white', textAlign: "center", fontFamily: 'Optima', fontSize: 20, fontStyle: 'normal', marginBottom: 15}}>{title}</Text>
            </View>
            </ImageBackground>
        </TouchableOpacity>

  );
};



export default Card;