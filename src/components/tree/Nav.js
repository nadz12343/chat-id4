import Contacts from "./Contacts";

// import Chats from "./Chats";
// import Contacts from "./Contacts";


import { IoChatbubblesOutline, IoCallOutline, IoSettingsOutline, IoBookOutline} from "react-icons/io5";
import {FaRegAddressBook} from 'react-icons/fa'
import {TbAddressBook} from 'react-icons/tb'
import { useState } from "react";

export default function Nav({changeToChatsSection, changeToContactsSection, changeToSettingsSection, setIsLoggedIn }){

    const [activeChats, setActiveChats] = useState(true)
    const [activeContacts, setActiveContacts] = useState(false)
    const [activeCalls, setActiveCalls] = useState(false)
    const [activeSettings, setActiveSettings] = useState(false)

    function logout(){
        localStorage.removeItem('loggedIn')
        window.location.reload()
    }


    function makeIconActive(id) {

        setActiveChats(false)
        setActiveContacts(false)
        setActiveCalls(false)

        setActiveSettings(false)
        if (id === 1) setActiveChats(true)
        if (id === 2) setActiveContacts(true)
        if (id === 3) setActiveCalls(true)
        if (id === 4) setActiveSettings(true)

    }
    return (
        <div className="flex items-center border-t-2 border-t-white/[.02] text-white lg:flex-col lg:h-full lg:w-full lg:border-t-0 lg:border-r-2 lg:border-r-white/[.02] bg-navBg">

            <button className={`lg:w-32 w-24 h-24 lg:h-32 lg:mx-24 mx-8 lg:my-32 ${activeChats && 'text-primary'}`} onClick ={() => {makeIconActive(1); changeToChatsSection()}}>
                <IoChatbubblesOutline className="w-full h-full"/>
            </button>
        
            <button className={`lg:w-32 w-24 h-24 lg:h-32 lg:mx-24 mx-8 lg:my-32 ${activeContacts && 'text-primary'}`} onClick ={() => {makeIconActive(2)}}>
                <IoBookOutline className="w-full h-full"/>
            </button>

            <button className={`lg:w-32 w-24 h-24 lg:h-32 lg:mx-24 mx-8 lg:my-32 ${activeCalls && 'text-primary'}`} onClick ={() => {makeIconActive(3)}}>
                <IoCallOutline className="w-full h-full"/>
            </button>
        
            <button className={`lg:w-32 w-24 h-24 lg:h-32  lg:mx-24 mx-8 lg:my-32 ${activeSettings && 'text-primary'}`} onClick ={() => {makeIconActive(4); changeToSettingsSection()}}>
                <IoSettingsOutline className="w-full h-full"/>
            </button>

            <button className="mx-24 ml-auto lg:mt-auto lg:mb-32 lg:mx-0 lg:ml-0" onClick = {logout}>
                <img src = {`/avatars/m3.png`} className='inline-block w-32 h-32 lg:w-40 lg:h-40'/>
                <p className="text-ps md:text-p">Logout</p>
            </button>
            
        </div>
    )
}