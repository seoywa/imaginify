import Collection from '@/components/shared/Collection';
import Header from '@/components/shared/Header';
import { getUserImages } from '@/lib/actions/image.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const ProfilePage = async ({ searchParams}: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const {userId} = auth();
  if (!userId) redirect('/sign-in');
  const user = await getUserById(userId);
  const images = await getUserImages({ page, userId: user._id })

  return (
    <>
      <Header title='Profile' />

      <section className='profile'>
        <div className='profile-balance'>
          <p className='p-14-medium md:p-15-medium'>CREDITS AVAILABLE</p>
          <div className='mt-4 flex items-center gap-4'>
            <Image src={'/assets/icons/coins.svg'} alt='coins' width={50} height={50} className='size-9 md:size-12' />
            <h2 className='h2-bold text-dark-600'>
              {user.creditBalance}
            </h2>
          </div>
        </div>
      </section>

      <section className='mt-8 md:mt-14'>
        <Collection images={images?.data} totalPages={images?.totalPages} page={page} />
      </section>
    </>
  )
}

export default ProfilePage