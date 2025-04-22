import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import Prism from 'prismjs'
const Message = ({role,content}) => {
useEffect(() => {
  Prism.highlightAll()
}, [content])

  return (
    <div className='flex flex-col text-sm w-full  items-center max-w-3xl '>
      <div className={`flex flex-col w-full mb-8 ${role==="user" && 'items-end'}`}>
        <div className={`flex relative group max-w-2xl py-3 rounded-xl ${role==="user" ?"bg-[#414158] px-5 ":"gap-3"} `}>
          <div className={`opacity-0 group-hover:opacity-100 absolute transition-all ${role==='user'?'-left-16 top-2.5':'left-9 -bottom-6'}`}>
<div className='flex items-center gap-2 opacity-70 '>
{
  role==='user'?(
<>
<Image src={assets.copy_icon}  className='w-4' alt=''/>
<Image src={assets.pencil_icon} className='w-4.5' alt='copy'/>
</>
  ):( 
    <>
    <Image src={assets.copy_icon} className='w-4.5' alt=''/>
    <Image src={assets.regenerate_icon} className='w-4' alt=''/>
    <Image src={assets.like_icon} className='w-4' alt=''/>
    <Image src={assets.dislike_icon} className='w-4' alt=''/>
    </>
  )
}
</div>
          </div>
          {
            role==='user'?(
              <span className="text-white/90 w-max">{content}</span>
            ):(
              <>
              <Image src={assets.logo_icon} alt='' className='w-9 h-9 p-1 border border-white/15 rounded-full'/>
              <div className='space-y-4 w-full overflow-scroll'><Markdown>{content}</Markdown></div>
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Message
