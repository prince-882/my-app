import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
const Chatlabel = (props) => {
  return (
    <div className='flex justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm group cursor-pointer items-center'>
      <p className='group-hover:max-w-5/6 truncate'>Chat Name Here</p>
      <div className='group relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg'>
      <Image src={assets.three_dots} className={`w-4 ${props.openMenu.open?"":"hidden"} group-hover:block`} alt=''/>
      <div className='bg-gray-700 absolute -right-40 opacity-0 group-hover:opacity-100 flex flex-col  top-6 rounded-xl w-max p-2 '>
        <div className='flex font-semibold items-center  rounded-lg gap-3 hover:bg-white/10 px-3 py-2'>
      <Image src={assets.pencil_icon} alt='' className='w-4'/>
      <p>Rename</p>
        </div>
        <div className='flex font-semibold items-center rounded-lg gap-3 hover:bg-white/10 px-3 py-2'>
      <Image src={assets.delete_icon} alt='' className='w-4'/>
      <p>Delete</p>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Chatlabel
