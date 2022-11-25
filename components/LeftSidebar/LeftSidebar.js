import Image from 'next/image'

import HomeIcon from '@mui/icons-material/Home';
import TagIcon from '@mui/icons-material/Tag';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import InventoryIcon from '@mui/icons-material/Inventory';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LoginIcon from '@mui/icons-material/Login';

import LeftSidebarMenu from './LeftSidebarMenu';
import { Button, IconButton } from '@mui/material';

import { useSession, signIn } from "next-auth/react";

const LeftSidebar = () => {
    const {data: session} = useSession();  
    return (
    <div className='flex items-center border-r border-gray-300 flex-col w-2/12 md:w-3/12  h-screen sticky top-0 left-0 pt-5 overflow-hidden'>
        <div className='md:w-5/12'>
            <Button className='rounded-full p-4'>
                    <Image 
                        src="/images/twitter.png" 
                        height={30}
                        width={30}    
                        alt=""                
                    />
            </Button>
        </div>

        <div className='mt-2 pt-2 flex-1 flex flex-col items-start justify-start'>
            { session ? (
            <>
                <LeftSidebarMenu Icon={HomeIcon} title="Homeee" />
                <LeftSidebarMenu Icon={TagIcon} title="Explore" />
                <LeftSidebarMenu Icon={NotificationsNoneIcon} title="Notofications" />
                <LeftSidebarMenu Icon={MarkunreadIcon} title="Messages" />
                <LeftSidebarMenu Icon={TurnedInNotIcon} title="Bookmarks" />
                <LeftSidebarMenu Icon={InventoryIcon} title="Lists" />
                <LeftSidebarMenu Icon={PermIdentityIcon} title="Profile" />
                <LeftSidebarMenu Icon={ScatterPlotIcon} title="More" />
                <Button 
                    className='capitalize hidden md:block bg-blue-400 w-full text-white mt-5 py-2 mx-auto rounded-full transition duration-300 ease-in-out gap-3 hover:bg-blue-600'
                >
                    Tweet
                </Button>
            </>
            ):(
                <>
                    <LeftSidebarMenu Icon={HomeIcon} title="Home" />
                    <LeftSidebarMenu Icon={TagIcon} title="Explore" />
                    
                    <Button 
                        className='hidden md:inline capitalize font-bold md:py-2 md:px-10 bg-blue-400 text-white rounded-full hover:bg-blue-500'
                        onClick={signIn}
                    >
                        Sign In                         
                    </Button>
                    <IconButton 
                        className='md:hidden bg-blue-400 text-white hover:bg-blue-500'
                        onClick={signIn}
                    >
                        <LoginIcon />
                    </IconButton>
                </>
            )
        }


        </div>

        { session && (
            <div className='flex items-center justify-center p-3 gap-2 w-8/12 '>
            <Image
                src={session.user.image}
                height={40}
                width={40}
                className="rounded-full min-h-[50px] min-w-[50px]"
                alt=''
            />

            <div className='hidden lg:inline flex-1 '>
                <h4 className='text-sm xl:text-[16px] font-bold '>{session.user.name}</h4>
                <p className='text-sm'>@{session.user.username}</p>
            </div>

            <div className='hover:bg-gray-200 p-2 rounded-full cursor-pointer hidden md:inline'>
                <MoreHorizIcon className='' />
            </div>
        </div>
        )}
    </div>
  )
}

export default LeftSidebar