import React, { useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, AnimatedRegion, Animated } from 'react-native-maps';
import { Image } from 'react-native';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity, FlatList, SafeAreaView, LogBox} from 'react-native';
import { useEffect, useRef} from 'react';
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import Toggle from "react-native-toggle-element";
import BottomSheet from "react-native-easy-bottomsheet";
import { getGroundTracks, getGroundTracksSync } from 'tle.js';
import { Route } from '@react-navigation/native';
//    "expo-three": "^7.0.0",



export default function GlobeView({navigation}) {

  
  const tle = useRef()
  const [ISSlat, setISSlat] = useState(0)
  const [ISSlon, setISSlon] = useState(0)

  const [SL5367lat, setSL5367lat] = useState(0)
  const [SL5367lon, setSL5367lon] = useState(0)

  const [CSSlat, setCSSlat] = useState(0)
  const [CSSlon, setCSSlon] = useState(0)

  const [satLat, setSatLat] = useState(0)
  const [satLon, setSatLon] = useState(0)

  const [toggleValue, setToggleValue] = useState(false);
  const [mapType, setMapType] = useState("satelliteFlyover");


  const [isVisible, setVisible] = useState(false);
  const [selectedId, setSelectedId] = useState("25544");

  const [satName, setSatName]= useState("ISS")

  const [traj, setTraj]= useState()

  const [trajOneLat, setTrajOneLat]= useState(0)
  const [trajOneLon, setTrajOneLon]= useState(0)

  const [trajTwoLat, setTrajTwoLat]= useState(0)
  const [trajTwoLon, setTrajTwoLon]= useState(0)

  const [trajThreeLat, setTrajThreeLat]= useState(0)
  const [trajThreeLon, setTrajThreeLon]= useState(0)

  const [trajFourLat, setTrajFourLat]= useState(0)
  const [trajFourLon, setTrajFourLon]= useState(0)

  const [trajFiveLat, setTrajFiveLat]= useState(0)
  const [trajFiveLon, setTrajFiveLon]= useState(0)

  const [trajSixLat, setTrajSixLat]= useState(0)
  const [trajSixLon, setTrajSixLon]= useState(0)

  const [trajSevenLat, setTrajSevenLat]= useState(0)
  const [trajSevenLon, setTrajSevenLon]= useState(0)

  const [trajEightLat, setTrajEightLat]= useState(0)
  const [trajEightLon, setTrajEightLon]= useState(0)

  const [trajNineLat, setTrajNineLat]= useState(0)
  const [trajNineLon, setTrajNineLon]= useState(0)

  const [trajTenLat, setTrajTenLat]= useState(0)
  const [trajTenLon, setTrajTenLon]= useState(0)

  
  const [trajElevenLat, setTrajElevenLat]= useState(0)
  const [trajElevenLon, setTrajElevenLon]= useState(0)

  const [selectedItem, setSelectedItem] = useState("25544")

  //Array of button
  //call function and pass Norad ID that changes selected ID
  
  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id)
          setVisible(false)
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };
//Skynet
//XM
//NAvstar
//MeteoSat
  const K_OPTIONS = [
    {id: '25544', item: 'ISS' },
    {id: '55501', item: 'Starlink-5367' },
    {id: '48274', item: 'CSS' },
    {id: '42061', item: 'TK-1' },
    {id: '28492', item: 'HELIOS-2A' },
    {id: '39768', item: 'SOCRATES' },
  ];



  const ISSurl = "https://api.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"
  const SL5367Url ="https://api.n2yo.com/rest/v1/satellite/positions/55501/41.702/-76.014/0/2/&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"
  const CSSurl ="https://api.n2yo.com/rest/v1/satellite/positions/48274/41.702/-76.014/0/2/&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"
  const satUrl="https://api.n2yo.com/rest/v1/satellite/positions/"+selectedItem+"/41.702/-76.014/0/2/&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"
  const tleURL="https://api.n2yo.com/rest/v1/satellite/tle/"+selectedItem+"&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"


  const Item = ({item, onPress, backgroundColor, textColor}) => (
    <TouchableOpacity onPress={onPress} style={{backgroundColor: '#FF4C29', padding: '6%', marginVertical: '5%', borderRadius: '30%'}}>
      <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
    </TouchableOpacity>
  );

