import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import Image from 'next/image';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { Button, IconButton } from '@mui/material';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css'; //styles of nprogress




import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from 'react';
import { db, storage } from '../../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';


function FeedHeader() {
    const {data: session} = useSession();  
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    

    async function sentPost(){
        // setLoading(true);
        NProgress.start()
        const docRef = await addDoc(collection(db, 'posts'), {
            id: session.user.uid,
            text: input,
            userImg:session.user.image,
            timestamp: serverTimestamp(),
            name: session.user.name,
            username: session.user.username            
        });

        if(selectedFile){
            const imageRef = ref(storage, `posts/${docRef.id}/image`);            
            await uploadString(imageRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imageRef);
                await updateDoc(doc(db, "posts", docRef.id),{
                    image: downloadURL
                })
            })
        }

        setInput('');        
        setSelectedFile(null);
        // setLoading(false);
        NProgress.done()
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if(e.target.files[0]){
          reader.readAsDataURL(e.target.files[0])
        }
      
        reader.onload = (readerEvent) => {
          setSelectedFile(readerEvent.target.result)
        }
    }
    
    return (
    <>
        {session && (
        <>
            <div className='flex items-center justify-between p-3 border-b sticky top-0 z-10 bg-white'>
                <h2 className='font-bold text-lg'>Home</h2>
                <AutoAwesomeIcon />
            </div>

            <div className='flex p-3 gap-5 border-b'>
                <div>                
                    <Image 
                        src={session.user.image}
                        height={50}
                        width={50}
                        className="rounded-full cursor-pointer"
                        alt=''
                        onClick={signOut } 
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
                        {selectedFile && 
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
                            <input type="file" hidden id='postImg' onChange={addImageToPost} />
                            <label htmlFor="postImg">
                                <InsertPhotoIcon className='text-blue-500 cursor-pointer' />
                            </label>
                                
                            <IconButton className='text-blue-500'>
                                <SentimentSatisfiedAltIcon />
                            </IconButton>

                        </div>
                        <Button
                            disabled={input.trim().length > 0 ? false : true}
                            className='text-white bg-blue-500 py-2 px-5 rounded-full font-bold capitalize hover:bg-blue-300 tracking-wider disabled:bg-gray-400'
                            onClick={sentPost}
                        >
                            Tweet
                            
                        </Button>    
                    </div>
                        
                </div>
                
            </div>
        </>
        )}
    </>
  )
}

export default FeedHeader