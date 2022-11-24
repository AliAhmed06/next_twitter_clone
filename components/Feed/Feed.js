import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react"
import { db } from "../../firebase";
import FeedHeader from "./FeedHeader"
import FeedPost from "./FeedPost"
import { motion, AnimatePresence  } from "framer-motion"

function Feed() {
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    getData();  
  }, [db])
  
  const getData = async () => {
    await onSnapshot(query(collection(db, 'posts'), orderBy("timestamp", "desc")), 
    (snapshot) => {
      setPosts(snapshot.docs.map((data)=>{
        return {...data.data(), postId:data.id}
      }));
    })     
  }


  return (
    <div className='border-r border-gray-300 w-full lg:w-6/12 bg-white'>
        <FeedHeader />
        
          <AnimatePresence>
          { posts.map((post) => (
            <motion.div 
                key={post.postId}
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                exit={{ opacity:0}}
                transition={{ duration: 1 }}
            >
              <FeedPost post={post} />
            </motion.div>
          )) }
        </AnimatePresence>
        {/* <FeedPost />

        <FeedPost />

        <FeedPost /> */}
        
        
    </div>
  )
}

export default Feed