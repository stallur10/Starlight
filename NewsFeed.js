import { StyleSheet, Text, View, Pressable, ScrollView,ImageBackground} from "react-native";
import { IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { FlatList } from "react-native-gesture-handler";
import Card from "./Card";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NewsFeed({navigation}){

    var newsUrl="https://newsapi.org/v2/everything?q=satellites&apiKey=63b3e1050b414513b60df61a0cb36cd0"


    const [titles, setTitles] = useState([])
        const addTitles=(item)=>{
            setTitles(current => [...current, item])
        }

    const [status, setStatus] = useState([])
        const addStatus=(item)=>{
            setStatus(current => [...current, item])
        }

    const [links, setLinks] = useState([])
        const addLinks=(item)=>{
            setLinks(current => [...current, item])
        }

    const [descriptions, setDescriptions] = useState([])
        const addDescriptions=(item)=>{
            setDescriptions(current => [...current, item])
        }

    const [images, setImages]=useState([])
        const addImages=(item)=>{
            setImages(current => [...current, item])
        }

    useEffect(() => {
        fetch(newsUrl)
        .then((res)=> res.json())
        .then((resJson)=>{

            for(var i=0;i<18;i++){
                addTitles((resJson.articles[i].title))
                addDescriptions((resJson.articles[i].description))
                addImages((resJson.articles[i].urlToImage))
                addLinks((resJson.articles[i].url))
            }

        }) 
        .catch((error) => console.error(error))

    }, [])




    return(
        <View style={{backgroundColor: 'black', flex: 1}}>

            <View style={{backgroundColor: '#000', alignContent: 'center', borderBottomColor: '#ff4c29', borderBottomWidth: 5, marginTop:50}}>
                <Text style={{color: 'white', marginTop: 15, textAlign: "center", fontSize: 40, fontFamily: 'Optima', marginBottom: 20}}>News Feed</Text>
            </View>

            <View style={{marginTop: 0}}>
                <SafeAreaView >
                    <ScrollView >
                        <View style={{alignItems: "center"}}>
                            {
                                titles.map((title, i) => {
                                    if(images[i])
                                    return (
                                    <View  key={i}>
                                        
                                            <Card 
                                                title={titles[i]}
                                                description={descriptions[i]}
                                                imageUrl={images[i]}
                                                link={links[i]}
                                            />
                                            
                                    </View>
                                    )
                                
                                })
                            }  
                        </View>
                    </ScrollView>
                </SafeAreaView>
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
                            icon={<Icon name="arrow-all" size={30} style={{ color: "black"}}/> }
                            onPress={() => navigation.navigate("Locate")}
                    />

                    <IconButton
                            style={{position: 'absolute', left: '80%'}}
                            icon={<Icon name="newspaper-variant-multiple-outline" size={30} style={{ color: "#fff"}}/> }
                            onPress={() => navigation.navigate("News")}
                    />  
            </View>

        </View>
    );
}