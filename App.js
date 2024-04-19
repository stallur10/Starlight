import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GlobeView from './GlobeView';
import InfoScreen from './InfoScreen';
import LiveFeed from './LiveFeed';
import LocateSatellite from './LocateSatellite';
import NewsFeed from './NewsFeed';
import Settings from './Settings';

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

//ISS Speed: 7,660 m/s
//CSS Speed: 7,680 m/s


const Stack = createStackNavigator();


function MyStack() {

  return (
    <Stack.Navigator>

      <Stack.Screen name="Home" component={GlobeView} options={{headerShown: false }} />
    
          <Stack.Screen
            name="Globe"
            component={GlobeView}
            options={{ title: "Welcome", headerShown: false, cardStyleInterpolator: forFade }}
          />

          <Stack.Screen
            name="Info"
            component={InfoScreen}
            options={{ title: "Welcome", headerShown: false, cardStyleInterpolator: forFade }}        
          />

          <Stack.Screen
            name="Live"
            component={LiveFeed}
            options={{ title: "Welcome", headerShown: false, cardStyleInterpolator: forFade }}        
          />

          <Stack.Screen
            name="Locate"
            component={LocateSatellite}
            options={{ title: "Welcome", headerShown: false, cardStyleInterpolator: forFade }}
          />

          <Stack.Screen
            name="News"
            component={NewsFeed}
            options={{ title: "News", headerShown: false, cardStyleInterpolator: forFade}}
          />

          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{ title: "Welcome", headerShown: false, cardStyleInterpolator: forFade }}
          />

    </Stack.Navigator>
  );

}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}






// import { StyleSheet, View, Button, Text } from 'react-native';
// import GlobeView from './GlobeView';
// import InfoScreen from './InfoScreen';
// import ARScreen from './ARScreen';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';


// const Stack = createNativeStackNavigator();

//   const forFade = ({ current }) => ({
//     cardStyle: {
//       opacity: current.progress,
//     },
//   });



  
// export default function App() {

//   return (
//    <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//             name="Globe"
//             component={GlobeView}
//           //  options={{title: "STarlight", headerShown: false, }}
//         />

//            <Stack.Screen
//             name="Info"
//             component={InfoScreen}
//             options={{ CardStyleInterpolator: forFade }}        />

//         <Stack.Screen
//             name="AR"
//             component={ARScreen}
//             //options={{title: "Welcome", headerShown: false}}
//         />

//       </Stack.Navigator>
//    </NavigationContainer>
//   );
 



  
//}



    

