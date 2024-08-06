/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from "next/link"
import notFound from '../../public/images/not-found.jpg'
 
export default function Error({ error }: { error: Error & { digest?: string } }) {
 
  return (
    <div className='max-w-[500px] mx-auto py-[100px]'>
      <div className='flex flex-col justify-center'>
        <div className='mb-10 w-full'>
          <img src={notFound.src} alt='not-found'/>
        </div>
        <div className='text-center'>
          <p className='text-[24px] font-bold'>Page Not Found</p>
          <div className='mt-10'>
            <Link className='px-4 py-2 bg-[#3563E9] text-white font-semibold rounded-[10px]' href="/">Return Home</Link>
          </div>
        </div>
      </div>
    </div>
  )
}