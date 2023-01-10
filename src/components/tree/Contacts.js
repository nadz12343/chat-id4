import { useState, useEffect } from "react"
import Section from "./Section"

export default function Contacts({userID_, globalWs}) {

    const [contacts, setContacts] = useState()
    const [ws, setWs] = useState()
    useEffect(() => {

        
        // const ws = globalWs
        const ws = new WebSocket('ws://localhost:6534')
        setWs(ws)

        //send the user_id so that its contacts can then retrieved when initiating connection with websockets
        ws.addEventListener('open', () => ws.send(JSON.stringify({contacts_of_user_id: userID_})))

        //wait for the contacts info from the server
        ws.addEventListener('message', resData => {
            const objFromServer = JSON.parse(resData.data)
            console.log('insection')
            const mappedContacts = objFromServer.contacts.map((contact, index) => {
            return <p className="w-full p-32 mb-32 rounded-md cursor-pointer bg-inputBg" key = {index} onClick= {() => console.log('move to Contact Browser page')}>{`${contact.name} ${contact.email}`}</p>
            })
            setContacts(mappedContacts)
            console.log(objFromServer.contacts)

        })


    }, [])
    return (
        <Section userID_ = {userID_} data = {{title: "Contacts", info: contacts}}/>
    )
}