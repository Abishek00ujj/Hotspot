import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import toast, { Toaster } from "react-hot-toast";
import io from 'socket.io-client';
import Chat from '../components/Chat';
import Herchat from '../components/Herchat';
import { Send, User } from 'lucide-react';

const Home = () => {
  let nickName=localStorage.getItem('nickname');
  const messageRef = useRef(null);
  const nameRef = useRef(null);
  const chatContainerRef = useRef(null);
  const socketRef = useRef(null);

  const [nick, setNick] = useState(localStorage.getItem("nickname"));
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [code, setCode] = useState(null);
  const [messages, setMessages] = useState([]);

  const Backend = 'https://hotspot5.onrender.com';
  const UserData = JSON.parse(localStorage.getItem('userdata'));

  const handleAdd = () => {
    const NickName = nameRef.current.value.trim();
    if (!NickName) return;

    setNick(NickName);
    localStorage.setItem('nickname', NickName);
    toast.success("Anonymous Name added Successfully!");
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const la = Math.floor(location.latitude / 0.01);
      const lo = Math.floor(location.longitude / 0.01);
      const SecretCode = `${(la)}_${(lo)}`;
      setCode(SecretCode);

      socketRef.current = io(Backend);
      socketRef.current.emit("join", { name: nickName, room: SecretCode });

      toast.success(`Welcome ${UserData?.name}!`, { duration: 3000, icon: "🎉" });

      socketRef.current.on("message", (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [location,nickName]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  //console.log(messages);

  const sendMessage = () => {
    const messageText = messageRef.current.value.trim();
    if (!messageText) return;

    socketRef.current.emit("sendMessage", messageText);
    messageRef.current.value = '';
  };

  //console.log(nickName);

  return (
    <>
      <Toaster />
      <Navbar props={location} />
      <div className='w-screen h-screen flex flex-col bg-[#121111] items-center'>
        {!nickName ? (
          <div className='w-full h-screen flex justify-center items-center'>
            <div className='w-[90%] sm:w-[400px] h-auto p-6 flex flex-col bg-gray-600 rounded-2xl justify-center items-center space-y-4'>
              <h2 className='text-green-400 font-bold text-2xl text-center'>
                Welcome, on board.
              </h2>
              <p className='text-white font-bold text-lg text-center'>
                Your anonymous name?
              </p>
              <input 
                ref={nameRef} 
                className='w-full p-3 rounded-xl bg-green-200 text-black' 
                type="text" 
                placeholder='Anonymous name' 
              />
              <p className='text-red-600 text-sm text-center'>* We will not disclose your details anywhere 🤫</p>
              <button onClick={handleAdd} className='px-4 py-2 bg-green-600 rounded-xl text-white'>
                Set Name
              </button>
            </div>
          </div>
        ) : (
          <div className='w-full h-screen flex flex-col bg-[#121111]'>
            <div 
              ref={chatContainerRef} 
              className='flex-1 text-white overflow-y-auto p-4 space-y-3 w-full max-w-2xl mx-auto'
              style={{ maxHeight: 'calc(100vh - 100px)' }}
            >
             {
             location.latitude && (
                "Location coordinates: "+location.latitude+" "+location.longitude
              )
            }
              {messages.map((msg, index) => (
                // console.log(msg.user)
                msg.user.trim() != nickName.toLocaleLowerCase()||""
                  ?<Herchat key={index} message={msg.text} name={msg.user} /> 
                  :<Chat key={index} message={msg.text} name={nick} /> 
              ))}

            </div>

            <div className='w-full max-w-2xl mx-auto p-4 flex items-center bg-black border-t border-gray-300 fixed bottom-0 left-0 right-0'>
              <input 
                ref={messageRef} 
                type="text" 
                className='flex-1 text-white p-3 rounded-full border border-gray-400' 
                placeholder='Type a message...' 
              />
              <Send onClick={sendMessage} size={40} className='text-blue-600 ml-3 cursor-pointer' />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
