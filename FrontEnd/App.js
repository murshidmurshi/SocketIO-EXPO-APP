// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import MyComponent from './Screen/MyComponent';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import SingleRoom from './Screen/SingleRoom';


// const Stack=createNativeStackNavigator()

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name='Home' component={MyComponent}/>
//         <Stack.Screen name='SingleRoom' component={SingleRoom}/>
//       </Stack.Navigator>
//       </NavigationContainer>
//       {/* <Text>Open up App.js to start working on your app!</Text> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//     backgroundColor: '#fff',
//     // alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChatScreen from './Screen/ChatScreen';
import HomeScreen from './Screen/HomeScreen';
import GlobalState from './AuthContent';
import MessagesScreen from './Screen/MessagesScreen';
import { Alert } from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import { GetToken, notificationListner, requestUserPermission } from './utils/Notification';

const Stack = createNativeStackNavigator();


const App = () => {
//   useEffect(() => {
//     const unsubscribe = messaging().onMessage(async remoteMessage => {
//       Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
//     });

//     return unsubscribe;
//   }, []);

//   useEffect(()=>{
// requestUserPermission()
// notificationListner()
// GetToken()
//   },[])
  return (
    <GlobalState>
      {/* <StatusBar hidden={true} /> */}
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MessagesScreen" component={MessagesScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </GlobalState>
  );
};

export default App;
