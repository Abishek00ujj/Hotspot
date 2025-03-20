import React from 'react';
import Navbar from '../components/Navbar';

const AboutUs = () => {
  return (
    <>
    <Navbar/>
     <div className='w-screen h-screen bg-[#141413] flex flex-col items-center p-6 text-white'>
      <p className='text-3xl text-center font-semibold'>HOTSPOT</p>

      <div className='w-full mt-4'>
        <div className='text-2xl font-semibold'>Product: HOTSPOT</div>

        <p className='text-[15px] text-start mt-2'>
          HOTSPOT is a <span className="font-semibold">location-based anonymous chat app</span> that lets you 
          connect with people nearby without revealing your identity. Whether you 
          want to chat with locals, discuss trending topics, or make new connections, 
          HOTSPOT provides a secure and <span className="font-semibold">real-time messaging</span> experience.
        </p>

        <ul className='list-disc ml-5 mt-3 space-y-1 text-[15px]'>
          <li><span className="font-semibold">Location-based rooms:</span> Auto-joins chat rooms based on GPS, covering approx. <span className="font-semibold">1 km radius</span>.</li>
          <li><span className="font-semibold">Stay anonymous:</span> No personal details needed—just pick a nickname and start chatting.</li>
          <li><span className="font-semibold">Instant messaging:</span> Built with <span className="font-semibold">React, ExpressJS, NodeJS, and Socket.IO</span>.</li>
          <li><span className="font-semibold">Lightweight & Fast:</span> Works even on low bandwidth.</li>
          <li><span className="font-semibold">Safe & Moderated:</span> Messages stay within the local chatroom and disappear after a session. (No DataBase)</li>
          <li><span className="font-semibold">Free & Easy to Use:</span>chat, and connect instantly!</li>
        </ul>

        <div className='mt-6'>
          <p className='text-lg font-semibold'>Developed by:</p>
          <p className='text-[15px] mt-1'>
            <span className="font-semibold">Abishek S.</span>, B-Tech IT
            <br />
            Software Engineer at Mr. Cooper, Chennai.
            <br />
            connect with me on <a className='underline text-blue-600' href=" https://www.linkedin.com/in/abisheks22it/">-LinkedIn</a>
            <br />

             All my Projects in :<a className='underline' href="https://codewithabi.vercel.app">Portfolio</a>
          </p>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default AboutUs;
