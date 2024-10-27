import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Alert, Keyboard, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GlobalContext } from '../AuthContent';
import { socket } from '../utils';
import { useFocusEffect } from '@react-navigation/native';

const NewGroupModal = () => {
  const {
    modalVisible, setModalVisible,
    currentgroupname, setCurrentGroupname,
    allgroup, setAllGroup
  } = useContext(GlobalContext);

  function handleCreateGroup() {
    console.log(currentgroupname);
    socket.emit('createNewgroup', currentgroupname)
    setModalVisible(false);
    Keyboard.dismiss()
  }

  useFocusEffect(
    useCallback(() => {
      socket.emit('getAllGroup')
      socket.on('groupList', (groups) => {
        console.log(groups, 55555555);
        setAllGroup(groups)
      })
    }, [])
  )
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.InputLabel}>Add new group</Text>
            <TextInput value={currentgroupname} onChangeText={(value) => setCurrentGroupname(value)} style={styles.LoginInput} placeholder='Please enter group name ' />
          </View>
          <View style={styles.RegLoginDiv}>
            <TouchableOpacity style={styles.RegLogBtn} onPress={() => setModalVisible(false)}>
              <Text style={styles.RegLogBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.RegLogBtn} onPress={() => handleCreateGroup()}>
              <Text style={styles.RegLogBtnText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  //  Modal inside
  InputLabel: {
    fontWeight: '500',
    marginBottom: 20,
    fontSize: 19,
    textAlign: 'center'
  },
  LoginInput: {
    borderWidth: 1,
    height: 40,
    borderRadius: 18,
    marginBottom: 18,
    width: 270,
    paddingHorizontal: 12
  },
  RegLoginDiv: {
    flexDirection: 'row',
    justifyContent: "flex-end",
    // backgroundColor:"red",
    // gap: 15,
    marginVertical: 5

  },
  RegLogBtn: {
    flexDirection: 'row',
    height: 40,
    width: 90,
    alignItems: 'center',
    justifyContent: 'center'
  },
  RegLogBtnText: {
    color: 'rgb(109, 61, 154)',
    textTransform: 'uppercase',
    fontSize: 13
  },

});

export default NewGroupModal;