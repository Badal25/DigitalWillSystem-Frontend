import { useState } from "react"
import axios from "axios"

function AIChat(){

const [message,setMessage] = useState("")
const [chats,setChats] = useState([])

const sendMessage = async () => {

 if(!message) return

 const userMsg = { sender:"user", text:message }

 setChats(prev => [...prev,userMsg])

 const res = await axios.post(
 "http://localhost:5000/api/ai/chat",
 { message }
 )

 const aiMsg = { sender:"ai", text:res.data.reply }

 setChats(prev => [...prev,aiMsg])

 setMessage("")
}

return(

<div style={{
width:"400px",
margin:"auto",
border:"1px solid gray",
borderRadius:"10px",
padding:"10px"
}}>

<h3 style={{textAlign:"center"}}>
AI Assistant
</h3>

<div style={{
height:"350px",
overflowY:"scroll",
border:"1px solid #ddd",
padding:"10px",
marginBottom:"10px"
}}>

{chats.map((chat,i)=>(

<div
key={i}
style={{
textAlign: chat.sender==="user" ? "right":"left",
margin:"8px"
}}
>

<span style={{
background: chat.sender==="user" ? "#007bff":"#e5e5ea",
color: chat.sender==="user" ? "white":"black",
padding:"8px 12px",
borderRadius:"10px",
display:"inline-block"
}}
>

{chat.text}

</span>

</div>

))}

</div>

<input
value={message}
onChange={(e)=>setMessage(e.target.value)}
placeholder="Type message..."
style={{width:"75%",padding:"8px"}}
/>

<button
onClick={sendMessage}
style={{padding:"8px"}}
>
Send
</button>

</div>

)

}

export default AIChat