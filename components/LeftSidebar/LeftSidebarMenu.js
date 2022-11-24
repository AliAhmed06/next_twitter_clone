import { Button } from '@mui/material'
import React from 'react'

const LeftSidebarMenu = ({Icon, title}) => {
  return (
        <div className='flex items-center justify-center p-2  md:px-4 rounded-full transition duration-300 ease-in-out gap-3 hover:bg-gray-200 mb-2 cursor-pointer'>
            <Icon />
            <span className="text-xl hidden md:inline-flex capitalize">{title}</span>
        </div>
  )
}

export default LeftSidebarMenu