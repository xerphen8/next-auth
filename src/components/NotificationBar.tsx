import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-regular-svg-icons'

export const NotificationBar = () => {
  return (
    <div className='py-2 px-3 items-center justify-center text-gray-500 border-gray-500 rounded-full bg-[#333139]
    hover:cursor-pointer hover:text-white hover:bg-[#3B3C5C] transition delay-75'>
        <FontAwesomeIcon className='text-xl' icon={faBell}/>
    </div>
  )
}
