import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import toast, { Toaster } from "react-hot-toast";
import io from 'socket.io-client'
import Chat from '../components/Chat';
import  Input from '../components/Input' ;
import {Send} from 'lucide-react'
import Herchat from '../components/Herchat';


const Home = () => {


  const DataMessage=[1,2,3,4,5,6,7,8,9,10];
  const [getNick,setNick]=useState(null);

  const[latitude,Setlatitude]=useState(null);

  const[longitude,Setlongitude]=useState(null);

  const[Code,SetCode]=useState(null);

  const nickRef=useRef();

  const Backend='http://localhost:199';


  

  const nameRef=useRef(null);
  const handleAdd=()=>{
    const NickName=nameRef.current.value;
    setNick(NickName);
    localStorage.setItem('nickname',getNick);
    toast.success("Anonymous Name added Succuessfully!")
    console.log(NickName);
  }
  const UserData=JSON.parse(localStorage.getItem('userdata'));

  const getLocation=()=>{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>{
           Setlatitude(position.coords.latitude);
           Setlongitude(position.coords.longitude);
          })
        }
      }
      let socket;
      console.log(Code);
      useEffect(()=>{
        getLocation(); 
        let SecretCode;
        if(latitude && longitude)
          {
              const la=latitude.toString();
              const lo=longitude.toString();
              SecretCode=la.substring(0,la.length-1)+lo.substring(0,lo.length-1);
              console.log(SecretCode);
              SetCode(SecretCode);
          }

          socket=io(Backend);
          socket.emit('join',{name:UserData.name,room:SecretCode});
          setTimeout(() =>{
            toast.success(`${UserData.name} joined the room`, { duration: 3000, icon: "😉" });
          }, 3000);
          return ()=>{
            socket.disconnect();
            socket.off();
          }
          
  },[latitude,longitude]);

  let NickName=localStorage.getItem('nickname');


  return (
    <> 
          <Toaster />
     <Navbar props={Code}/>
     <div className='w-screen h-screen bg-gray-300 flex justify-center items-center'>
     {
      NickName==null?(
        <>
        <div className='w-screen h-screen flex justify-center items-center'>
          <div className='w-[400px] h-[300px] flex flex-col bg-gray-600 rounded-2xl justify-center items-center space-y-3'>
              <div className='w-full text-green-400 text-center font-bold text-2xl'>
                 Welcome,on board.
              </div>
              <div className='w-full text-white text-center font-bold text-3xl'>
                Your anonymous name?
              </div>
              <div className='w-[80%] rounded-2xl flex justify-center items-center bg-green-200 text-black'>
                <input ref={nameRef} className='w-full h-full pl-2 pr-2 pt-4 pb-4' type="text" placeholder='Anonymous name' />
              </div>
              <div className='w-full flex justify-end text-[15px] text-red-600 font-light'>
                 * We will not disclose your details anywhere🤫
              </div>
              <div className='w-full flex justify-end p-4'>
                  <button onClick={handleAdd} className='p-2 bg-green-600 rounded-2xl text-white text-[15px]'>
                      Set Name
                  </button>
              </div>
          </div>
        </div>
        </>
      ):(
        <>
        <div className='bg-gray w-screen h-auto flex flex-col justify-center items-center'>
          <div>
            {
            true&&(
              DataMessage.map((item,index)=>{
                return(
                  <>
                <Chat/>
                <Herchat/>
                </>
                )
              })
            )
          }
          </div>
          <div className='w-full flex justify-center items-center fixed bottom-0'>
          <input type="text" className=' text-white bg-[#141413] rounded-3xl w-[80%] h-[50px] '/>
          <Send size={40}/>  
          </div>         
        </div>
        </>
      )
     }
     
</div>
    </>
  )
}

export default Home