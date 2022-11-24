import { useRecoilState } from 'recoil'
import {modalState, postIdState} from '../../atom/modalAtom' 
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { addDoc, collection, doc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Button, IconButton } from '@mui/material';
import Moment from 'react-moment';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/router';

import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CancelIcon from '@mui/icons-material/Cancel';

function CommentModal() {
  const router = useRouter();
  const {data: session} = useSession();  
  const [open, setOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postIdState);
  const [post, setPost] = useState({})
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    onSnapshot(doc(db, "posts", postId), (snapshot) => {
      setPost(snapshot.data())          
    })
  }, [postId, db])
  
  function addImageToComment(e){
    const reader = new FileReader();
    if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0])
    }
  
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result)
    }
  }

  async function sentComment(){
    await addDoc(collection(db, "posts", postId, "comments"),{
      comment: input,
      name: session.user.name,
      username: session.user.username,
      userImg: session.user.image,
      timestamp: serverTimestamp()
    })

    setOpen(false);
    setInput("");
    router.push(`/posts/${postId}`)
  }


  return (
    <div>
      {open && (
        <Modal
        isOpen={true} 
        onRequestClose={() => setOpen(false)}        
        className="bg-white absolute mx-auto top-24 lg:left-[40%] w-[400px] border rounded-lg p-2 min-h-[200px]
                  sm:left-[15%]  md:left-[30%]"
        appElement={document.getElementById('__next')} 
        >
          <div className='border-b py-2'>
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon className='text-base' />
            </IconButton>
          </div>
          <div>
            <div className='flex items-center gap-2 mt-3 relative' >
              <span className='w-0.5 absolute top-10 border-l h-[30px] left-5 pl-5 text-gray-400'>Hello</span>
              <img 
                src={post?.userImg} 
                className="h-[40px] w-[40px] rounded-full object-cover"                 
              />
              <h3 className='font-bold'>{post?.name}</h3>
              <p className='text-sm text-gray-500'>
                @{post?.username} - 
                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              </p>
            </div>
              {/* bod portion start */}
              <div className='flex gap-5 mt-[30px] px-[2px]'>
                <div>                
                    <img 
                        src={session?.user.image}
                        height={40}
                        width={40}
                        className="rounded-full cursor-pointer"
                        alt=''                        
                    />                
                </div>
                <div className='flex-1'>
                    <form className='' >
                        <textarea
                            className='w-full min-h-[80px] border-b outline-none'
                            placeholder="What's happening"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                        { selectedFile && 
                            <div className='relative'>
                                <IconButton 
                                    className='absolute'
                                    onClick={() => setSelectedFile(null)}
                                >
                                    <CancelIcon />
                                </IconButton>
                                <img 
                                    src={selectedFile} 
                                    alt="" 
                                    className='h-[250px] w-full object-cover object-top ' 
                                />
                            </div>
                        }
                    </form>
                    <div  className='flex items-center justify-between  px-4 py-2 gap-3'>
                        <div className='flex gap-3 items-center justify-center'>
                            <input type="file" hidden id='commentImg' onChange={addImageToComment} />
                            <label htmlFor="commentImg">
                                <InsertPhotoIcon className='text-blue-500 cursor-pointer' />
                            </label>
                                
                            <IconButton className='text-blue-500'>
                                <SentimentSatisfiedAltIcon />
                            </IconButton>

                        </div>
                        <Button
                            disabled={input.trim().length > 0 ? false : true}
                            className='text-white bg-blue-500 py-2 px-5 rounded-full font-bold capitalize hover:bg-blue-300 tracking-wider disabled:bg-gray-400'
                            onClick={sentComment}
                          >
                            Comment                            
                        </Button>    
                    </div>                        
                </div>                
              </div>
                 {/* end */}
          </div>
      </Modal>
      )}
    </div>
  )
}

export default CommentModal