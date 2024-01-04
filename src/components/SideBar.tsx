import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faList } from '@fortawesome/free-solid-svg-icons'

export const SideBar = () => {
    return (
        <div className='2xl:w-[300px] 2xl:h-[95%] xl:w-[300px] xl:h-[95%] lg:w-[300px] lg:h-[95%] bg-[#333139] rounded-xl m-5'>
            <div className='xl:w-full lg:w-full text-white flex items-center text-left ml-8 py-10'>
                <Image src='/twogather_logo.png' className='hover:cursor-pointer' alt="" width={200} height={200}/>
            </div>
            <div className='list-none flex'>
                <div className='xl:w-full px-5'>
                    <button className='2xl:w-full xl:w-full lg:w-full md:w-full relative gap-5 text-gray-500 px-3 py-5 text-xl inline-flex items-center rounded-lg text-left hover:cursor-pointer hover:text-white hover:bg-[#3B3C5C] transition delay-75'>
                        <FontAwesomeIcon icon={faHouse} />
                        Home
                    </button>
                    <button className='w-full relative gap-5 text-gray-500 px-3 py-5 text-xl inline-flex items-center rounded-lg text-left hover:cursor-pointer hover:text-white hover:bg-[#3B3C5C] transition delay-75'>
                        <FontAwesomeIcon icon={faList} />
                        Categories
                    </button>
                </div>
            </div>
        </div>
    )
}