import React, { useEffect, useRef, useState } from 'react'
import { IoVolumeMedium } from "react-icons/io5";
import { FiVolumeX } from "react-icons/fi";

function VideoPlayer({ media }) {
    const videoTag = useRef()
    const [mute, setMute] = useState(true)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMute, setIsMute] = useState(false)

    const handleClick = () => {
        if (isPlaying) {
            videoTag.current.pause()
            setIsPlaying(false)
        } else {
            videoTag.current.play()
            setIsPlaying(true)
        }
    }
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            const video = videoTag.current
            if (entry.isIntersecting) {
                video.play()
                setIsPlaying(true)
            } else {
                video.pause()
                setIsPlaying(false)
            }
        }, { threshold: 0.6 })
        if (videoTag.current) {
            observer.observe(videoTag.current)
        }
        return () => {
            if (videoTag.current) {
                observer.unobserve(videoTag.current)
            }
        }
    }, [])
    return (
        <div className='h-[100%] relative cursor-pointer max-w-full rounded-2xl overflow-hidden'>
            <video ref={videoTag} src={media} autoPlay loop muted={mute} className='h-[100%] cursor-pointer w-full object-cover rounded-2xl'
                onClick={handleClick} />

            <div className='absolute bottom-[10px] right-[10px]' onClick={() => setMute(prev => !prev)}>
                {!mute ? <IoVolumeMedium className='w-[20px] h-[20px] text-white font-semibold' /> : <FiVolumeX className='w-[20px] h-[20px] text-white font-semibold' />}
            </div>
        </div>
    )
}

export default VideoPlayer
