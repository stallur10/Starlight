import { StyleSheet, Text, View, Pressable, Touchable } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import YoutubePlayer from 'react-native-youtube-iframe';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Toggle from "react-native-toggle-element";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";




export default ({navigation}) => {
    const ISSurl = "https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"

    const [issAlt, setissAlt] = useState(null);
    const [ISSlat, setISSlat] = useState(0)
    const [ISSlon, setISSlon] = useState(0)
    const [toggleValue, setToggleValue] = useState(false);

    useEffect(() => {

        fetch(ISSurl)
        .then((res)=> res.json())
        .then((resJson)=>{
         setissAlt(JSON.parse(resJson.positions[0].sataltitude))
        }) 
        .catch((error) => console.error(error))
  
    }, [])

    useEffect(() => {

        fetch(ISSurl)
        .then((res)=> res.json())
        .then((resJson)=>{
         setISSlat(JSON.parse(resJson.positions[0].satlatitude))
         setISSlon(JSON.parse(resJson.positions[0].satlongitude))
        }) 
        .catch((error) => console.error(error))
  
    }, [])

    return(
        <View style={styles.container}>



            <View style={{backgroundColor: '#000', alignContent: 'center', borderBottomColor: '#ff4c29', borderBottomWidth: 5, marginTop:50}}>
                <Text style={{color: 'white', marginTop: 15, textAlign: "center", fontSize: 40, fontFamily: 'Optima', marginBottom: 20}}>Live Feed</Text>
            </View>




            <View style={{marginTop: 30, borderBottomColor: '#ff4c39', borderBottomWidth: 5, marginBottom: 10}}>
                <YoutubePlayer 
                    height={250}
                    width={390}
                    play={true}
                    videoId={'4_OT4xFrjmM'}
        
                />
            </View>

            <View>
               <Pressable style={styles.button}>
                    <Text style={{color: 'black', fontFamily: 'Optima'}}>Launch Date: November 20, 1998</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={{color: 'black', fontFamily: 'Optima'}}>NORAD ID: 25544</Text>
                </Pressable>
                <Pressable style={styles.button}
>
                    <Text style={{color: 'black', fontFamily: 'Optima'}}>Altitude: {issAlt} Km</Text>
                    
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={{color: 'black', fontFamily: 'Optima'}}>Latitude: {ISSlat}</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={{color: 'black', fontFamily: 'Optima'}}>Longitude: {ISSlon}</Text>
                </Pressable>
            </View>

            
            <View style={{backgroundColor: 'rgba(255,76,41,0.6)', position: 'absolute', justifyContent: 'center', height: '7%', top: '87%' ,borderRadius: 50, width: '75%', alignSelf: 'center'}}>
          
          <IconButton
              style={{position: 'absolute', left: '22%'}}
              icon={<Icon name="calendar-minus" size={30} style={{ color: "black"}}/> }
              onPress={() => navigation.navigate("Info")}
          />

          <IconButton
                  style={{position: 'absolute', left: '43%'}}
                  icon={<Icon name="space-station" size={45} style={{ color: "black"}}/> }
                  onPress={() => navigation.navigate("Globe")}
          />

          <IconButton
                  style={{position: 'absolute', left: '62%'}}
                  icon={<Icon name="camera-iris" size={30} style={{ color: "#fff"}}/> }
                  onPress={() => navigation.navigate("Live")}
          />

          <IconButton                
                  style={{position: 'absolute', left: '5%'}}
                  icon={<Icon name="arrow-all" size={30} style={{ color: "black"}}/> }
                  onPress={() => navigation.navigate("Locate")}
          />
                <IconButton
                        style={{position: 'absolute', left: '80%'}}
                        icon={<Icon name="newspaper-variant-multiple-outline" size={30} style={{ color: "black"}}/> }
                        onPress={() => navigation.navigate("News")}
                />  
      </View>

        </View>

    
    );
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 32,
        borderRadius: 10,
        elevation: 3,
        backgroundColor: '#999999',
        marginTop: 5,
        height: 45
      },
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
})