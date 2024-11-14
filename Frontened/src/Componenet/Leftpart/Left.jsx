import React from 'react'
import Search from './Search'
import User from './User'
import Logout from './Logout'
export default function left() {
  return (
 <>
<div className="w-[30%] h-screen bg-zinc-900 text-gray-50 flex flex-col">
      <Search></Search>
        <User></User>
        <Logout ></Logout>
    </div>
   </>
  )
}
