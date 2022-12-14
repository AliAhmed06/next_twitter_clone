import Head from 'next/head'
import React from 'react'
import CommentsFeed from '../../components/Feed/Comments/CommentsFeed'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import CommentModal from '../../components/Modal/CommentModal'
import RightSideBar from '../../components/rightSideBar/RightSideBar'


function PostDetailPage({newsResult, usersToFollow}) {
  return (
    <div>
        <Head>
        <title>Twitter Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className='bg-slate-50 flex'>
        {/* Left Sidebar */}
        <LeftSidebar />

        {/* Feed Section */}
        <CommentsFeed />

        {/* Right Section */}
        <RightSideBar newsResult={newsResult.articles} usersToFollow={usersToFollow.results} />

        {/* Modal */}
        <CommentModal />
      </main>
    </div>
  )
}

export default PostDetailPage

export async function getServerSideProps(){
    const newsResult = await fetch("https://saurav.tech/NewsAPI/top-headlines/category/business/us.json")
    .then((res) => res.json());
    
    const usersToFollow = await fetch("https://randomuser.me/api/?results=30&inc=name,login,picture")
    .then((res) => res.json());
    
    return {
      props: {
        newsResult,
        usersToFollow
      }
    }
  }
  
