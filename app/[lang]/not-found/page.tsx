import Link from "next/link"
import notFound from '/public/images/not-found.jpg'
import { Locale } from "@/i18n-config"
import { getDictionary } from "@/get-dictionary"
 
export default async function NotFound({ params }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(params.lang)
 
  return (
    <div className='max-w-[500px] mx-auto py-[100px]'>
      <div className='flex flex-col justify-center'>
        <div className='mb-10 w-full'>
          <img src={notFound.src} alt='not-found'/>
        </div>
        <div className='text-center'>
          <p className='text-[24px] font-bold'>{dictionary.common.pageNotFound}</p>
          <div className='mt-10'>
            <Link className='px-4 py-2 bg-[#3563E9] text-white font-semibold rounded-[10px]' href={`/${params.lang}/`}>{dictionary.common.returnHome}</Link>
          </div>
        </div>
      </div>
    </div>
  )
}