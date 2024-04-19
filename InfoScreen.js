import { StyleSheet, Text, View, Image, Dimensions, Easing, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from 'expo-location';
import React, { useState } from 'react';
import { useEffect, useRef } from 'react';
import { SelectList } from "react-native-dropdown-select-list";
import moment from "moment/moment";
import Card from "react-native-card-component";
import { LogBox, YellowBox } from "react-native";
//my coords: 42.027217, -88.086087
export default function InfoScreen({navigation}){


    const userLat = useRef("41");
    const userLon = useRef("-76");
    const [errorMsg, setErrorMsg] = useState(null);
    const [selected, setSelected] = useState("25544")
    const [passDur, setPassDur] = useState("Loading...")
    const [unixTime, setUnixTime] = useState("Loading...")
    const [formattedDate, setFormattedDate] = useState("Now");
    const [imgSrc, setImgSrc] = useState("./assets/ISS.png");
    const [startDir, setStartDir] = useState("Loading...");
    const [vis, setVis] = useState("N/A");
    const [dur, setDur] = useState(0);
    const [satName, setSatName] = useState("ISS");



    const dateImage = {uri: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Earth_from_Space.jpg'};
    const durImage ={uri: 'https://images.pexels.com/photos/1186851/pexels-photo-1186851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
    const dirImage = {uri: 'https://images.unsplash.com/photo-1598944999410-e93772fc48a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1478&q=80'}
    const wetImage = {uri: 'https://rare-gallery.com/mocahbig/439179-clouds-sky-night-nature-dark-stars.jpg'}

    const infoUrl ="https://api.n2yo.com/rest/v1/satellite/visualpasses/"+selected+"/"+userLat.current+"/"+userLon.current+"/0/50/10/&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"
    const weatherUrl ="https://api.tomorrow.io/v4/weather/forecast?location="+userLat.current+","+userLon.current+"&apikey=Ad4ZCDvPAvcOQOdbT9bpqFNuA2iPaAGr"
    //API gets

    
    //Get User Lat + Lon
    useEffect(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let ula = await Location.getCurrentPositionAsync({});
        userLat.current=(ula.coords.latitude)
        let ulo = await Location.getCurrentPositionAsync({});
        userLon.current=(ulo.coords.longitude)
      })();
      
    }, []);

    useEffect(() => {
      fetch(infoUrl)
      .then((res)=> res.json())
      .then((resJson)=>{
      setPassDur(JSON.stringify(resJson.passes[0].duration))
      setUnixTime(JSON.stringify(resJson.passes[0].startUTC))
      setStartDir(JSON.stringify(resJson.passes[0].startAzCompass).replace(/["]+/g, ''))
      }) 
      .catch((error) => console.error(error))
    },[selected])



    //weather
    useEffect(() => {
      fetch(weatherUrl)
      .then((res)=> res.json())
      .then((resJson)=>{

        var today= moment().unix()
        var timeDifference= Math.round((unixTime-today)/86400)
        if(timeDifference<5){
          setDur(timeDifference)
          setVis(JSON.stringify(resJson.timelines.daily[dur].values.cloudCoverAvg))
        }
        else{
          setDur(0)
          setVis("N/A")
        }

      }) 
      .catch()
    },[unixTime])

    const K_OPTIONS = [
      {id: '25544', item: 'ISS' },
      {id: '55501', item: 'Starlink-5367' },
      {id: '48274', item: 'CSS' },
      {id: '42061', item: 'TK-1' },
      {id: '28492', item: 'HELIOS-2A' },
      {id: '39768', item: 'SOCRATES' },
    ];

    //get pass start time
    useEffect(() => {
       setFormattedDate(moment(unixTime,"X").format('MMMM Do YYYY, h:mm:ss a').toString());

    },[unixTime])

    useEffect(() => {
     if(selected=='25544'){
        setImgSrc(require("./assets/ISS.png"))
     }
     else if(selected=='55501'){
      setImgSrc(require("./assets/SL5367.png"))
     }
     else if(selected=='48274'){
      setImgSrc(require("./assets/CSS.png"))
     }
    },[selected])

   


    
    return(
        <View style={styles.container}>


          

              

          <View style={{backgroundColor: 'black', height: '18%', width: '100%', justifyContent:'flex-end', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'white'}}>
              <Text style={{color: 'white', fontSize: 40, fontFamily: 'Optima', marginBottom: 10}}>Overhead Passes</Text>
              <Text style={{color: 'white', fontSize: 15, fontFamily: 'Optima', marginBottom: 10}}>Viewing: {satName}</Text>
          </View>

          <View style={{backgroundColor: 'black', height: '7%', width: '100%', borderBottomWidth: 1, borderBottomColor: 'white'}}>
          <ScrollView horizontal= {true} showsHorizontalScrollIndicator={false}>
              {
                
                  K_OPTIONS.map((title, i) => {
                      return (
                        <View key={K_OPTIONS[i].id} style={{justifyContent:'center'}}>
                          <TouchableOpacity style={{backgroundColor: '#FF4C29', marginLeft: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50}} onPress={() => { setSelected(K_OPTIONS[i].id); setSatName(K_OPTIONS[i].item)}}>
                              <Text>{K_OPTIONS[i].item}</Text>
                          </TouchableOpacity>
                          </View>
                      )
                  })
                
              }  
              </ScrollView>
          </View>


          <ScrollView snapToInterval={455} snapToAlignment={ "center"} decelerationRate={0} horizontal ={true} style={{backgroundColor: 'black', height: 370, width: 400}} contentContainerStyle={{ alignItems: 'center'}} showsHorizontalScrollIndicator={false}>
                   
                     <View style={{height: '70%'}}>
                      <View style={{height: 800 ,backgroundColor: 'white', width: 370, height: 370, borderRadius: 1000, borderColor: '#999999', borderWidth: '5%', marginLeft: 20, marginRight: 105}}>
                        <ImageBackground source={dateImage} resizeMode="cover" style={{flex: 1, justifyContent: 'center'}} imageStyle={{borderRadius: 1000}}>
                            <View 
                              style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0,0,0,0.7)',
                                borderRadius: 1000
                              }}
                            >
                            <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold', fontWeight: '900', fontFamily: 'Optima'}}>{formattedDate}</Text>
                            </View>
                        </ImageBackground>
                      </View>
                     </View>


                     <View style={{height: '70%'}}>
                      <View style={{backgroundColor: 'white', width: 370, height: 370, borderRadius: 1000, borderColor: '#999999', borderWidth: '5%', marginRight: 85}}>
                        <ImageBackground source={durImage} resizeMode="cover" style={{flex: 1, justifyContent: 'center'}} imageStyle={{borderRadius: 1000}}>
                            <View 
                              style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                borderRadius: 1000
                              }}
                            >
                            <Text style={{color: 'white', fontSize: 23, fontWeight: 'bold', fontWeight: '900', fontFamily: 'Optima'}}>Pass Duration: {passDur} Seconds</Text>
                            </View>
                        </ImageBackground>
                      </View>
                      </View>

                      <View style={{height: '70%'}}>
                      <View style={{backgroundColor: 'white', width: 370, height: 370, borderRadius: 1000, borderColor: '#999999', borderWidth: '5%', marginRight: 87}}>
                        <ImageBackground source={wetImage} resizeMode="cover" style={{flex: 1, justifyContent: 'center'}} imageStyle={{borderRadius: 1000}}>
                            <View 
                              style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 1000
                              }}
                            >
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', fontWeight: '900', fontFamily: 'Optima'}}>Sky: {vis}% Covered </Text>
                            </View>
                        </ImageBackground>
                      </View>
                      </View>

                    <View style={{height: '70%'}}>
                      <View style={{backgroundColor: 'white', width: 370, height: 370, borderRadius: 1000, borderColor: '#999999', borderWidth: '5%', marginRight :100, justifyContent: 'center'}}>
                        <ImageBackground source={dirImage} resizeMode="cover" style={{flex: 1, justifyContent: 'center'}} imageStyle={{borderRadius: 1000}}>
                            <View 
                              style={{
                                flex: 1,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                borderRadius: 1000
                              }}
                            >
                            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', fontWeight: '900', alignSelf: 'center', fontFamily: 'Optima'}}>Pass Start Direction: {startDir} </Text>
                            </View>
                        </ImageBackground>
                      </View>
                      </View>
          </ScrollView>


               
          <View style={{backgroundColor: 'rgba(255,76,41,0.6)', position: 'absolute', justifyContent: 'center', height: '7%', top: '87%' ,borderRadius: 50, width: '75%', alignSelf: 'center'}}>
          
          <IconButton
              style={{position: 'absolute', left: '22%'}}
              icon={<Icon name="calendar-minus" size={30} style={{ color: "white"}}/> }
              onPress={() => navigation.navigate("Info")}
          />

          <IconButton
                  style={{position: 'absolute', left: '43%'}}
                  icon={<Icon name="space-station" size={45} style={{ color: "black"}}/> }
                  onPress={() => navigation.navigate("Globe")}
          />

          <IconButton
                  style={{position: 'absolute', left: '62%'}}
                  icon={<Icon name="camera-iris" size={30} style={{ color: "#000"}}/> }
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
    container: {
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
      position: 'absolute',
      top: '20%',
      justifyContent: 'center',
      backgroundColor: 'black',
      height: '30%',
      width: '80%',
      borderColor: '#FF4C29',
      borderWidth: '5%',
      resizeMode: 'contain'
    }
})