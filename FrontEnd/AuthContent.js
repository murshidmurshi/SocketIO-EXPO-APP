import { createContext, useState } from "react";

export const GlobalContext=createContext(null)

function GlobalState({children}){

    const [showloginView,setShowLoginView]=useState(false)
    const [currentusername,setCurrentUserName]=useState('')
    const [currentuser,setCurrentUser]=useState('')
    const [alluser,setAllUser]=useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [currentgroupname, setCurrentGroupname] = useState('');
    const [allgroup, setAllGroup]=useState([])
    const [currentChatmessage, setCurrentChatMessage] = useState('');
    const [allmessages, setAllMessages]=useState([])


    
    return <GlobalContext.Provider
     value={{
        showloginView,setShowLoginView,
        currentusername,setCurrentUserName,
        currentuser,setCurrentUser,
        alluser,setAllUser,
        modalVisible, setModalVisible,
        currentgroupname, setCurrentGroupname,
        allgroup, setAllGroup,
        allmessages, setAllMessages,
        currentChatmessage, setCurrentChatMessage
       
        
    }}>{children}</GlobalContext.Provider>
}

export default GlobalState;
