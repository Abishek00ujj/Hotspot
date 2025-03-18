import React from 'react'
import UserImg from '../assets/user.jpg'
import {Sun} from 'lucide-react'
import {Moon} from 'lucide-react'
const Navbar = (props) => {
    const storedUserData = localStorage.getItem('userdata');
    const UserData = storedUserData ? JSON.parse(storedUserData) : null;
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
        <div className='w-[40px] h-[40x] border-white flex justify-center items-center'>
            <img src={UserData.picture?UserData.picture:UserImg} className='rounded-full' alt=""/>
         </div>

        </div>
    </div>
    </>
  )
}

export default Navbar;