import React from 'react'

function NewsSectionItem({article}) {
  return (
    <a href={article.url} target="_blank">
      <div className='flex items-center justify-between  hover:bg-gray-200 px-4 py-3 '>
        <div className='w-9/12'>
          <p >{article.title}</p>
          <p className='text-gray-400 text-xs'>{article.source.name}</p>
        </div>
        <img 
          src={article.urlToImage} 
          alt={article.title}        
          className=' rounded-lg h-[40px] w-[80px]'  
        />
      </div>
    </a>
  )
}

export default NewsSectionItem