import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground, LogBox } from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import * as Location from 'expo-location';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { SelectList } from "react-native-dropdown-select-list";
import { DeviceMotion } from 'expo-sensors';
import BottomSheet from "react-native-easy-bottomsheet";

export default function LocateSatellite({navigation}) {

    const [heading, setHeading] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [satHeading, setSatHeading] = useState(0);
    const [userLat, setUserLat] = useState("41");
    const [userLon, setUserLon] = useState("-76");
    const [satAngles, setSatAngles] = useState(0)
    const [pitch, setPitch]=useState(0)
    const [color, setColor]=useState("#FF4C29")
    const [headingColor, setHeadingColor]=useState("#333333")
    const [pitchColor, setPitchColor]=useState("#333333")
    const [selected, setSelected] = useState("25544")
    const [satName, setSatName] = useState("ISS");
    const [isVisible, setVisible] = useState(false);
    const [path, setPath]= useState(require('./assets/RightArrow.png'))
    const [pathPitch, setPathPitch]= useState(require('./assets/RightArrow.png'))
    const userEl=useRef(6)
    const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
      'Wait, we are fetching you location...'
    );

    const _setInterval = () => {
      DeviceMotion.setUpdateInterval(90);
    };

    const K_OPTIONS = [
      {id: '25544', item: 'ISS' },
      {id: '55501', item: 'Starlink-5367' },
      {id: '48274', item: 'CSS' },
      {id: '42061', item: 'TK-1' },
      {id: '28492', item: 'HELIOS-2A' },
      {id: '39768', item: 'SOCRATES' },
    ];

    const infoUrl ="https://api.n2yo.com/rest/v1/satellite/positions/"+selected+"/"+userLat+"/"+userLon+"/0/2/&apiKey=59NFTR-MU6QRQ-43WHQR-4ZPM"
    const dirImage = {uri: 'https://images.unsplash.com/photo-1598944999410-e93772fc48a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1478&q=80'}

    useEffect(() => {
      if(heading<=satHeading+5 && heading>=satHeading-5){
        setHeadingColor('green')
      }
      else(
        setHeadingColor('#999999')
      )

      if(pitch<=satAngles+5 && pitch>=satAngles-5){
        setPitchColor('green')
      }
      else{
        setPitchColor('rgba(153,153,153,0.8)')
      }
      
   },[pitch])






   useEffect(() => {
    if((satHeading-heading)>0){
      setPath(require('./assets/PointPhoneRight.png'))
    }
    else if((heading-satHeading)>0){
      setPath(require('./assets/PointPhoneLeft.png'))
    }

    if((satAngles-pitch)>(pitch-satAngles)){
      setPathPitch(require('./assets/PhonePointUp.png'))
    }
    else if((pitch-satAngles)>(satAngles-pitch)){
      setPathPitch(require('./assets/PhonePointDown.png'))
    }
    
 },[heading])




    //User pitch
    useEffect(() => {
      //Subscribe Function
      _subscribe();
      //Call Once when Screen unloads
      return () => {
        _unsubscribe(); //Unsubscribe Function
      };
    }, []);


    //sat Heading + Pitch
    useEffect(() => {
      fetch(infoUrl)
      .then((res)=> res.json())
      .then((resJson)=>{
      setSatHeading(Number.parseFloat(JSON.stringify(resJson.positions[0].azimuth)))
      setSatAngles((Number.parseFloat(JSON.stringify(resJson.positions[0].elevation))))
      }) 
      .catch((error) => console.error(error))
    },[selected])

    
    //User Lat+ Lon
    useEffect(() => {
        (async () => {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
            }
    
            let userCoords = await Location.getCurrentPositionAsync({});
            setUserLat(userCoords.coords.latitude.toFixed(2))
            setUserLon(userCoords.coords.longitude.toFixed(2))

           
              const tempLat=userCoords.coords.latitude
              const tempLon=userCoords.coords.longitude

              let response = await Location.reverseGeocodeAsync({
                tempLat,
                tempLon
              });
              console.log("hi"+response)
              for (let item of response) {
                let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
          
                setDisplayCurrentAddress(address);
              }
            
         
            
        })();
        
        }, []);

        //user heading
    useEffect(() => {
        (async () => {
            
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
        
            let heading = await Location.getHeadingAsync({});
            setHeading(Number.parseFloat(heading.magHeading).toFixed(2));
        })();
    });

    const _subscribe = () => {
      //Adding the Listener
      DeviceMotion.addListener((devicemotionData) => {
        setPitch(Number.parseFloat(devicemotionData.rotation.beta*60).toFixed(2));
      });
      //Calling setInterval Function after adding the listener
      _setInterval();
    };

    const _unsubscribe = () => {
      //Removing all the listeners at end of screen unload
      DeviceMotion.removeAllListeners();
    };

  return (


    <View style={styles.container}>

          <View style={{backgroundColor: 'black', height: '18%', width: '100%', justifyContent:'flex-end', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: 'white'}}>
              <Text style={{color: 'white', fontSize: 40, fontFamily: 'Optima', marginBottom: 10}}>Satellite Pointer</Text>
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

          <View style={{backgroundColor: pitchColor, width: 300, height: 300, borderRadius: 300, marginTop: '10%', justifyContent: 'center', borderWidth: 5, borderColor: 'white'}}>
                <Image  style={{width: 320, height: 320}} source={pathPitch}></Image>
          </View>

          
          <View style={{backgroundColor: headingColor, width: 150, height: 150, borderRadius: 150, position: 'absolute', top: 510, alignItems: 'center', justifyContent: 'center',  borderWidth: 5, borderColor: 'white'}}>
                <Image  style={{width: 180, height: 180}} source={path}></Image>
          </View>
            
          <View style={{marginTop: 130, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: '#fff', marginBottom: 5, fontFamily: 'Optima', fontSize: 18}}>Latitude: {userLat}   Longitude: {userLon}</Text>
              <Text style={{color: '#fff', fontFamily: 'Optima'}}>Starlight</Text>

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
                  icon={<Icon name="camera-iris" size={30} style={{ color: "#000"}}/> }
                  onPress={() => navigation.navigate("Live")}
          />

          <IconButton                
                  style={{position: 'absolute', left: '5%'}}
                  icon={<Icon name="arrow-all" size={30} style={{ color: "white"}}/> }
                  onPress={() => navigation.navigate("Locate")}
          />
                <IconButton
                        style={{position: 'absolute', left: '80%'}}
                        icon={<Icon name="newspaper-variant-multiple-outline" size={30} style={{ color: "black"}}/> }
                        onPress={() => navigation.navigate("News")}
                />  
      </View>
    </View>

//     <View style={{justifyContent:'center'}}>



//     <View style={{backgroundColor: pitchColor, height: '50%'}}>
      
//     <View style={{justifyContent: 'center', alignItems: 'center', width: '100%', height: '37%'}}>
//     <View style={{justifyContent: 'center',backgroundColor: 'black'}}>
//             <ScrollView horizontal= {true} showsHorizontalScrollIndicator={false}>
//             {
              
//                 K_OPTIONS.map((title, i) => {
//                     return (
//                       <View key={K_OPTIONS[i].id} style={{justifyContent:'center'}}>
//                         <TouchableOpacity style={{backgroundColor: '#FF4C29', marginLeft: 10, width: 100, justifyContent: 'center', alignItems: 'center', borderRadius: 10, height: 50}} onPress={() => { setSelected(K_OPTIONS[i].id); setSatName(K_OPTIONS[i].item)}}>
//                             <Text>{K_OPTIONS[i].item}</Text>
//                         </TouchableOpacity>
//                         </View>
//                     )
//                 })
              
//             }  
//             </ScrollView>

//         </View>
// </View>
  
//       <View style={{backgroundColor: 'black', width: '80%', height: '90%', justifyContent: 'flex-end', alignItems: 'center', left: '10%'}}>
//       <TouchableOpacity 
//           onPress={() =>  alert("Make sure your device is horizontal. Follow directions to locate satellite:              X = Top half of device down                           O = Top half of device up                     >>=right, <<=left")}
//           style={{
//             backgroundColor:'#FF4C29',
//             width: '10%',
//             height: '7.5%',
//             position: 'absolute', 
//             left: '8%',  
//             justifyContent: 'center',
//             padding: '10%',
//             borderRadius: '20%',
//             alignContent: 'center',
//             alignItems: 'center',
//             top: '20%'
//           }}
//           >

//           <Text>i</Text>
//         </TouchableOpacity>





//         <View style={{backgroundColor: 'black', width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 298}}>
             
//              <View style={{backgroundColor: '#999999', width: 270, height: 270, borderRadius: 1000, borderColor: '#999999', borderWidth: '0%', justifyContent: 'center', alignItems: 'center', marginBottom: 150, shadowOpacity: .8,shadowRadius: 3, shadowColor: '#999999'}}>
//              <Image  style={{width: 250, height: 220}} source={pathPitch}></Image>

//                    {/* <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', fontWeight: '900', alignSelf: 'center'}}>My Heading: {heading}</Text>
//                    <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', fontWeight: '900', alignSelf: 'center'}}>Heading:{satHeading}</Text> */}
            
//              </View>
 
//        </View>
//       </View>


//     </View>


//     <View style={{backgroundColor: headingColor, height: '50%'}}>

//       <View style={{backgroundColor: 'black', width: '80%', height: '100%', justifyContent: 'center', alignItems: 'center', left: '10%'}}>
             
//             <View style={{backgroundColor: '#999999', width: 270, height: 270, borderRadius: 1000, borderColor: '#999999', borderWidth: '0%', justifyContent: 'center',alignItems:'center' ,marginBottom: 140, shadowOpacity: .8, shadowRadius: 3, shadowColor: '#999999'}}>
//                 <Image  style={{width: 250, height: 220}} source={path}></Image>

//                   {/* <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', fontWeight: '900', alignSelf: 'center'}}> My Pitch:{pitch} </Text>
//                   <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold', fontWeight: '900', alignSelf: 'center'}}> {selected} Pitch:{satAngles}  </Text> */}

//             </View>

//       </View>
 
//     </View>



//          <BottomSheet
//               bottomSheetTitle={"Info"}
//               bottomSheetIconColor="green"
//               bottomSheetStyle={{
//                 backgroundColor: "#000",
//                 maxHeight: "50%",
//                 minHeight: "40%",
              
//               }} 
//               bottomSheetTitleStyle={{color: 'green'}}
//               onRequestClose={() => setVisible(!isVisible)}
//               bottomSheetVisible={isVisible}
//           >
//                <Text style={{color: 'white'}}>Use this page to point your device at the current location of the satellite, anywhere in the world!</Text>
//                <Text style={{color: 'white', marginTop: 10}}>First, make sure your device is horizontal to the ground and rotate it while keeping it flat and try to match your heading with that of the satellite. </Text>
//                <Text style={{color: 'white', marginTop: 10}}>Once the background of the top half of the screen turns green, you are in the right direction. Now, tilt your device vertically so that the heading does not change, but the pitches match</Text>
//                <Text style={{color: 'white', marginTop: 10}}>Now both halves should be green. Congratulations! You just located your first satellite!</Text>

//           </BottomSheet>

//           <View style={{backgroundColor: '#FF4C29', position: 'absolute', justifyContent: 'center', height: '7%', top: '87%' ,borderRadius: 50, width: '75%', alignSelf: 'center'}}>
          
//           <IconButton
//               style={{position: 'absolute', left: '25%'}}
//               icon={<Icon name="wifi" size={30} style={{ color: "black"}}/> }
//               onPress={() => navigation.navigate("Info")}
//           />

//           <IconButton
//                   style={{position: 'absolute', left: '42%'}}
//                   icon={<Icon name="earth" size={45} style={{ color: "black"}}/> }
//                   onPress={() => navigation.navigate("Globe")}
//           />

//           <IconButton
//                   style={{position: 'absolute', left: '60%'}}
//                   icon={<Icon name="eye" size={30} style={{ color: "black"}}/> }
//                   onPress={() => navigation.navigate("Live")}
//           />

//           <IconButton                
//                   style={{position: 'absolute', left: '10%'}}
//                   icon={<Icon name="arrow-up" size={30} style={{ color: "black"}}/> }
//                   onPress={() => navigation.navigate("Locate")}
//           />
//            <IconButton                
//                   style={{position: 'absolute', left: '75%'}}
//                   icon={<Icon name="circle" size={30} style={{ color: "black"}}/> }
//                   onPress={() => navigation.navigate("Settings")}
//           />
//       </View>
//     </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  textStyle: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center'
  }
})