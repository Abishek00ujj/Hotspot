import React, { useState } from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';
const Login = () => {

    const [navigate,setNavigate]=useState(false);


    if(navigate)
    {
        return <Navigate to="/home"/>
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

    </div>
   </>
  )
}

export default Login