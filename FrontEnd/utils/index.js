import { Platform } from "react-native"
import { io } from "socket.io-client"

export const BaseUrl=Platform.OS==='android'?'http://192.168.1.37:2000':'http://localhost:2000'
export const socket=io.connect('http://192.168.1.37:3000')
