import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { IoArrowBack } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import axios from 'axios';
import { serverUrl } from '../App';
import getAllNotifications from '../hooks/getAllNotifications';
import { setNotificationData } from '../redux/userSlice';


function Notifications() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { notificationData } = useSelector(state => state.user)
    const ids = notificationData.map((n) => n._id)
    const markAsRead = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/user/markAsRead`, { notificationId: ids }, { withCredentials: true })
            await fetchNotifications()
        } catch (error) {
            console.log(error);
        }
    }

    const fetchNotifications = async () => {
        try {
            const result = await axios.get(`${serverUrl}/api/user/getAllNotifications`, { withCredentials: true })
            dispatch(setNotificationData(result.data))
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        markAsRead()
    }, [])
    return (
        <div className='w-full h-[100vh] bg-black overflow-auto'>
            <div className='w-full h-[80px] flex items-center gap-[20px] px-[20px] lg:hidden'>
                <IoArrowBack className='text-white cursor-pointer w-[25px] h-[25px]'
                    onClick={() => navigate(`/`)} />
                <h1 className='text-white font-semibold text-[20px]'>Notifications</h1>
            </div>

            <div className='w-full flex-col flex gap-[20px] h-[100%] px-[10px]'>
                {notificationData?.map((noti, index) => (
                    <NotificationCard noti={noti} key={index} />
                ))}
            </div>
        </div>
    )
}

export default Notifications
