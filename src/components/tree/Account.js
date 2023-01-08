

import Chatroom from "./Chatroom"
import Nav from "./Nav"
import Chats from "./Chats"
import Contacts from "./Contacts"
import {useState, useEffect} from 'react'
import Settings from "./Settings"

import {Link, Route, Navigate, Routes} from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { createClient } from '@supabase/supabase-js'

export default function Account(userID__, setIsLoggedIn) {


    const [ws, setWs] = useState(null)

    const [chattingToContact, setchattingToContact] = useState(null)

    const userID_ = parseInt(localStorage.getItem('loggedIn'))

    const [chosenSection, setChosenSection] = useState(<Chats userID_={userID_} swapChattingTo = {swapChattingTo} globalWs = {ws}/>)

    const supabaseUrl = 'https://iqwckccxsmjgjfocdbqq.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxd2NrY2N4c21qZ2pmb2NkYnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3OTk1MDMsImV4cCI6MTk4ODM3NTUwM30.DqNEQWjTuH2g8IvBwvzCoGf0buYUV3Tlq9NUBkT3CtM'
    const supabase = createClient(supabaseUrl, supabaseKey)

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
                 setIsLoggedIn = {setIsLoggedIn}
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