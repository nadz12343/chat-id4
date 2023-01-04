
import Chatbubble from '../Chatbubble';
import {useEffect, useState} from 'react'

import { HiDotsHorizontal } from "react-icons/hi";

import {AiOutlineSend} from 'react-icons/ai'
import {MdOutlineKeyboardArrowLeft} from 'react-icons/md'
import {BiPhoneCall} from 'react-icons/bi'

export default function Chatroom({userID_, contact, globalWs, goBack}) {

    const [ws, setWs] = useState(null)

    const [msgs, setMsgs] = useState("loading messages")

    console.log(contact)
    const [userTyped, setUserTyped] = useState('')

    const [contacteeName, setContacteeName] = useState('Choose a contact to chat to!')

    const user_id = userID_

    const contact_id =  contact !== null ? contact.contact_id : null
    
    function setupChatDisplay(rawChat) {
      const allMsgs = rawChat.map((msg, index) => <Chatbubble sender = {user_id === msg.sender_id} receiver = {contact.firstname} message = {msg.message} rawDate = {msg.created_at} key = {index}/>) 

      setMsgs(allMsgs)
    }

    useEffect(() => {

      //when there are no contacts
      if (contact === null) {
        setMsgs("Select a chat group to start chatting")
        return}
      const ws = new WebSocket('ws://localhost:6534')

      // const ws = globalWs
      setWs(ws)
      setContacteeName(`${contact.firstname} ${contact.surname}`)

      //when initiating the ws connection send the user_id and contact_id so its chat history can retrieved later on
      ws.addEventListener('open', () => ws.send(JSON.stringify({user_id, contact_id})))
  
      //this is an event listener, which listens for new messages from server even when useEffect is not running
      ws.addEventListener('message',  resData => {


        //may not be an object, could be an array instead for retrieving the chat from the server
        const objFromServer = JSON.parse(resData.data)
        console.log(objFromServer)

        //check if the initial data from server is the whole chat history between user_id and contact_id
        if (objFromServer.length > 0 &&'id' in objFromServer[0] && 'user_id' in objFromServer[0] && 'contact_id' in objFromServer[0] && 'sender_id' in objFromServer[0]  && 'message' in objFromServer[0]){
          setupChatDisplay(objFromServer)
        }

      }, [])

      //allow users to send message by pressing enter key
      const inp = document.getElementById('userTextInp')
      inp.addEventListener('keypress', event => event.key === 'Enter' && submitUserTypedMsg)
  
    }, [contact_id])
  
    function submitUserTypedMsg() {
      
      if (userTyped !== '') {
        setUserTyped('')
        ws.send(JSON.stringify({user_id, contact_id, sender_id: user_id, userTypedMsg: userTyped}))
      }


      
    }

    useEffect(() => {
      const chatBox = document.getElementById('chatBox')
      chatBox.scrollTop = chatBox.scrollHeight
    }, [msgs])
  
    return (

      <>

      
      <div className='grid grid-rows-[10%_auto_7%] w-full h-full'>
  
      {/* SIMIILAR TO A HEADER */}
      <div className='flex items-center w-full p-16 text-white bg-inputBg border-b-2 border-b-white/[.05]'>
        <button className='mr-24 rounded-md lg:p-16 w-fit h-fit bg-inputBg lg:hidden' onClick={goBack}>
          <MdOutlineKeyboardArrowLeft className='w-24 h-24'/>
        </button>

        <h4 className='text-white text-h4s lg:text-h4 lg:ml-16'>{contacteeName} </h4>

        <button className='ml-auto rounded-md lg:p-16 w-fit h-fit bg-inputBg'>
          <BiPhoneCall className='w-24 h-24'/>
        </button>
      </div>

      {/* This is where the chat bubbles will go */}
      <div className='flex flex-col items-end h-full overflow-scroll bg-navBg' id ="chatBox" style = {{backgroundImage: "url('/food.svg')"}}>

        {msgs}
      </div>
  
        {/* user enters their message here */}
      <div className='flex items-center w-full h-full p-16 bg-inputBg border-t-2 border-t-white/[.05]'>

        <button className='flex items-center justify-center h-full py-16 mr-16 text-white rounded-md w-fit bg-inptBg hover:bg-primary' onClick={submitUserTypedMsg}><HiDotsHorizontal className='w-32 h-32'/></button>

        <input className='w-full h-48 p-16 text-white rounded-md bg-inputMsg' value = {userTyped} id = "userTextInp" onChange={(e) => setUserTyped(e.target.value)}/>
        <button className=' flex items-center justify-center h-full py-16 px-8 ml-16 text-white rounded-md w-fit bg-primary/[.4] hover:bg-primary' onClick={submitUserTypedMsg}><AiOutlineSend className='w-32 h-32'/></button>
      </div>
      </div>
      </>
    )
  }