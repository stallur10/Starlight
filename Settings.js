import React, { useState } from 'react';
import MapView from 'react-native-maps';
import { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { Image } from 'react-native';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import { useEffect, useRef} from 'react';
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Toggle from "react-native-toggle-element";
import BottomSheet from "react-native-easy-bottomsheet";
import { getGroundTracks, getGroundTracksSync } from 'tle.js';

export default function Settings({navigation}) {




    return(
        <View style={styles.container}>









                      
<View style={{backgroundColor: '#FF4C29', position: 'absolute', justifyContent: 'center', height: '7%', top: '87%' ,borderRadius: 50, width: '75%', alignSelf: 'center'}}>
          
          <IconButton
              style={{position: 'absolute', left: '25%'}}
              icon={<Icon name="wifi" size={30} style={{ color: "black"}}/> }
              onPress={() => navigation.navigate("Info")}
          />

          <IconButton
                  style={{position: 'absolute', left: '42%'}}
                  icon={<Icon name="earth" size={45} style={{ color: "black"}}/> }
                  onPress={() => navigation.navigate("Globe")}
          />

          <IconButton
                  style={{position: 'absolute', left: '60%'}}
                  icon={<Icon name="eye" size={30} style={{ color: "black"}}/> }
                  onPress={() => navigation.navigate("Live")}
          />

          <IconButton                
                  style={{position: 'absolute', left: '10%'}}
                  icon={<Icon name="arrow-up" size={30} style={{ color: "black"}}/> }
                  onPress={() => navigation.navigate("Locate")}
          />
           <IconButton                
                  style={{position: 'absolute', left: '75%'}}
                  icon={<Icon name="circle" size={30} style={{ color: "black"}}/> }
                  onPress={() => navigation.navigate("Settings")}
          />
      </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
     backgroundColor: "black",
     height: '100%'
    },
    map: {
      width: '100%',
      height: '87%',
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      color: 'white'
    },  
    item: {
      backgroundColor: '#082032',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 0,
      color: 'white'
    },
  
  });