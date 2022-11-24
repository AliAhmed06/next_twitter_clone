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

import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { useRecoilState } from "recoil";
import { db, storage } from "../../../firebase";
import {useRouter} from 'next/router'

function CommentsFeedPost({data}) {
    const router = useRouter();
    const [likes, setLikes] = useState([]);
    const [comments, setComments] = useState([]);
    const [hasLiked, setHasLiked] = useState(false);
    
    useEffect(() => {
    //   const unsubscribe = onSnapshot(
    //     collection(db, "posts", postId, "likes"),
    //     (snapshot)=>setLikes(snapshot.docs)
    //   )

    //   const cmnts = onSnapshot(
    //     collection(db, "posts", postId, "comments"),
    //     (snapshot)=>setComments(snapshot.docs)
    //   )
    }, [db])
    
    // useEffect(() => {
    //   setHasLiked(likes.findIndex((like) => like.id === session?.user.uid) !== -1 );
    // }, [likes])
    
    console.log(data)
    async function likePost(){
        
    }

    async function deletePost(){
        let choice = confirm('Do you really want to delete this post');
        if(choice){
            router.push('/')
        }
    }
    return (
    <div>
        <div className="flex p-3 gap-3 mt-3 border-b">
            <div>
                {true && 
                    <img 
                        src={data.userImg}
                        height={60}
                        width={60}
                        className="rounded-full"
                        alt=""
                    />
                }
            </div>
            <div className="flex  flex-col w-full md:text-lg gap-1">
                <div className="flex items-start text-gray-600 gap-2">
                    <h2 className="text-black font-bold">
                        {data?.name}
                    </h2>
                    <p>
                        @{data?.username}
                    </p>
                    <p><Moment fromNow>
                        {data?.timestamp?.toDate()}
                    </Moment></p>
                    <div className="flex flex-1 items-end justify-end">
                        {/* <IconButton className="mt-[-8px]">
                            <MoreHorizIcon />
                        </IconButton> */}
                    </div>
                </div>
                <p className="mt-[-8px]">
                    {data?.comment}
                </p>
                {
                false && (
                    <div className="relative h-[350px]">
                        <Image
                            src={data?.userImg}
                            fill
                            className="object-cover"
                            alt=""
                        />
                    </div>
                )}
                <div className="flex items-center justify-between px-4 py-2">
                    {/* <IconButton className='space-x-2' onClick={() => {
                        
                    }}>
                        <ChatBubbleOutlineIcon />
                        <span className="text-gray-600 text-base font-bold"> {comments?.length > 0 ? comments?.length : ''} </span>
                    </IconButton>
                    { true && ( 
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
                    </IconButton>                     */}
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CommentsFeedPost