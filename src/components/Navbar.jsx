import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import icons from "../assets/icons";
import images from "../assets/images";

export const Navbar = ( {setWatch , watch} ) => {
  const navigate = useNavigate()
  const [query , setQuery] = useState("")
  const [navbar , setNavbar] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/result/${query}`)
    setNavbar(false)
    setQuery("")
  }
  
  return (
    <div className={`flex items-center justify-between px-[1%]`}>
      <div className={`w-full lg:w-3/12 justify-between lg:justify-start flex items-center lg:space-x-4 ml-0 lg:ml-1 ${navbar ? "hidden" : ""}`}>
        <button onClick={() => setWatch(!watch)} type='button' className='hidden lg:block icon-style' ><icons.menu /></button>
        <img onClick={()=> navigate("/")} className='h-10 cursor-pointer' alt='nav-icon' src={images.youtube} />
        <button onClick={() => setNavbar(true)} type='button' className='lg:hidden flex justify-center items-center'><icons.search className='icon-style' /></button>
      </div>
      <div className={`${navbar ? "flex" : "hidden" } w-full py-2 lg:py-0 lg:w-6/12 items-center lg:space-x-3 justify-center lg:flex `}>
        <button onClick={() => setNavbar(false)} type='button' className="w-16 inline-flex justify-center lg:hidden" ><icons.leftArrow className='icon-style' /></button>
        <form onSubmit={(e) => handleSubmit(e)} className='flex-1 lg:w-3/4 flex border border-gray-200 rounded-full '>
          <input value={query} onChange={(e) => setQuery(e.target.value)} type="text" className='flex-1 h-10 focus-within:outline-none rounded-l-full text-lg px-5 border-r border-gray-200' placeholder='Ara' />
          <button onSubmit={(e) => handleSubmit(e)} type='submit' className='icon-style bg-gray-50 rounded-r-full px-3 text-gray-800 hover:bg-gray-100' ><icons.search /></button>
        </form>
        <button type='button' className='icon-style bg-gray-50 p-3 rounded-full hidden lg:block hover:bg-gray-100' ><icons.microphone /></button>
      </div>
      <div className='w-3/12  items-center hidden lg:flex justify-end space-x-5 '>
        <button type='button' className='icon-style ' ><icons.threeDot /></button>
        <button type='button' className='flex justify-between w-[7.5rem] px-2 font-bold items-center text-blue-400 border border-gray-400 rounded-full p-1 text-sm hover:bg-blue-50 hover:border-blue-50 ' >
          <icons.user className='icon-style' />
          Oturum Aç
        </button>
      </div>
      
    </div>
  )
}
