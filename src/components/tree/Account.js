

import Chatroom from "./Chatroom"
import Nav from "./Nav"
import Chats from "./Chats"
import Contacts from "./Contacts"
import {useState, useEffect} from 'react'
import Settings from "./Settings"

import {Link, Route, Navigate, Routes} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

export default function Account() {


    const [ws, setWs] = useState(null)

    const [chattingToContact, setchattingToContact] = useState(null)

    const userID_ = 1

    const [chosenSection, setChosenSection] = useState(<Chats userID_={userID_} swapChattingTo = {swapChattingTo} globalWs = {ws}/>)



    function swapChattingTo(newchattingToContact){
        setchattingToContact(newchattingToContact)
    }

    //Section should be a general section component, more specialised ones are Chats, Contacts, and Settings
    //Chats and Contacts both display the contacts, but chats takes you the chatroom, and Contacts allows you view the contacts' profile

    //Chats takes in ws, swapChattingTo and userID_
    //Contacts takes in ws, userID_
    //Setting only takes in ws and userID_

    //Section then takes in the props ws and userID_

    return (



        <div className="h-[100vh] grid grid-rows-[90%_auto] grid-cols-1 lg:grid-rows-1 lg:grid-cols-[auto_30%_65%] w-[100vw]">

            {/* section -when the breakpoint is less than LG */}
            <div className="w-full h-full lg:hidden">
                {/* <h5 className="absolute text-white">User_id: {userID_} <button className="" onClick={() => swapChattingTo(null)}>Back</button></h5> */}
                {chattingToContact === null ? chosenSection : <Chatroom globalWs = {ws} userID_ = {userID_} contact = {chattingToContact} goBack = {() => swapChattingTo(null)} />}
            </div>

            <Nav changeToChatsSection = {() => setChosenSection(<Chats userID_={userID_} swapChattingTo = {swapChattingTo} globalWs = {ws}/>)}
                 changeToContactsSection = {() => setChosenSection(<Contacts userID_ = {userID_} globalWs = {ws}/>)}
                 changeToSettingsSection = {() => setChosenSection(<Settings userID_ = {userID_} globalWs = {ws}/>)}
            /> 
             {/*This nav will be on the far left when lg bp is reached, otherwise at the bottom as the div ontop is block */}
            <div className="hidden w-full h-full lg:block"> {chosenSection} </div>

            {/* ONLY DISPLAY CHATROOM IF LG breakpoint IS REACHED */}

            <div className="hidden lg:block"> <Chatroom globalWs = {ws} userID_ = {userID_} contact = {chattingToContact}/> </div>

        </div>

        


        //have our nav component on the left

        //have chat groups on its right

        //chatroom then 

    )
}