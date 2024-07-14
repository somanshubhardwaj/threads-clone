import React from 'react'

const DefaultLayout = ({children}) => {
  return (
    <div className='max-w-2xl mx-auto bg-[#181818] border border-[#7777779e] rounded-2xl '>
        {children}
    </div>
  )
}

export default DefaultLayout