
import FollowSection from './FollowSection';
import NewsSection from './NewsSection';
import SearchSection from './SearchSection';

function RightSideBar({newsResult, usersToFollow}) {
  
  return (
    <div className='bg-white hidden lg:block flex-1 '>
        <SearchSection />

        <NewsSection newsResult={newsResult} />

        <FollowSection usersToFollow={usersToFollow} />
    </div>
  )
}

export default RightSideBar