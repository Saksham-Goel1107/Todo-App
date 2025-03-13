import React from 'react'

const navbar = () => {
  return (
    <div className="bg-violet-100 fixed top-0 left-0 w-full">
    <nav className='flex justify-between mx-7 py-5 font-bold text-sm items-center '>
        <div className="text-xl">Saksham</div>
        <div className="flex gap-4">
        <a className='hover:scale-110 hover:underline ' href="/">Home</a>
        <a className='hover:scale-110 hover:underline 'target='_blank' href="https://github.com/Saksham-Goel1107">About</a>
        <a className='hover:scale-110 hover:underline ' href="mailto:sakshamgoel1107@gmail.com">Contact</a>
        </div> 
    </nav>
    </div>
  )
}

export default navbar
