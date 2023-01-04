

export default function Chatbubble({sender, message, rawDate, receiver}){

    const className_ = `max-w-[50%] h-fit  ${sender ? 'bg-purple-600' : 'bg-orange-300'} m-4 rounded-md p-4 ${sender ? 'ml-auto' : 'mr-auto'} `
    const dateClassName_ = `text-white ${sender ? 'ml-auto' : 'mr-auto'} text-ps mx-16 font-bold mb-8`

    const dateObj = new Date(rawDate)

    const t = dateObj.toLocaleString("en-UK")
    return (

    <>
        <div className= {className_}>
            {message}
        </div>
        <p className= {dateClassName_}>{sender ? `${t}   You` : `${receiver} ${t}`}</p>

    </>

    )
}