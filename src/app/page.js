import Brand from '@/components/home/Brand'
import Hero from '@/components/home/Hero'
import Video from '@/components/home/Video'
import React from 'react'

function page() {
  return (
    <div className='bg-[#f5f5f5]'>
      <Hero/>
      <Video/>
      <Brand/>
    </div>
  )
}

export default page
