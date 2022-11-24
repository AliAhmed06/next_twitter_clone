import { useState } from 'react'
import NewsSectionItem from './NEwsSectionItem';
import { motion, AnimatePresence  } from "framer-motion"

function NewsSection({newsResult}) {
  const [newsCounter, setNewsCounter] = useState(3);
  return (
    <div className='bg-gray-100 py-4 w-10/12 mx-auto mt-2 rounded-lg flex flex-col items-start justify-center'>
          <h4 className='text-xl font-bold  pl-4'>Whats happening</h4>
          
          <AnimatePresence>          
            {newsResult.slice(0,newsCounter).map((article) => (              
              <motion.div 
                key={article.title}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity:0}}
                transition={{ duration: 1 }}
            >
              <NewsSectionItem article={article} />
            </motion.div>
            ))}
          </AnimatePresence>
          
          <button 
            className='text-md text-blue-400 hover:text-blue-300  pl-4'
            onClick={() => setNewsCounter(newsCounter + 2) }
          >Show more</button>
          
          {newsCounter > 3 &&  
          <button 
            className='text-md text-blue-400 hover:text-blue-300  pl-4'
            onClick={() => setNewsCounter(3) }
          >Show less</button>            
          }
    </div>
  )
}

export default NewsSection