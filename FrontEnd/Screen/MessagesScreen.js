import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../AuthContent';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { socket } from '../utils';
import MessageComponents from './MessageComponents';


export default function MessagesScreen({ route,navigation }) {
    let { chatgroupName, id } = route.params;
    const { allmessages, setAllMessages, currentChatmessage, setCurrentChatMessage, currentuser } = useContext(GlobalContext)
    // console.log(allmessages);
    const handleNewMessage = () => {
        const timeData = {
            hr: new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours(),
            min: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()
        }
        socket.emit('NewChatMessage', {
            currentChatmessage,
            groupIdentifier: id,
            currentuser,
            timeData
        })
        setCurrentChatMessage('')
        Keyboard.dismiss()
    }

    useEffect(() => {
        socket.emit('findGroup', id)
        socket.on('foundGroup', (messages) => {
            console.log(messages, 202020);
            setAllMessages(messages)
        })

    }, [socket])

    return (
        <View style={styles.mainDiv}>
            <View style={styles.HeaderDiv}>
                <Ionicons onPress={()=>navigation.goBack()} name='chevron-back-outline' style={styles.BackIcon} />
                <Text style={styles.GroupName}>{chatgroupName}</Text>

            </View>
            <View style={styles.MessagesListDiv}>
                <FlatList
                    data={allmessages}
                    renderItem={({ item }) => <MessageComponents item={item} currentuser={currentuser} />}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={styles.ActionDiv}>
                <TextInput placeholder='Enter message here' style={styles.MessageInput} value={currentChatmessage} onChangeText={(value) => setCurrentChatMessage(value)} />
                <TouchableOpacity style={styles.sendBtnDiv} onPress={handleNewMessage}>
                    <Text style={styles.sendText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainDiv: {
        flex: 1,
        backgroundColor:'white'
    },
    HeaderDiv: {
        flexDirection: "row",
        padding: 12,
        backgroundColor:'rgb(142, 111, 170)'
    },
    BackIcon: {
        fontSize: 23,
        color:'white'
    },
    GroupName: {
        fontWeight: '500',
        fontSize: 18,
        paddingHorizontal: 15,
    color:'white'
    },
    MessagesListDiv: {
        // backgroundColor: 'yellow',
        flex: 1
    },
    ActionDiv: {
        flex: 0.1,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3

    },
    MessageInput: {
        borderWidth: 0.5,
        // elevation:1,
        height: 50,
        borderRadius: 40,
        width: '70%',
        paddingHorizontal:12
    },
    sendBtnDiv: {
        flexDirection: 'row',
        height: 50,
        width: '28%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(109, 61, 154)',
        borderRadius: 40,

    },
    sendText: {
        textTransform: 'uppercase',
        fontSize: 13,
        color: 'white'
    },

})