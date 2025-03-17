import React from 'react'
import { data } from 'react-router-dom'

const Herchat = ({message,name}) => {
    const Time=new Date().toLocaleTimeString().toString();

    let t=Time.split(":");
      let q= t[2].split(" ");
  return (
    <>
    <div className='w-screen flex justify-start'>
       <div className='w-[80%] bg-gray-500 h-auto text-white flex flex-col rounded-[5px] p-1'>
           <div className='w-full flex justify-start text-[10px]'>
               {name}
           </div>
           <div className='w-full pl-1.5'>
                  {message}
           </div>
           <div className='text-[8px] w-full justify-end flex pr-1.5'>
                {t[0]+":"+t[1]+" "+q[1]}
           </div>
       </div>
    </div>
    </>
  )
}

export default Herchat