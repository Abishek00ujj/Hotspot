import React from 'react'
import UserImg from '../assets/user.jpg'
import {Loader, Sun} from 'lucide-react'
import {Moon} from 'lucide-react'
import {useState} from 'react'
import { Navigate } from 'react-router-dom'
const Navbar = (props) => {
    const storedUserData = localStorage.getItem('userdata');
    const UserData = storedUserData ? JSON.parse(storedUserData) : null;

    const [hover, setHover] = useState(false);

    const [redirect, setRedirect] = useState(false);

    const handleHover=()=>{
      setHover(!hover);
    }

    const handleNickname=()=>{
      localStorage.removeItem('nickname');
      window.location.reload();
    }


    const handleLogout=()=>{
      localStorage.removeItem('userdata');
      localStorage.removeItem('nickname');
      setRedirect(true);
    }
    if(redirect)
    {
      return <Navigate to="/"/>
    }
    console.log(props)
  return (
    <>
    <div className='w-screen h-auto bg-blue-950 flex justify-between p-4 top-0'>
        <div className='text-2xl text-green-400 font-semibold flex justify-center items-center'>
             HOTSPOT
        </div>
        <div>
        <div>
          {
             
          }
        </div>
        <div onClick={handleHover} className='w-[40px] h-[40x] border-white flex justify-center items-center'>
            <img src={UserData.picture?UserData.picture:UserImg} className='rounded-full' alt=""/>
         </div>

        </div>
    </div>
    {
      hover?(
        <div className='w-[150px] h-[100px] top-20 right-0 space-y-2 absolute'>
             <div onClick={handleNickname} className='w-full h-[50px] bg-green-400 flex justify-center items-center'>
                Set New Name
             </div>
             <div onClick={handleLogout} className='w-full h-[50px] bg-green-400 flex justify-center items-center'>
                Logout
             </div>
        </div>
      ):(
         null
      )
    }
    </>
  )
}

export default Navbar;