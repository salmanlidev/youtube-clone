import React from 'react'

export const SideBarItem = ( {data , watch } ) => {
  return (
    <li className='list-none w-full flex items-center'><a href='/' className={`flex shrink-0 items-center w-full gap-x-4 ${watch ? "p-1 justify-center" : "py-3 px-3"} hover:bg-gray-200 rounded-full `}><data.icon className="text-3xl"/><span className={`${watch ? "hidden" : "" }`}>{data.name}</span></a></li>
  )
}
