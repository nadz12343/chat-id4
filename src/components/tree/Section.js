
import {useEffect, useState} from 'react'

export default function Section({userID_, globalWs, swapChattingTo, data}) {

    const [ws, setWs] = useState()

    const [contacts, setContacts] = useState('loading')

    return(
        <div className="w-full h-full p-24 text-white bg-mainBg border-r-2 border-r-white/[.05] overflow-scroll">
            <h3 className="mb-48 font-bold text-h3 border-b-2 w-full border-b-white/[.02]">{data.title}</h3>
                {data.info}            
        </div>
    )
}