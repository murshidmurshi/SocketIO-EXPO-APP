import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, } from 'react-native';
import io from 'socket.io-client';
import { BaseUrl } from './GlobalAddress';
import { useFocusEffect } from '@react-navigation/native';
import { NativeBaseProvider, Box, Button, Pressable, Input, } from "native-base";
import { useNavigation } from '@react-navigation/native';
// Replace with your server URL

const SERVER_URL = BaseUrl;
  const socket = io(SERVER_URL);
const MyComponent = () => {
  const [mainState, setMainState] = useState(0);
  const [alluser, setAllUser] = useState([0]);
  const [allroom, setAllRoom] = useState([]);
  
  let navigation = useNavigation()
  const [input, setInput] = useState('');

  useFocusEffect(
    useCallback(() => {
      // 

      socket.emit('GetAllGroup')
      socket.on('groupList', (groups) => {
        // console.log(groups, 'Group');
        setAllRoom(groups)
      })
     
      socket.on('userList', (user) => {
        // console.log(groups, 'Group');
        setAllUser(user)
      })

    }, [])
  )

  useEffect(() => {
    // Listen for the 'hey' event instead of 'connect'
    socket.on('hey', (data) => {
      console.log(data);
      setMainState((prev) => prev + 1);
      console.log('Received hey event from server', --data);
    });

    // Event listener for disconnection
    // socket.on('disconnect', () => {
    //   console.log('Disconnected from server');
    // });
    // Cleanup when component unmounts


    return () => {
      socket.disconnect();

    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts


  const NewGroup = () => {
    console.log('Clicked');
    if (input.length > 0) {
      socket.emit('newGroup', input)
      socket.emit('GetAllGroup')

      socket.on('groupList', (groups) => {
        console.log(groups);
        setAllRoom(groups)
        setInput('')
      })
    }
    else {
      alert('Input Cannot be empty !!!')
    }

  }

  function Example() {
    return <Pressable>
      {({
        isHovered,
        isFocused,
        isPressed
      }) => {
        return <Box mt={5} maxW="40" borderWidth="1" alignSelf={'center'} alignItems={'center'} borderColor="coolGray.300" shadow="3" bg={isPressed ? 'coolGray.200' : isHovered ? 'coolGray.200' : 'coolGray.100'} p="5" rounded="8" style={{
          transform: [{
            scale: isPressed ? 0.96 : 1
          }]
        }}>
          <Text onPress={NewGroup} fontSize={12} fontWeight="medium" color="darkBlue.600">
            New Group
          </Text>

        </Box>;
      }}
    </Pressable>;
  }

  return (
    <>

      <NativeBaseProvider>
        <Text>All User</Text>

{alluser.map((item,index)=>(
  <>
  <Text>{item?.name}</Text>
  </>
))}


        <Text style={{ alignSelf: 'center' }}>{mainState}</Text>
        <Text style={{ alignSelf: 'center' }}>React Native Socket.IO Client</Text>

        {allroom.map((item, index) => (
          <TouchableOpacity onPress={() => navigation.navigate('SingleRoom', { item:item })}>
            <Box mx={50} backgroundColor={'red.200'} mb={1} borderRadius={10} p={2}>
              <Text style={{ alignSelf: 'center' }}>{index + 1}.{item.currentGroupName}</Text>
            </Box>
          </TouchableOpacity>
        ))}

        <Input onChangeText={(value) => setInput(value)} mx={70} variant="outline" placeholder="Round" />
        <Example />
      </NativeBaseProvider>


    </>

  );
};

export default MyComponent;
