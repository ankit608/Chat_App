import React ,{useRef,useState,useEffect} from "react";
import { useHistory } from "react-router-dom";
import {Avatar, ChatEngine}from 'react-chat-engine';
import { auth } from "./firebase";
import { logDOM } from "@testing-library/dom";
import { useAuth } from "./contexts/AuthContext";
import axios from "axios";
import { Loading3QuartersOutlined } from "@ant-design/icons";
const Chats = ()=>{

   


    const history = useHistory();
    const {user} = useAuth();
     const [loading,setLoading] = useState(true);
           console.log(process.env.KEY);

     const getFile = async (url)=>{
               const response = await fetch(url);
               const data = await response.blob();
                return new File([data],"userPhoto.jpg",{type:"image/jpeg"})   
   
     }

   const handleLogout = async()=>{

       await auth.signOut();
       history.push('/');

   }
  
   useEffect(()=>{
    if(!user){ 
       history.push('/')
       return
    }
          
    axios.get('https://api.chatengine.io/users/me',{
            Headers:{
               "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,


            }

    }).then(()=>{
       setLoading(false);
    }).catch(()=>{
         let formdata = new FormData();
         formdata.append('email',user.email);
         formdata.append('username', user.email);
         formdata.append('secret', user.uid);
         getFile(user.photoURL).then((Avatar)=>{formdata.append('Avatar',Avatar,Avatar.name)})
 
               axios.post('https://api.chatengine.io/users',formdata,{headers:{"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY}}).then(setLoading(false)).catch((error)=>{console.log(error)})


    })
     
   },[user,history])

    if(!user||loading) return 'loading...';


   return(
          <div className="chats-page">
             <div className ="nav-bar">
                <div className="logo-tab">
                   ChatApp

                </div>
                <div   onClick={handleLogout}className="logout-tab">
                  logout

                </div>
             </div>
               <ChatEngine height="calc(100vh-66px)"
                projectID = {process.env.REACT_APP_CHAT_ENGINE_ID}
                userName =  {user.email}
                userSecret= {user.uid}
               >

               </ChatEngine>
          
          </div>
   );


}

export default Chats;