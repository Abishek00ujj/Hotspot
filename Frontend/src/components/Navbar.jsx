import React,{useEffect} from 'react'
import UserImg from '../assets/user.jpg'
import {Loader, Sun} from 'lucide-react'
import {Moon} from 'lucide-react'
import {useState} from 'react'
import { Navigate } from 'react-router-dom'
import LogoImage from '../assets/op.png'
import { Link } from 'react-router-dom'
const Navbar = (props) => {
  const storedUserData = localStorage.getItem("userdata");
  const UserData = storedUserData ? JSON.parse(storedUserData) : null;

  const [hover, setHover] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [bigger, setBigger] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setBigger(false);
    }, 1000);
  }, []);

  const handleHover = () => {
    setHover(!hover);
  };

  const handleNickname = () => {
    localStorage.removeItem("nickname");
  };

  const handleLogout = () => {
    localStorage.removeItem("userdata");
    localStorage.removeItem("nickname");
    setRedirect(true);
  };

  return (
    <>
      {redirect && <Navigate to="/" />}
      <div className="w-screen h-80px] bg-blue-950 flex justify-between p-4 top-0">
        <div className="text-2xl text-green-400 font-semibold flex justify-center items-center">
          HOTSPOT
          {bigger ? (
            <img
              className="transition-all duration-1000 ease-in-out w-[500px] h-[500px]"
              src={LogoImage}
              alt=""
            />
          ) : (
            <img
              className="transition-all duration-1000 ease-in-out w-[60px] h-[60px]"
              src={LogoImage}
              alt=""
            />
          )}
        </div>
        <div>
          <div></div>
          <div
            onClick={handleHover}
            className="w-[40px] h-[40x] border-white flex justify-center items-center"
          >
            <img
              src={UserData?.picture ? UserData.picture : UserImg}
              className="rounded-full"
              alt=""
            />
          </div>
        </div>
      </div>
      {hover && (
        <div className="w-[150px]  top-20 right-0 space-y-2 absolute">
          <div
            onClick={handleNickname}
            className="w-full h-[50px] bg-green-400 flex justify-center items-center rounded-2xl"
          >
            Set New Name
          </div>
          <div
            className="w-full h-[50px] bg-green-400 flex justify-center items-center rounded-2xl"
          >
            <Link className='w-full h-full flex justify-center items-center' to='/aboutus'>
               About us
            </Link>
          </div>
          <div
            onClick={handleLogout}
            className="w-full h-[50px] bg-red-400 flex justify-center items-center rounded-2xl"
          >
            Logout
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
