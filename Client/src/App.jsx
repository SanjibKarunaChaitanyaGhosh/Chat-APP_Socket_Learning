import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io("http://127.0.0.1:4000")


const App = () => {

  const [name, setName] = useState("")

  const [joined, setJoined] = useState(false)

  const [room, setRoom] = useState(100)

  const formSubmit = () => {

    console.log("room no : ", room)
    
    if (name.trim() !== "") {
      console.log(name)
      socket.emit("join_room",room)
      setJoined(true)
   }
  }

  return (
    <>
      {!joined ? <Login name={name} setName={setName} formSubmit={formSubmit} setRoom={setRoom} room={room} /> : <ChatRoom name={name} room={room} />  }
    </>
  )
}

const Login = ({ name, setName, formSubmit, room, setRoom }) => {
  
  return (
    <div className='flex justify-center items-center flex-col gap-10 h-screen' >
      <input
        className='w-60 h-10 bg-amber-200 text-2xl text-black rounded'
        placeholder="Enter your name.."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        className='w-30 h-10 bg-amber-200 text-2xl text-black rounded'
        placeholder="room id"
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <button
        onClick={formSubmit} className="btn" >
        Join Room
      </button>
    </div >
  )
}

const ChatRoom = ({ name,room }) => {

  useEffect(() => {
    socket.on("receive_message", (data) => console.log(data))
    return () => {
      socket.off("receive_message")
    }
  }
  ,[])
  
  const [message, setMessage] = useState("")

  const sendMessage = () => {
    socket.emit("send_message", {
      name,
      message,
      room
    })
  }

  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <h3>Chat-Room</h3>
      
      <input
        className="w-[50%] bg-amber-400 "
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        className="btn"
        onClick={sendMessage}
        >
        send
      </button>
      
    </div>
  )
}


export default App