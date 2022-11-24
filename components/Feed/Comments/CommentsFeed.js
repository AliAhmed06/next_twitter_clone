import { ArrowBack } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { doc, onSnapshot } from "firebase/firestore";
import {useRouter} from 'next/router'
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import CommentsFeedPost from "./CommentsFeedPost";

function CommentsFeed() {
  const router = useRouter();
  const postId = router.query.id;
  const [post, setPost] = useState({});

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot.data())          
    })    
  }, [postId, db])
  return (
    <div className='border-r border-gray-300 w-full lg:w-6/12 bg-white'>
      <div className='flex items-center p-3 border-b sticky top-0 z-10 bg-white gap-5'>
          <IconButton onClick={() => router.push("/")}>
            <ArrowBack />
          </IconButton>
          <h2 className='font-bold text-lg'>Tweet</h2>
      </div>

      <CommentsFeedPost post={post} postId={postId} />
    </div>
  )
}

export default CommentsFeed