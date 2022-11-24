import SearchIcon from '@mui/icons-material/Search';

function SearchSection() {
  return (
    <div className='sticky top-0 bg-white p-1 pb-3 z-50'>
          <div className='bg-gray-100 p-2 w-10/12 mx-auto mt-2 rounded-full flex items-center justify-center border border-gray-300 '>
              <SearchIcon className='text-gray-500 ml-2'/>
              <input 
                type="text" 
                className='w-full border-none outline-none px-3 py-1 bg-transparent placeholder-gray-500'
                placeholder='Search Twitter'
              />
          </div>
    </div>
  )
}

export default SearchSection