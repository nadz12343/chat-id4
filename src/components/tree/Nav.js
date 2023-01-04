import Contacts from "./Contacts";

// import Chats from "./Chats";
// import Contacts from "./Contacts";


import { IoChatbubblesOutline, IoCallOutline, IoSettingsOutline} from "react-icons/io5";
import { useState } from "react";

export default function Nav({changeToChatsSection, changeToContactsSection, changeToSettingsSection }){

    const [activeChats, setActiveChats] = useState(true)
    const [activeContacts, setActiveContacts] = useState(false)
    const [activeSettings, setActiveSettings] = useState(false)


    function makeIconActive(id) {

        setActiveChats(false)
        setActiveContacts(false)
        setActiveSettings(false)
        if (id === 1) setActiveChats(true)
        if (id === 2) setActiveContacts(true)
        if (id === 3) setActiveSettings(true)

    }
    return (
        // <div className="sticky p-16 text-white lg:h-full w-fit bg-navBg top">
        <div className="flex items-center border-t-2 border-t-white/[.02] text-white lg:flex-col lg:h-full lg:w-full lg:border-t-0 lg:border-r-2 lg:border-r-white/[.02] bg-navBg">

            <button className={`lg:w-32 w-24 h-24 lg:h-32 mx-24 lg:my-32 ${activeChats && 'text-primary'}`} onClick ={() => {makeIconActive(1); changeToChatsSection()}}>
                <IoChatbubblesOutline className="w-full h-full"/>
            </button>

            <button className={`lg:w-32 w-24 h-24 lg:h-32mx-24 lg:my-32 ${activeContacts && 'text-primary'}`} onClick ={() => {makeIconActive(2); changeToContactsSection()}}>
                <IoCallOutline className="w-full h-full"/>
            </button>

            <button className={`lg:w-32 w-24 h-24 lg:h-32  mx-24 lg:my-32 ${activeSettings && 'text-primary'}`} onClick ={() => {makeIconActive(3); changeToSettingsSection()}}>
                <IoSettingsOutline className="w-full h-full"/>
            </button>

            <button className="mx-24 ml-auto lg:mt-auto lg:mb-32">
                IMG
            </button>
            
        </div>
    )
}