import React from 'react'

const Navbar = () => {
    const storedUserData = localStorage.getItem('userdata');
    const UserData = storedUserData ? JSON.parse(storedUserData) : null;
    console.log(UserData)
  return (
    <>
    <div className='w-screen h-auto bg-black flex justify-between p-4'>
        <div className='text-2xl text-green-400 font-semibold flex justify-center items-center'>
             HOTSPOT
        </div>
         <div className='w-[40px] h-[40x] border-white flex justify-center items-center'>
            <img src={UserData.picture} className='rounded-full' alt="jjk"/>
         </div>
    </div>
    </>
  )
}

export default Navbar;