import { Button } from "@mui/material"
import Image from "next/image"


function FollowSectionItem({userToFollow}) {
  return (
    <div className="flex items-center justify-between w-full p-4 gap-5">
        <Image 
            src={userToFollow.picture.thumbnail}
            height={50}
            width={50}
            className="rounded-full object-cover"
            alt="ss"
        />
        <div className="flex-1">
            <h4 className="text-lg font-bold">{userToFollow.name.first +  ' ' + userToFollow.name.last}</h4>
            <p className="text-gray-500">{userToFollow.login.username}</p>
        </div>

        <Button
            className="bg-blue-500 rounded-full text-white capitalize hover:bg-blue-400"
        >Follow</Button>
    </div>
  )
}

export default FollowSectionItem