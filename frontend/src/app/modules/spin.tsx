'use client';

import Image from 'next/image';
import loadingImage from '../../../public/img/frontpage/loading.png';

export default function Loading() {
   return (
      <div className='absolute flex justify-center items-center bg-transparent w-full h-full'>
         <div className='relative w-[80px] h-[80px] -mt-[200px]'>
            <Image
               className='w-full h-full animate-spin'
               src={loadingImage}
               width={80}
               height={80}
               alt='Loading...'
            />
         </div>
      </div>
   );
}
