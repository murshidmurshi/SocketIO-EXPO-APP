import { Alert, ImageBackground, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View,StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { GlobalContext } from '../AuthContent'
import Ionicons from 'react-native-vector-icons/Ionicons'


export default function HomeScreen({navigation}) {
    let {
        showloginView, setShowLoginView,
        currentusername, setCurrentUserName,
        currentuser, setCurrentUser,
        alluser, setAllUser,


    } = useContext(GlobalContext)

    const handleRegandLogSignIn = (islogin) => {

        if (currentusername.trim() !== '') {
            const Index = alluser.findIndex(useItem => useItem === currentusername)
            console.log(Index);
            if (islogin) {
                if (Index === -1) {
                    Alert.alert('Please register first !!')
                }
                else {
                    setCurrentUser(currentusername)

                }
            } else {
                if (Index === -1) {
                    setCurrentUser(currentusername)
                    alluser.push(currentusername);
                    setAllUser(alluser);

                }
                else {
                    Alert.alert('Already register please login !')
                }
            }
setCurrentUserName('')
        }
        else {
            Alert.alert('User name field is empty !!')
        }
        Keyboard.dismiss()
    }
    console.log(alluser,currentuser);

    useEffect(()=>{
if(currentuser.trim() !==''){
    navigation.navigate('ChatScreen')
}
    },[currentuser])
    return (
        <View style={styles.mainWrapper}>
      <StatusBar  backgroundColor= 'rgb(142, 111, 170)'/>
            <ImageBackground style={styles.bgImage} src='https://img.freepik.com/premium-vector/business-teamwork-meeting-brainstorm-working-concept_70921-405.jpg?size=626&ext=jpg&ga=GA1.1.1864073197.1704542692&semt=ais'>
            </ImageBackground>
            <View style={styles.content}>
                {showloginView ? (
                    <>
                        <View>
                            <Text style={styles.InputLabel}>Enter your user name</Text>
                            <TextInput value={currentusername} style={styles.LoginInput} onChangeText={(value) => setCurrentUserName(value)} placeholder='Please enter your use name ' />
                        </View>
                        <View style={styles.RegLoginDiv}>
                            <TouchableOpacity style={styles.RegLogBtn} onPress={() => handleRegandLogSignIn(false)}>
                                <Text style={styles.RegLogBtnText}>Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.RegLogBtn} onPress={() => handleRegandLogSignIn(true)}>
                                <Text style={styles.RegLogBtnText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </>

                ) : (
                    <View>
                        <Text style={styles.FirstContent}>Connect , grow ,inspire</Text>

                        <Text style={styles.SecondContent}>Connect people around the world for free</Text>

                        <TouchableOpacity style={styles.StartedBtn} onPress={() => setShowLoginView(true)}>
                            <Text style={styles.StartedBtnText}>Get Started</Text>
                            <Ionicons style={styles.startedIcon} name='arrow-forward-circle-outline' />
                        </TouchableOpacity>
                    </View>
                )}

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    mainWrapper: {
        // backgroundColor:'red',
        flex: 1
    },
    bgImage: {
        flex: 4,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 4,

    },
    FirstContent: {
        fontWeight: '500',
        fontSize: 23,
        textAlign: 'center'

    },
    SecondContent: {
        fontWeight: '500',
        fontSize: 14,
        color: 'grey',
        paddingVertical: 10,
        textAlign: 'center'
    },
    StartedBtn: {
        flexDirection: 'row',
        backgroundColor: 'rgb(109, 61, 154)',
        height: 50,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center'
    },
    startedIcon: {
        color: 'white',
        fontSize: 30,
        position: 'relative',
        left: 11
    },
    StartedBtnText: {
        color: 'white',
        textTransform: 'uppercase'
    },
    InputLabel: {
        fontWeight: '500',
        marginTop: 8,
        fontSize: 19,
        textAlign: 'center'
    },
    LoginInput: {
        borderWidth: 1,
        height: 40,
        borderRadius: 18,
        marginVertical: 8,
        width: 270,
        paddingHorizontal: 10
    },
    RegLoginDiv: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        gap: 15,
        marginVertical: 5

    },
    RegLogBtn: {
        flexDirection: 'row',
        backgroundColor: 'rgb(109, 61, 154)',
        height: 40,
        width: 100,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    RegLogBtnText: {
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 13
    },

})