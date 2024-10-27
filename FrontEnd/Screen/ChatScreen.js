import { StyleSheet, Text, TouchableOpacity, View, StatusBar, FlatList } from 'react-native'
import React, { useContext, useEffect } from 'react'
import NewGroupModal from './NewGroupModal'
import { GlobalContext } from '../AuthContent'
import ChatComponent from './ChatComponent'
import { socket } from '../utils'
// import { StatusBar } from 'expo-status-bar'

export default function ChatScreen() {
  const {
    modalVisible, setModalVisible,
    allgroup,setAllGroup
  } = useContext(GlobalContext)

  useEffect(()=>{
socket.emit('getAllGroup');

socket.on('groupList',(chatGroups)=>{
  console.log(chatGroups,606060);
  setAllGroup(chatGroups)
})
  },[])


  return (
    <View style={styles.mainDiv}>
      {/* <StatusBar  /> */}
      <View style={styles.HeaderDiv}>
        <Text style={styles.HeaderText}>Welcome to Chat Bot</Text>
      </View>
      <View style={styles.ListContainerDiv}>
        {allgroup && allgroup.length > 0 ? (
          <FlatList
            data={allgroup}
            renderItem={({item})=><ChatComponent item={item}/>}
            keyExtractor={(item) => item.id}
          />
        ) : null}
      </View>

      <View style={styles.BottomContainerDiv}>
        <TouchableOpacity style={styles.BottomBtn} onPress={() => setModalVisible(true)}>
          <Text style={styles.BottomBtnText}>Create New Group</Text>
        </TouchableOpacity>
      </View>
      {modalVisible && <NewGroupModal />}

    </View>
  )
}

const styles = StyleSheet.create({
  mainDiv: {
    // backgroundColor:'red',
    flex: 1
  },
  HeaderDiv: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HeaderText: {
    fontSize: 19,
    fontWeight: '500'
  },
  ListContainerDiv: {
    flex: 3.4,
    // backgroundColor: 'green',
    paddingVertical: 20
  },
  BottomContainerDiv: {
    flex: 0.3,
  },
  BottomBtn: {
    flexDirection: 'row',
    backgroundColor: 'rgb(109, 61, 154)',
    height: 50,
    width: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  BottomBtnText: {
    color: 'white',
    textTransform: "capitalize",
    fontSize: 15
  },



})