
import { useEffect, useState } from "react"
import Section from "./Section"

import {IoIosArrowUp, IoIosArrowDown} from 'react-icons/io'
export default function Settings({userID_, globalWs}){


    const [userProfile ,setUserProfile] = useState()
    const [userData, setUserData] = useState({})
    const [ws, setWs] = useState()

    const [editMode, setEditMode] = useState(false)

    const [activeAccordians, setActiveAccordians] = useState({personalInfo: false, theme: false})

    //when button clicked, user info update is sent to the server and saved to DB
    function updateDetails() {
        console.log(userData)
        const updatedUserData = {updatedUserData: userData}

        const ws = new WebSocket('ws://localhost:5432')
        setWs(ws)
        ws.addEventListener('open', () => ws.send(JSON.stringify(updatedUserData))
        )
    }

    function alterAccordians(){
        setActiveAccordians(activeAccordians => {
            return {
                ...activeAccordians,
                personalInfo:!activeAccordians.personalInfo
            }
        })
    }

    function handleChange(event) {
        setUserData(prevUserData => {
            return {
                ...prevUserData,
                [event.target.name]: event.target.value
            }
        })
    }
    
    useEffect(() => {
   
        const ws = new WebSocket('ws://localhost:5432')
        setWs(ws)

        //send the user_id so that its contacts can then retrieved when initiating connection with websockets
        ws.addEventListener('open', () => ws.send(JSON.stringify({only_user_id: userID_})))

        //wait for the contacts info from the server
        ws.addEventListener('message', resData => {
            const objFromServer = JSON.parse(resData.data) //returns array with objects as elements
            const userProfile = objFromServer.map((info, index) => {
            return (
                <div className="w-full p-32 mb-32 cursor-pointer bg-inputBg" key = {index}>
                    <p>{info.name}</p>
                    <p>{info.email}</p>
                    <p>{info.id}</p>
                </div>
                )
            })
            setUserData(objFromServer[0])
            setUserProfile(userProfile)

        })
    }, [])


    console.log(userData.firstname)

    //accordian componenet will have a title, and the tags that it will render

    return (
        // <Section userID_ = {userID_} data = {{title: 'Settings',info: userProfile}}/>
        <div className="w-full h-full p-24 text-white bg-mainBg border-r-2 border-r-white/[.05] overflow-scroll">
                    <h3 className="mb-48 font-bold text-h3 border-b-2 w-full border-b-white/[.02] " >{"Settings"}</h3>


                    {/* //PERSON INFORMATION ACCORDIAN */}
                    <h5 className="mb-16 font-bold cursor-pointer" onClick={() => setActiveAccordians(activeAccordians => { return {...activeAccordians, personalInfo:!activeAccordians.personalInfo}})}>
                        Personal Information {activeAccordians.personalInfo ?  <IoIosArrowUp className="inline-block w-24 h-24 lg:w-32 lg:h-32"/> : <IoIosArrowDown className="inline-block w-24 h-24 lg:w-32 lg:h-32"/> }
                    </h5>    
                    <div className={`h-fit w-full ${activeAccordians.personalInfo ? 'block' : 'hidden'} `}>
                        <div className="flex flex-col items-center text-ps lg:text-p">

                            <p className="self-start mb-8">Firstname</p>
                            <input className='w-full h-48 p-16 mb-24 text-white rounded-md bg-inputMsg' type = 'text' name = "firstname" disabled={!editMode} value = {userData.firstname} onChange={handleChange}/>  

                            <p className="self-start mb-8">Surname</p>  
                            <input className='w-full h-48 p-16 mb-24 text-white rounded-md bg-inputMsg' type = 'text' name = "surname" disabled={!editMode} value = {userData.surname} onChange={handleChange}/>  

                            <p className="self-start mb-8">Email</p>
                            <input className='w-full h-48 p-16 mb-24 text-white rounded-md bg-inputMsg' type = 'email' name = "email" disabled={!editMode} value = {userData.email} onChange={handleChange}/>  

                            <button className={`flex items-center h-48 p-16 text-white rounded-md w-fit ${editMode ? 'hover:,bg-green-500/[.6]' :'hover:bg-orange-400/[.6]'} ${editMode ? 'bg-green-500' :'bg-orange-400'}`} onClick = {() => {setEditMode(editMode => !editMode); updateDetails()}}>
                               <p>{editMode ? 'Save' :'Edit' }</p> 
                            </button>
                        </div>                     
                    </div>

            <h5 className="mb-16 font-bold cursor-pointer" onClick={() => setActiveAccordians(activeAccordians => { return {...activeAccordians, theme:!activeAccordians.theme}})}>
                themes {activeAccordians.theme ?  <IoIosArrowUp className="inline-block w-24 h-24 lg:w-32 lg:h-32"/> : <IoIosArrowDown className="inline-block w-24 h-24 lg:w-32 lg:h-32"/> }
            </h5>
            <div className={`h-full w-full ${activeAccordians.theme ? 'block' : 'hidden'}`}>
                {/* USER CAN CHANGE THEME COLOUR HERE */}
                <div className="mb-16">
                    <p className="mb-8">Choose your theme color:</p>
                    <div className="inline-block w-32 h-32 bg-red-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 mx-16 bg-pink-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 bg-green-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 mx-16 bg-blue-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 bg-orange-800 rounded-md cursor-pointer"></div>
                </div>      

                {/* USER CAN CHANGE THEME BACKGROUND HERE HERE */}
                <div>
                    <p className="mb-8">Choose your theme background:</p>
                    <div className="inline-block w-32 h-32 bg-red-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 mx-16 bg-pink-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 bg-green-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 mx-16 bg-blue-800 rounded-md cursor-pointer"></div>
                    <div className="inline-block w-32 h-32 bg-orange-800 rounded-md cursor-pointer"></div>
                </div>          
            </div>
        </div>
    )
}