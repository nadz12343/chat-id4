import Chatroom from "./Chatroom";
import Chatbubble from "./Chatroom";

export default function Login() {

    return (
        // <Chatroom userID = {1} contactID = {2}/>
        <div className="h-[100vh] bg-mainBg flex flex-col justify-center items-center">

            
            <div className="flex flex-col items-center">
                <input className="p-32 my-8 text-white rounded-md bg-inputBg" placeholder="Username"></input>
                <input className="p-32 my-8 text-white rounded-md bg-inputBg" placeholder="Password"></input>
                <button className="w-full p-32 mt-8 text-white rounded-md bg-primary">Login</button>
            </div>
               

        </div>
    )
}