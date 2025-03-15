import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
const Home = () => {
  const [getNick,setNick]=useState(null);

  const nameRef=useRef(null);
  const handleAdd=()=>{
    const NickName=nameRef.current.value;
    console.log(NickName);
  }



  return (
    <>
     <Navbar/>
     <div className='w-screen h-screen bg-gray-300 flex'>
     {
      getNick==null?(
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
        null
      )
     }
     
</div>
    </>
  )
}

export default Home