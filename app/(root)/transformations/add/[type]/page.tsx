import Header from '@/components/shared/Header'
import TransformationForm from '@/components/shared/TransformationForm'
import { transformationTypes } from '@/constants'
import { getUserById } from '@/lib/actions/user.actions'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

const AddTransformationTypePage = async ({ params: { type }} : SearchParamProps ) => {
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const user = await getUserById(userId);
  const trans = transformationTypes[type]

  return (
    <>
      <Header title={trans.title} subtitle={trans.subTitle}/>

      <section className='mt-10'>
        <TransformationForm action="Add" userId={user._id} type={trans.type as TransformationTypeKey} creditBalance={user.creditBalance} />
      </section>
    </>
  )
}

export default AddTransformationTypePage