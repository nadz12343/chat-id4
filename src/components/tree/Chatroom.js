
import Chatbubble from '../Chatbubble';
import {useEffect, useState, useRef} from 'react'

import { HiDotsHorizontal } from "react-icons/hi";

import {AiOutlineSend} from 'react-icons/ai'
import {MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import {BiPhoneCall, BiSearch, BiVideo, BiInfoCircle} from 'react-icons/bi'
import {BsEmojiSmile} from 'react-icons/bs'
import { createClient } from '@supabase/supabase-js'


export default function Chatroom({userID_, contact, globalWs, goBack}) {

    const supabaseUrl = 'https://iqwckccxsmjgjfocdbqq.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxd2NrY2N4c21qZ2pmb2NkYnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3OTk1MDMsImV4cCI6MTk4ODM3NTUwM30.DqNEQWjTuH2g8IvBwvzCoGf0buYUV3Tlq9NUBkT3CtM'
    const supabase = createClient(supabaseUrl, supabaseKey)

    const ref = useRef(null)

console.log(contact)
    const [msgs, setMsgs] = useState("Select a contact to start chatting")

    const [userTyped, setUserTyped] = useState('')

    let [user_id_or_contact_id, setUser_id_or_contact_id] = useState('')

    const [contacteeName, setContacteeName] = useState('Choose a contact to chat to!')

    const user_id = userID_ 
    
    function setupChatDisplay(rawChat) {
      const allMsgs = rawChat.map((msg, index) => <Chatbubble sender = {user_id === msg.sender_id} receiver = {contact.firstname} message = {msg.message} rawDate = {msg.created_at} key = {index}/>) 
      setMsgs(allMsgs)
    }

    useEffect(() => {


      if (contact === null) return

      setContacteeName(contact.firstname)
      
      //gets chat history for the two clients
      async function getChats() {

        let chats 

        //when user is the primary user in the chats table
        chats= (await supabase.from('chats').select("*").or(`and(user_id.eq.${userID_},contact_id.eq.${contact.id})`)).data

        //otherwise the user is the secondary user in the chats table
        if (chats.length === 0 || chats === null) {
          //used to determine if we should insert according to primary/secondary user perspective
          setUser_id_or_contact_id("contact_id")
          chats= (await supabase.from('chats').select("*").or(`and(contact_id.eq.${user_id},user_id.eq.${contact.id})`)).data
        } else {
          //used to determine if we should insert according to primary/secondary user perspective
          setUser_id_or_contact_id("user_id")
        }
        //displays chats to UI
        setupChatDisplay(chats)

      }

      getChats()

      const filter=  {
        event: 'INSERT', 
        schema: 'public', 
        table: 'chats', 
      }
      //websocket event listener
      supabase.channel('public:chats').on('postgres_changes', filter, payload => getChats()).subscribe()

    }, [contact])


    async function submitUserTypedMsg() {
 
      if (userTyped !== '') {
        setUserTyped('')  

      if (user_id_or_contact_id === "user_id"){
        const { error } = await supabase.from('chats').insert({user_id: userID_, contact_id: contact.id, sender_id: userID_, message: userTyped, created_at: 'now()'})
      } else {
        const { error } = await supabase.from('chats').insert({user_id: contact.id, contact_id: userID_, sender_id: userID_, message: userTyped, created_at: 'now()'})
      }

    }
  }


    useEffect(() => {ref.current?.scrollIntoView({behavior: 'auto'})}, [msgs])
  
    return (
      
      <div className='grid grid-rows-[10%_auto_7%] w-full h-full overflow-visible' id = "test">
  
      {/* SIMIILAR TO A HEADER */}
      <div className='flex items-center w-full p-16 text-white bg-inputBg border-b-2 border-b-white/[.05]'>
        <button className='mr-16 rounded-md lg:mr-24 lg:p-16 w-fit h-fit bg-inputBg hover:bg-primary/[.6] lg:hidden' onClick={goBack}>
          <MdOutlineKeyboardArrowLeft className='w-24 h-24'/>
        </button>

        <h4 className='text-white text-h4s lg:text-h4 lg:ml-16'>
         {contact !== null && <img src = {`/avatars/${contact.profile_img}`} className='inline-block w-24 h-24 mr-16 lg:w-40 lg:h-40 lg:mr-24'/>}
          {contacteeName}
        </h4>

        <button className='flex ml-auto mr-8 rounded-md lg:p-16 w-fit h-fit bg-inputBg'>
          <BiSearch className='w-16 h-16 lg:w-24 lg:h-24'/>
        </button>
        <button className='mr-8 rounded-md lg:p-16 w-fit h-fit bg-inputBg'>
          <BiPhoneCall className='lg:w-24 lg:h-24'/>
        </button>

        <button className='mr-8 rounded-md lg:p-16 w-fit h-fit bg-inputBg'>
          <BiVideo className='w-16 h-16 lg:w-24 lg:h-24'/>
        </button>

        <button className='rounded-md lg:p-16 w-fit h-fit bg-inputBg'>
          <BiInfoCircle className='w-16 h-16 lg:w-24 lg:h-24'/>
        </button>
      </div>

      {/* This is where the chat bubbles will go */}
      <div className='flex flex-col items-end h-full overflow-scroll bg-navBg' id ="chatBox" style = {{backgroundImage: "url('/pattern-3.svg')", backgroundRepeat: "repeat"}}>
        {msgs}
        <div ref={ref} />

      </div>
  
        {/* user enters their message here */}
      <div className='flex items-center w-full h-full p-16 bg-inputBg border-t-2 border-t-white/[.05]'>

        <button className='flex items-center justify-center h-full lg:px-8 lg:py-16 mr-16 text-white rounded-md w-fit bg-inptBg hover:bg-primary/[.6]' ><HiDotsHorizontal className='w-16 h-16 lg:w-32 lg:h-32'/></button>
        <button className='flex items-center justify-center h-full lg:px-8 lg:py-16 lg:mr-16 text-white rounded-md w-fit bg-inptBg hover:bg-primary/[.6]' ><BsEmojiSmile className='w-16 h-16 lg:w-24 lg:h-24'/></button>

        <input className='w-full h-[70%] p-16 text-white rounded-md bg-inputMsg' value = {userTyped} id = "userTextInp" onChange={(e) => setUserTyped(e.target.value)}/>
        <button className=' flex items-center justify-center h-full py-16 px-8 ml-16 text-white rounded-md w-fit bg-primary/[.4] hover:bg-primary/[.6]' onClick={submitUserTypedMsg}><AiOutlineSend className='lg:w-32 lg:h-32'/></button>
      </div>
      </div>
    )
  }