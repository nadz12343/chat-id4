import { useState } from "react";
import Chatroom from "./Chatroom";
import Chatbubble from "./Chatroom";

import { createClient } from '@supabase/supabase-js'
import Account from "./Account";
export default function Login() {

    const [loginInfo, setLoginInfo] = useState({email: 'john.doe@example.com', password: 'password1'})

    const supabaseUrl = 'https://iqwckccxsmjgjfocdbqq.supabase.co'
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlxd2NrY2N4c21qZ2pmb2NkYnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3OTk1MDMsImV4cCI6MTk4ODM3NTUwM30.DqNEQWjTuH2g8IvBwvzCoGf0buYUV3Tlq9NUBkT3CtM'
    const supabase = createClient(supabaseUrl, supabaseKey)

    const [userID_, setUserID_] = useState(null)


    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn'))

    function handleChange(event) {
        setLoginInfo(prevLoginInfo => {
            return {
                ...prevLoginInfo,
                [event.target.name]: event.target.value
            }
        })
    }

    async function submitLoginInfo() {

        let { data: user, error } = await supabase.from('users')
        .select('*').or(`and(email.eq.${loginInfo.email},password.eq.${loginInfo.password})`)

        console.log(user)
        if (user.length > 0 ) {
            setUserID_(user[0].id)
            localStorage.setItem('loggedIn', user[0].id)
            setIsLoggedIn(localStorage.getItem('loggedIn'))
            // alert('email or password is invalid')
        }
        // else alert('redirect to account page and send the userID with it aswell, also handle local storage')
        else {
            alert('account does not exist, email or password is incorrect')
            setIsLoggedIn(localStorage.getItem('loggedIn'))
            localStorage.removeItem('loggedIn')
        }
      
    }

    async function submitLoginDemo1(){
        let { data: user, error } = await supabase.from('users')
        .select('*').or(`and(email.eq.${'john.doe@example.com'},password.eq.${'password1'})`)

        console.log(user)
        if (user.length > 0 ) {
            setUserID_(user[0].id)
            localStorage.setItem('loggedIn', user[0].id)
            setIsLoggedIn(localStorage.getItem('loggedIn'))
            // alert('email or password is invalid')
        }
        // else alert('redirect to account page and send the userID with it aswell, also handle local storage')
        else {
            alert(localStorage.getItem('loggedIn'))
            setIsLoggedIn(localStorage.getItem('loggedIn'))
            localStorage.removeItem('loggedIn')
        }
    }


    async function submitLoginDemo2(){
        let { data: user, error } = await supabase.from('users')
        .select('*').or(`and(email.eq.${'alice.smith@example.com'},password.eq.${'password4'})`)

        console.log(user)
        if (user.length > 0 ) {
            setUserID_(user[0].id)
            localStorage.setItem('loggedIn', user[0].id)
            setIsLoggedIn(localStorage.getItem('loggedIn'))
            // alert('email or password is invalid')
        }
        // else alert('redirect to account page and send the userID with it aswell, also handle local storage')
        else {
            alert('account does not exist, email or password is incorrect')
            setIsLoggedIn(localStorage.getItem('loggedIn'))
            localStorage.removeItem('loggedIn')
        }
    }


    return (
        isLoggedIn !== null ? <Account  setIsLoggedIn = {setIsLoggedIn}/> : 
        <div className="h-[100vh] bg-mainBg flex flex-col justify-center items-center">

            <h1 className="font-extrabold text-white mb-128 text-h1s lg:text-h1">Lively Chatters</h1>

            <h3 className="mb-16 font-bold text-white text-h2s lg:text-h2">Login</h3>
            
            <div className="flex flex-col items-center w-56">
                <input className="w-full p-32 my-8 text-white rounded-md bg-inputBg" type = "text" name = 'email' placeholder="Email" value={loginInfo.email} onChange={handleChange}></input>
                <input className="w-full p-32 my-8 text-white rounded-md bg-inputBg" type = "password" name = 'password' placeholder="Password" value={loginInfo.password} onChange={handleChange}></input>
                <button className="w-full p-32 mt-8 text-white font-bold rounded-md bg-inputBg hover:bg-primary/[.6]" onClick={submitLoginInfo}>Login</button>
            </div>    


            <div className="flex items-center justify-center w-56 font-extralight">
                <button className="mr-8 text-center p-32 mt-8 text-white font-bold rounded-md bg-inputBg hover:bg-primary/[.6]" onClick={submitLoginDemo1}>Demo user 1</button>
                <button className="ml-8 text-center p-32 mt-8 text-white font-bold rounded-md bg-inputBg hover:bg-primary/[.6]" onClick={submitLoginDemo2}>Demo user 2</button>

            </div>                      
        </div>
    
    )
}