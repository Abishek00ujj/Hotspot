import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
import {XIcon} from 'lucide-react'

const Login = () => {

    const [navigate,setNavigate]=useState(false);

    const [terms,Setterms]=useState(false);

    const UserData=localStorage.getItem('userdata');
    if(UserData)
    {
       return <Navigate to="/home"/>
    }
    if(navigate)
    {
        return <Navigate to="/home"/>
    }

    const Terms=()=>{
      Setterms(true);
    }
  return (
   <>
    <div
      id="bg"
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExc2htZDdvY21tNDZ1bGdwZHh5bGNpYXQxcGc1eHRwazhocjRtczAzcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/5my3jD9HAX4jm6njTe/giphy.gif')",
      }}
    >
        <div className='w-[450px] h-600px flex-col justify-center items-center bg-black rounded-2xl p-10 space-y-2'>
            <div className='text-green-300 text-3xl font-bold w-full  text-center'>
               WELCOME TO HOTSPOT
            </div>
            <div className='w-full flex justify-end text-green-300 text-[15px] font-bold'>
             A Place Where you can find Nearby peoples.
            </div>

            <GoogleLogin
            onSuccess={(credentialResponse) => {
              const { credential } = credentialResponse;
              console.log('Google Token:', credential);
              const decodedToken = JSON.parse(atob(credential.split('.')[1])); 
              const userData = {
                name: decodedToken.name,
                email: decodedToken.email,
                picture: decodedToken.picture,
              };
              console.log("Data:"+JSON.stringify(userData));
              localStorage.setItem('userdata', JSON.stringify(userData));
              console.log(localStorage.getItem('userdata'));
              if (credential) {
                setNavigate(true);
              }
            }}
            onError={() => {
              console.error('Login Failed');
            }}
          />
        </div>
        {
          !terms?(
               <>
                   <div className='w-[450px] h-[200px] bg-gray-800 text-red-400 fixed rounded-2xl flex flex-col'>
          <div className='w-full h-full flex justify-between'>
              <div className='w-full flex flex-col justify-start items-center'>
                 <p className='text-green-500 text-[20px]'>TERMS & CONDITONS</p>
                 <div className='w-full h-full flex flex-col justify-center items-start pl-5'>
                    <div className='text-[15px] text-white font-medium'>
                       1.Maintain Discipline
                    </div>
                    <div className='text-[15px] text-white font-medium'>
                       2.Don't Disclose your personal details.
                    </div>
                    <div className='text-[15px] text-white font-medium'>
                       3.You will be banned if any mis-behaviours found.
                    </div>
                    <div className='text-[15px] text-white font-medium'>
                       4.Threading warning.
                    </div>
                    <div className='text-[15px] text-white font-medium'>
                       5.Entertainment purpose only.
                    </div>
                 </div>
              </div>
          </div>
          <div className='w-full h-auto flex justify-end pb-2 pr-3'>
                   <button className='pl-4 pr-4 pt-2 pb-2 flex justify-center items-center rounded-2xl bg-green-700 text-black' onClick={Terms}>
                    Accept
                   </button>
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

export default Login