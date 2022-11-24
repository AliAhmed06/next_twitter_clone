import React, { useState } from 'react'
import FollowSectionItem from './FollowSectionItem'
import { motion, AnimatePresence  } from "framer-motion"

function FollowSection({usersToFollow}) {
  const [userToFollowCounter, setUserToFollowCounter] = useState(2);
  return (
    <div className='bg-gray-100 py-4 w-10/12 mx-auto mt-5 rounded-lg flex flex-col items-start justify-center'>
          <h4 className='text-xl font-bold  pl-4'>Whats happening</h4>
          
          <AnimatePresence>
            {usersToFollow.slice(0,userToFollowCounter).map((item) => (              
              <motion.div 
                key={item.name.first}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity:0}}
                transition={{ duration: 1 }}
            >
              <FollowSectionItem userToFollow={item} />
            </motion.div>
            ))}
          </AnimatePresence>
          
          <button 
            className='text-md text-blue-400 hover:text-blue-300  pl-4'
            onClick={() => setUserToFollowCounter(userToFollowCounter + 2) }
          >Show more</button>
          
          {userToFollowCounter > 2  &&  
          <button 
            className='text-md text-blue-400 hover:text-blue-300  pl-4'
            onClick={() => setUserToFollowCounter(2) }
          >Show less</button>            
          }
    </div>
  )
}

export default FollowSection