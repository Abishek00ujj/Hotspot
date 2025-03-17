import React from 'react'
import {Send} from 'lucide-react'

const Input = () => {
  return (
    <div>
        <div className='w-screen h-screen flex justify-center items-center fixed bottom-0'>
            <input type="text" className='bg-[#141413] rounded-3xl w-[80%] h-[50px] '/>
           <Send/>           
        </div>
    </div>
  )
}

export default Input