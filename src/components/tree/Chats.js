
import {useEffect, useState} from 'react'

import Section from './Section'
export default function Chats({userID_, globalWs, swapChattingTo}) {

    const [ws, setWs] = useState()

    const [contacts, setContacts] = useState('loading')
    let objFromServer;

    console.log(objFromServer)
    useEffect(() => {

        
        // const ws = globalWs
        const ws = new WebSocket('ws://localhost:6534')
        setWs(ws)

        function switchFocusedChat(ind){
            const mappedContacts = objFromServer.contacts.map((contact, index) => {
                return <div className={`flex items-center w-full p-32 mb-32 hover:bg-primary/[.2] rounded-md cursor-pointer ${ind !== index ? 'bg-inputBg' : 'bg-primary/[.4]'}`} key = {index} onClick = {() => {swapChattingTo(contact); switchFocusedChat(index)}}> <img src = {`/avatars/${contact.profile_img}`} className='inline-block w-40 h-40 mr-24'/>
                {contact.firstname} {contact.surname}</div>
                })
            setContacts(mappedContacts)
        }

        //send the user_id so that its contacts can then retrieved when initiating connection with websockets
        ws.addEventListener('open', () => ws.send(JSON.stringify({contacts_of_user_id: userID_})))

        //wait for the contacts info from the server
        ws.addEventListener('message', resData => {
            objFromServer = JSON.parse(resData.data)
            console.log('insection')
            const mappedContacts = objFromServer.contacts.map((contact, index) => {
            return (
                <div className="w-full flex items-center  p-32 mb-32 hover:bg-primary/[.2] rounded-md cursor-pointer bg-inputBg" key = {index} onClick= {() => {swapChattingTo(contact); switchFocusedChat(index)}}>
                    <img src = {`/avatars/${contact.profile_img}`} className='inline-block w-40 h-40 mr-24'/>
                    {contact.firstname} {contact.surname}
                </div>)
            })
            setContacts(mappedContacts)
            console.log(objFromServer.contacts)

        })


    }, [])

    return(
        <Section userID_ = {userID_} data = {{title: "Chats", info: contacts}}/>

    )
}