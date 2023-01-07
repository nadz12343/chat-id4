
import {useEffect, useState} from 'react'

import Section from './Section'
import { createClient } from '@supabase/supabase-js'

export default function Chats({userID_, globalWs, swapChattingTo}) {

    const [ws, setWs] = useState()

    const [contacts, setContacts] = useState('loading')
    let objFromServer;

    const supabaseUrl = 'https://iqwckccxsmjgjfocdbqq.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxd2NrY2N4c21qZ2pmb2NkYnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3OTk1MDMsImV4cCI6MTk4ODM3NTUwM30.DqNEQWjTuH2g8IvBwvzCoGf0buYUV3Tlq9NUBkT3CtM'
    const supabase = createClient(supabaseUrl, supabaseKey)



        function switchFocusedChat(ind){
            // const mappedContacts = contacts.map((contact, index) => {
            //     return <div className={`flex items-center w-full p-32 mb-32 hover:bg-primary/[.2] rounded-md cursor-pointer ${ind !== index ? 'bg-inputBg' : 'bg-primary/[.4]'}`} key = {index} onClick = {() => {swapChattingTo(contact); switchFocusedChat(index)}}> <img src = {`/avatars/${contact.profile_img}`} className='inline-block w-40 h-40 mr-24'/>
            //     {contact.firstname} {contact.surname}</div>
            // })
            // setContacts(mappedContacts)
        }
    
    async function  getContacts() {
        let rawContacts= (await supabase.from('contacts').select("contact_id").eq('user_id', userID_)).data
        const contacts_ids = await rawContacts.map(obj => obj.contact_id)
        let contacts = (await supabase.from('users').select("*").in('id', contacts_ids)).data
        console.log('contacts', contacts)
        return contacts
    }

    useEffect(() => {

        async function  getContacts() {
            let rawContacts
            let contacts
             rawContacts= (await supabase.from('contacts').select("contact_id").eq('user_id', userID_)).data
            const contacts_ids = await rawContacts.map(obj => obj.contact_id)
             contacts = (await supabase.from('users').select("*").in('id', contacts_ids)).data
            console.log('contacts', contacts)

            if (contacts.length === 0 || contacts === null) {
                rawContacts= (await supabase.from('contacts').select("user_id").eq('contact_id', userID_)).data
                console.log('rawContacts', rawContacts)
                const contacts_ids = rawContacts.map(obj => obj.user_id)
                contacts = (await supabase.from('users').select("*").in('id', contacts_ids)).data
                console.log('contacts', contacts)
            }

            const mappedContacts = contacts.map((contact, index) => {
                return (
                    <div className="w-full flex items-center  p-32 mb-32 hover:bg-primary/[.2] rounded-md cursor-pointer bg-inputBg" key = {index} onClick= {() => {swapChattingTo(contact); switchFocusedChat(index)}}>
                        <img src = {`/avatars/${contact.profile_img}`} className='inline-block w-40 h-40 mr-24'/>
                        {contact.firstname} {contact.surname}
                    </div>)
                })
            setContacts(mappedContacts)        
        }

        getContacts()



    }, [])

    
    return(
        <Section userID_ = {userID_} data = {{title: "Chats", info: contacts}}/>

    )
}