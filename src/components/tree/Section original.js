
import {useEffect, useState} from 'react'

export default function Section({userID_, globalWs, swapChattingTo}) {

    const [ws, setWs] = useState()

    const [contacts, setContacts] = useState('loading')

    useEffect(() => {

        
        // const ws = globalWs
        const ws = new WebSocket('ws://localhost:5432')
        setWs(ws)

        //send the user_id so that its contacts can then retrieved when initiating connection with websockets
        ws.addEventListener('open', () => ws.send(JSON.stringify({contacts_of_user_id: userID_})))

        //wait for the contacts info from the server
        ws.addEventListener('message', resData => {
            const objFromServer = JSON.parse(resData.data)
            console.log('insection')
            const mappedContacts = objFromServer.contacts.map((contact, index) => {
            return <p className="w-full p-32 mb-32 cursor-pointer bg-inputBg" key = {index} onClick= {() => swapChattingTo(contact.contact_id)}>{contact.name}</p>
            })
            setContacts(mappedContacts)
            console.log(objFromServer.contacts)

        })


    }, [])

    return(
        <div className="w-full h-full p-24 text-white bg-mainBg">
            
            <h3 className="mb-48 font-bold text-h3">Chats</h3>

            {contacts}
            
        </div>
    )
}