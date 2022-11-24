import Image from "next/image"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton } from "@mui/material";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Moment from 'react-moment';

import { signIn, useSession } from "next-auth/react";
import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../../../atom/modalAtom";
import { db, storage } from "../../../firebase";
import {useRouter} from 'next/router'
import CommenItem from "./CommentItem"

function CommentsFeedPost({post, postId}) {
    const router = useRouter();
    const {data: session} = useSession();  
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    const [open, setOpen] = useRecoilState(modalState)
    const [postIdd, setPostId] = useRecoilState(postIdState)    
    // const [postId, setPostId] = useRecoilState(postIdState)

    useEffect(() => {
      const unsubscribe = onSnapshot(
        collection(db, "posts", postId, "likes"),
        (snapshot)=>setLikes(snapshot.docs)
      )

      const cmnts = onSnapshot(
        collection(db, "posts", postId, "comments"),
        (snapshot)=>setComments(snapshot.docs)
      )
    }, [db])
    
    useEffect(() => {
      setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1 );
    }, [likes])
    

    async function likePost(){
        if(session){
            if(hasLiked){
                deleteDoc(doc(db, "posts", postId, "likes", session?.user.uid))
            }
            else{
                await setDoc(doc(db, "posts", postId, "likes", session?.user.uid),{
                    username: session.user.username
                })
            }
        }
        else{
            signIn();
        }
    }

    async function deletePost(){
        let choice = confirm('Do you really want to delete this post');
        if(choice){
            await deleteDoc(doc(db, "posts", postId))
            if(post?.image){
                await deleteObject(ref(storage, `posts/${postId}/image`))
            }
            router.push('/')
        }
    }    
    return (
    <div>
        <div className="flex p-3 gap-3 mt-3 border-b">
            <div>
                {post && 
                    <img 
                        src={post?.userImg}
                        height={60}
                        width={60}
                        className="rounded-full"
                        alt=""
                    />
                }
            </div>
            <div className="flex  flex-col w-full md:text-lg gap-1">
                <div className="flex items-start text-gray-600 gap-2">
                    <h2 className="text-black font-bold">{post?.name}</h2>
                    <p>@{post?.username}</p>
                    <p><Moment fromNow>{post?.timestamp?.toDate()}</Moment></p>
                    <div className="flex flex-1 items-end justify-end">
                        <IconButton className="mt-[-8px]">
                            <MoreHorizIcon />
                        </IconButton>
                    </div>
                </div>
                <p className="mt-[-8px]">{post?.text}</p>
                {post?.image && (
                    <div className="relative h-[350px]">
                        <Image
                            src={post?.image}
                            fill
                            className="object-cover"
                            alt=""
                        />
                    </div>
                )}
                <div className="flex items-center justify-between px-4 py-2">
                    <IconButton className='space-x-2' onClick={() => {
                        if(session){
                            setPostId(postId)                        
                            setOpen(true)
                        }
                        else{
                            signIn();
                        }
                    }}>
                        <ChatBubbleOutlineIcon />
                        <span className="text-gray-600 text-base font-bold"> {comments.length > 0 ? comments.length : ''} </span>
                    </IconButton>
                    { (session?.user.uid === post?.id) && ( 
                        <IconButton onClick={deletePost}>
                            <DeleteForeverIcon />
                        </IconButton>
                     )}
                    <IconButton onClick={likePost} className='text-red-500 space-x-2'>
                        {hasLiked ? <FavoriteIcon /> : <FavoriteBorderIcon /> } 
                        <span className="text-gray-600 text-base"> {likes.length > 0 ? likes.length : 0} </span>
                    </IconButton>
                    <IconButton>
                        <LinearScaleIcon />
                    </IconButton>
                    <IconButton>
                        <BarChartIcon />
                    </IconButton>                    
                </div>
            </div>
        </div>
        
        {comments.map((item) => (
            // <h2>{item.data().username}</h2>
            <CommenItem key={item.id} data={item.data()} />
        ))}
        {/* <CommenItem /> */}
    </div>
  )
}

export default CommentsFeedPost