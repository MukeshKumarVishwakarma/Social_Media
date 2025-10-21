// import React, { useEffect, useState } from 'react'
// import { IoArrowBack } from "react-icons/io5";
// import { useNavigate } from 'react-router-dom';
// import { FaSearch } from "react-icons/fa";
// import axios from 'axios';
// import { serverUrl } from '../App';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSearchData } from '../redux/userSlice';
// import dp from "../assets/dp.jpg"

// function Search() {
//     const navigate = useNavigate()
//     const [input, setInput] = useState("")
//     const dispatch = useDispatch()
//     const {searchData} = useSelector(state => state.user)

//     const handleSearch = async (e) => {
//         e.preventDefault()
//         try {
//             const result = await axios.get(`${serverUrl}/api/user/search?keyWord=${input}`,
//                 {withCredentials: true}
//             );
//             dispatch(setSearchData(result.data))
//             console.log(result.data);
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     useEffect(()=>{
//         handleSearch()
//     },[input])
//     return (
//         <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]'>
//             <div className='w-full h-[80px] flex items-center gap-[20px] px-[20px] absolute top-0'>
//                 <IoArrowBack className='text-white cursor-pointer w-[25px] h-[25px]'
//                     onClick={() => navigate(`/`)} />
//             </div>

//             <div className='w-full h-[80px] flex items-center justify-center mt-[80px]'>
//                 <form className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center px-[20px]">
//                     <FaSearch className='w-[18px] h-[18px] text-white' />
//                     <input type="text" placeholder='Search...' className='w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px]' 
//                     onChange={(e)=>setInput(e.target.value)} 
//                     value={input} />
//                 </form>
//             </div>

//             {input && searchData?.map((user)=> (
//                 <div className='w-[90vw] max-w-[700px] h-[60px] rounded-full bg-white flex items-center gap-[20px] px-[5px] cursor-pointer hover:bg-gray-200'
//                 onClick={()=> navigate(`/profile/${user.userName}`)}>
//                     <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden' >
//                         <img src={user.profileImage || dp} alt="" className='w-full object-cover' />
//                     </div>

//                     <div className='text-black text-[18px] font-semibold'>
//                         <div>{user.userName}</div>
//                         <div className='text-[14px] text-gray-400'>{user.name}</div>
//                     </div>
//                 </div>
//             ))}

//             {!input && <div className='text-[30px] text-gray-700 font-semibold'>Search Here...</div>}
//         </div>
//     )
// }

// export default Search




import React, { useEffect, useState } from 'react';
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchData } from '../redux/userSlice';
import dp from "../assets/dp.jpg";

function Search() {
    const navigate = useNavigate();
    const [input, setInput] = useState("");
    const dispatch = useDispatch();
    const { searchData } = useSelector((state) => state.user);


    const handleSearch = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!input.trim()) {
            dispatch(setSearchData([]));
            return;
        }

        try {
            const result = await axios.get(`${serverUrl}/api/user/search?keyWord=${input}`,
                {
                    withCredentials: true,
                }
            );
            dispatch(setSearchData(JSON.parse(JSON.stringify(result.data))));
            console.log("Search result:", result.data);
        } catch (error) {
            console.log("Search error:", error.response?.data || error.message);
        }
    };
    useEffect(() => {
        handleSearch();
    }, [input]);

    return (
        <div className="w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]">
            <div className="w-full h-[80px] flex items-center gap-[20px] px-[20px] absolute top-0">
                <IoArrowBack className="text-white cursor-pointer w-[25px] h-[25px]"
                    onClick={() => navigate(`/`)} />
            </div>

            <div className="w-full h-[80px] flex items-center justify-center mt-[80px]">
                <form className="w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414] flex items-center px-[20px]"
                    onSubmit={handleSearch}>
                    <FaSearch className="w-[18px] h-[18px] text-white" />
                    <input type="text" placeholder="Search..." className="w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px]"
                        onChange={(e) => setInput(e.target.value)} value={input} />
                </form>
            </div>

            {input &&
                searchData?.map((user, idx) => (
                    <div key={idx}
                        className="w-[90vw] max-w-[700px] h-[60px] rounded-full bg-white flex items-center gap-[20px] px-[5px] cursor-pointer hover:bg-gray-200"
                        onClick={() => navigate(`/profile/${user.userName}`)}>
                        <div className="w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden">
                            <img src={user.profileImage || dp} alt="" className="w-full object-cover" />
                        </div>

                        <div className="text-black text-[18px] font-semibold">
                            <div>{user.userName}</div>
                            <div className="text-[14px] text-gray-400">{user.name}</div>
                        </div>
                    </div>
                ))}

            {!input && (
                <div className="text-[30px] text-gray-700 font-semibold">
                    Search Here...
                </div>
            )}
        </div>
    );
}

export default Search;
