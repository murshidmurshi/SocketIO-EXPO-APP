import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { GlobalContext } from '../AuthContent'


export default function ChatComponent({item}) {
    let navigation=useNavigation()
    const handleSingleRoom=()=>{
        navigation.navigate('MessagesScreen',{
            chatgroupName:item.currentgroupname,
            id:item.id
        })
    }
    let lastMessage=item && item.message && item.message.length ?item.message[item.message.length-1].text:'Tap to start message'
    let lastTime=item && item.message && item.message.length ?item.message[item.message.length-1].time:'Now'
    
  return (
    <View style={styles.mainDiv}>
        <TouchableOpacity style={styles.chatGroupDiv} onPress={handleSingleRoom}>
        <Ionicons style={styles.GroupIcon}  name='people-outline' />
        <View style={styles.chatDetailDiv}>
            <Text style={styles.GroupName}>{item?.currentgroupname}</Text>
            <Text style={styles.GroupAction}>{lastMessage}</Text>
        </View>
        <View style={{flex:1}} />
        <View style={styles.TimeDiv}>
            <Text style={styles.TimeText}>{lastTime}</Text>
        </View>

        </TouchableOpacity>
     
    </View>
  )
}

const styles = StyleSheet.create({
    mainDiv:{
       flex:1
    },
    chatGroupDiv:{
        marginVertical:5,
        flexDirection:'row',
        gap:15,
        padding:8,
        marginHorizontal:7,
        borderWidth:0.3,
        borderRadius:7
    },
    GroupIcon:{
        fontSize:22,
        alignSelf:'center'
    },
    chatDetailDiv:{
    },
    GroupName:{
        fontWeight:'500',
        fontSize:15
    },
    GroupAction:{
        fontSize:13
    },
    TimeDiv:{
        paddingHorizontal:8
    },
    TimeText:{
        color:'grey',
        fontWeight:'400',
        fontSize:11
    },

})