//tle
useEffect(() => {

  fetch(tleURL)
  .then((res)=> res.json())
  .then((resJson)=>{
   tle.current = (resJson.tle)
   console.log(tle.current)
      getGroundTracks({
          tle: tle.current,
          startTimeMS: Date.now(),
          stepMS: 500000,
          isLngLatFormat: true,
        }).then(function (threeOrbitsArr) {
            //console.log(threeOrbitsArr)
          try {
          setTrajOneLat(threeOrbitsArr[1][0][1])
          setTrajOneLon(threeOrbitsArr[1][0][0])
          setTrajTwoLat(threeOrbitsArr[1][1][1])
          setTrajTwoLon(threeOrbitsArr[1][1][0])
          setTrajThreeLat(threeOrbitsArr[1][2][1])
          setTrajThreeLon(threeOrbitsArr[1][2][0])
          setTrajFourLat(threeOrbitsArr[1][3][1])
          setTrajFourLon(threeOrbitsArr[1][3][0])
          setTrajFiveLat(threeOrbitsArr[1][4][1])
          setTrajFiveLon(threeOrbitsArr[1][4][0])
          setTrajSixLat(threeOrbitsArr[1][5][1])
          setTrajSixLon(threeOrbitsArr[1][5][0])
          setTrajSevenLat(threeOrbitsArr[1][6][1])
          setTrajSevenLon(threeOrbitsArr[1][6][0])
          setTrajEightLat(threeOrbitsArr[1][7][1])
          setTrajEightLon(threeOrbitsArr[1][7][0])
          setTrajNineLat(threeOrbitsArr[1][8][1])
          setTrajNineLon(threeOrbitsArr[1][8][0])
          setTrajTenLat(threeOrbitsArr[1][9][1])
          setTrajTenLon(threeOrbitsArr[1][9][0])
          setTrajElevenLat(threeOrbitsArr[1][10][1])
          setTrajElevenLon(threeOrbitsArr[1][10][0])
          } catch (e ) {   
            
          }
          
      });



  }) 
  .catch((error) => console.log("hi"))

}, [selectedItem])

  useEffect(() => {

    fetch(satUrl)
    .then((res)=> res.json())
    .then((resJson)=>{
     setSatLat(JSON.parse(resJson.positions[0].satlatitude))
     setSatLon(JSON.parse(resJson.positions[0].satlongitude))
    }) 
    .catch((error) => console.error(error))

}, [selectedItem])



  useEffect(() => {

    if(!toggleValue){
      setMapType("satelliteFlyover")
    }
    else{
      setMapType("satellite")
    }

}, [toggleValue])






  return (

  <View style={styles.container}>

      <View style={{height: '10%',  justifyContent: 'center', marginLeft: '5%', marginTop: '7%'}}>

  
      <View style={{width: 90, backgroundColor: 'black', position: 'absolute'}}>
        <Toggle
          value={toggleValue}
          onPress={(newState) => setToggleValue(newState)}
          leftTitle="3D"
          rightTitle="2D"
          trackBar={{
            activeBackgroundColor: "black",
            inActiveBackgroundColor: "black",
            borderActiveColor: "#999999",
            borderInActiveColor: "#999999",
            borderWidth: 4,
            width: 90,
          
          }}
          thumbButton={{
            activeBackgroundColor: "#FF4C29",
            inActiveBackgroundColor: "#fff",
          }}
        />
        </View>

        

        <View style={{position:'absolute', backgroundColor:'black', marginLeft: '30%', justifyContent: 'center', alignItems: 'flex-end', width:'60%'}}>
            <Text style={{color: 'white', fontSize: 40}}>
            {satName}
          </Text>
        </View>
     

  

        
      </View>

      <View style={{height: '7%',  justifyContent: 'center',backgroundColor: 'black'}}>
            <ScrollView horizontal= {true} showsHorizontalScrollIndicator={false}>
            {
              
                K_OPTIONS.map((title, i) => {
                    return (
                      <View key={K_OPTIONS[i].id} style={{justifyContent:'center'}}>
                        <TouchableOpacity style={{backgroundColor: '#FF4C29', marginLeft: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50}} onPress={() => { setSelectedItem(K_OPTIONS[i].id); setSatName(K_OPTIONS[i].item)}}>
                            <Text>{K_OPTIONS[i].item}</Text>
                        </TouchableOpacity>
                        </View>
                    )
                })
              
            }  
            </ScrollView>

        </View>

            <MapView 
              style={styles.map} 
              initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
              }}

            
             // provider={PROVIDER_GOOGLE}
              zoomEnabled={true}
              showsUserLocation={true}
              mapType={mapType}
              scrollEnabled="true"
              zoomTapEnabled="false"
              scrollDuringRotateOrZoomEnabled="true"
              showsTraffic="true"
              apiKey="AIzaSyCFTdrArG594ByWbAoZxsh8l3kdfP0HJk4"

            >
               
              {/* {
                selectedItems.map((item) => {
                    setSelectedId(item.id)
                      return (
                        <View>
                          <Marker 
                            coordinate={{
                                latitude: satLat,
                                longitude: satLon,
                            }}
                            pinColor="purple"
                          >
                            <Image source={require('./assets/satIcon.png')} style={{height: 20, width: 20 }} />
                        </Marker>
                        </View>
                        
                      )
                
                  
                })
              } */}


                 


 
                  <Marker 
                      coordinate={{
                          latitude: satLat,
                          longitude: satLon,
                      }}
                  >
                      <Image source={require('./assets/SL5367.png')} style={{height: 30, width: 60 }} />
                  </Marker>


                  <Marker 
                      coordinate={{
                          latitude: trajOneLat,
                          longitude: trajOneLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>

                  <Marker 
                      coordinate={{
                          latitude: trajTwoLat,
                          longitude: trajTwoLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>

                  <Marker 
                      coordinate={{
                          latitude: trajThreeLat,
                          longitude: trajThreeLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>
                  
                  <Marker 
                      coordinate={{
                          latitude: trajFourLat,
                          longitude: trajFourLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>

                  <Marker 
                      coordinate={{
                          latitude: trajFiveLat,
                          longitude: trajFiveLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>

                  
                  <Marker 
                      coordinate={{
                          latitude: trajSixLat,
                          longitude: trajSixLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>


                  <Marker 
                      coordinate={{
                          latitude: trajSevenLat,
                          longitude: trajSevenLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>

                  
                  <Marker 
                      coordinate={{
                          latitude: trajEightLat,
                          longitude: trajEightLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>
              
                  <Marker 
                      coordinate={{
                          latitude: trajNineLat,
                          longitude: trajNineLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>
                  
                  <Marker 
                      coordinate={{
                          latitude: trajTenLat,
                          longitude: trajTenLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>

                  <Marker 
                      coordinate={{
                          latitude: trajElevenLat,
                          longitude: trajElevenLon,
                      }}
                  >
                      <Image source={require('./assets/GreenDot.png')} style={{height: 10, width: 10 }} />
                  </Marker>
            </MapView>

     
                
            <View style={{backgroundColor: 'rgba(255,76,41,0.6)', position: 'absolute', justifyContent: 'center', height: '7%', top: '87%' ,borderRadius: 50, width: '75%', alignSelf: 'center'}}>
          
          <IconButton
              style={{position: 'absolute', left: '22%'}}
              icon={<Icon name="calendar-minus" size={30} style={{ color: "black"}}/> }
              onPress={() => navigation.navigate("Info")}
          />

          <IconButton
                  style={{position: 'absolute', left: '43%'}}
                  icon={<Icon name="space-station" size={45} style={{ color: "white"}}/> }
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
        {/* <View style={{height: '3%', backgroundColor: 'gray'}}>

        </View> */}

        
    </View>

  );

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
    flex: 1
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

