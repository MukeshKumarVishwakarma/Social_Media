import React from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { RxVideo } from 'react-icons/rx'
import { FaRegPlusSquare } from "react-icons/fa";
import dp from "../assets/dp.jpg"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Nav() {
    const navigate = useNavigate()
    const {userData} = useSelector(state=>state.user)
    if(!userData){
        return null;
    }
    return (
        <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
            <div onClick={()=>navigate("/")}><IoHomeSharp className='text-white cursor-pointer w-[25px] h-[25px]' /></div>
            <div onClick={()=> navigate("/search")}><FaSearch className='text-white cursor-pointer w-[25px] h-[25px]' /></div>
            <div onClick={()=>navigate("/upload")}><FaRegPlusSquare className='text-white cursor-pointer w-[25px] h-[25px]' /></div>
            <div onClick={()=> navigate("/loops")}><RxVideo className='text-white cursor-pointer w-[28px] h-[28px]' /></div>
            <div>
                <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden' 
                onClick={() => navigate(`/profile/${userData.userName}`)}>
                    <img 
                    src={userData?.profileImage || dp} 
                    alt="Profile" 
                    className='w-full object-cover' 
                    />
                </div>
            </div>
        </div>
    );
}

export default Nav

