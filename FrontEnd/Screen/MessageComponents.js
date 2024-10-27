import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function MessageComponents({item,currentuser}) {
  const currentuserStatus=item.currentuser!==currentuser


  return (
    <View style={currentuserStatus?{}:{alignItems:'flex-end'}}>
      <View style={styles.MessageWrapperDiv}>
      <View style={[styles.MessageDiv,currentuserStatus?{backgroundColor:'white'}:{backgroundColor:'rgb(142, 111, 170)'}]}>
      <Text style={[styles.MessageText,currentuserStatus?"":{color:'white'}]}>{item.text}</Text>
      </View>
      <View style={styles.TimeDiv}>
        <Text style={styles.TimeText}>{item.time}</Text>
      </View>
      </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
  MessageWrapperDiv:{
// backgroundColor:'grey',
minWidth:'25%',
maxWidth:'85%',
minHeight:50,
paddingHorizontal:2,
marginVertical:5
},
MessageDiv:{
  padding:10,
  marginHorizontal:8,
  borderRadius:8,
  borderTopRightRadius:0,
  elevation:1
  },
  
  TimeDiv:{
    alignItems:'flex-end',
    paddingRight:10
  },
  TimeText:{
    fontSize:11,
    color:'grey',
  }
})