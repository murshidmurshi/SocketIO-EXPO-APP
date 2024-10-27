import messaging from '@react-native-firebase/messaging';

export const notificationListner=()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
         console.log('Notification Caused app to open from backgroundState',remoteMessage.notification,);
    })
    messaging()
    .getInitialNotification()
    .then(remoteMessage=>{
        if(remoteMessage){
            console.log('Notification caused app to quite state',remoteMessage.notification);
        }
    })
}

export async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

export const GetToken=async()=>{
    await messaging().registerDeviceForRemoteMessages();
const token = await messaging().getToken();
console.log('=======Token=======');
console.log(token);
}