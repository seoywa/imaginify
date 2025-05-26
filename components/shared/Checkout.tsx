'use client'

import { useToast } from '@/hooks/use-toast'
import { checkoutCredits } from '@/lib/actions/transaction.actions';
import React, { useEffect } from 'react'
import { Button } from '../ui/button';
import { loadStripe } from "@stripe/stripe-js";

const Checkout = ({ plan, amount, buyerId, credits}: {
  plan: string,
  amount: number,
  buyerId: string,
  credits: number 
}) => {
  const {toast} = useToast();

  useEffect(() => {
    loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }, [])

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      toast({
        title: 'ORDER PLACED!',
        description: 'You will receive an email confirmation',
        duration: 5000,
        className: 'success-toast'
      })
    }

    if (query.get('cancelled')) {
      toast({
        title: 'ORDER CANCELLED!',
        description: 'Continue to shop around and checkout when needed',
        duration: 5000,
        className: 'error-toast'
      })
    }

  }, [])

  const onCheckout = async () => {
    const transaction = {
      plan, amount, credits, buyerId
    };

    await checkoutCredits(transaction)
  }

  return (
    <form action={onCheckout} method={'POST'}>
      <section>
        <Button type='submit' role='link' className='w-full rounded-full bg-purple-gradient bg-cover'>
          Buy Credit
        </Button>
      </section>
    </form>
  )
}

export default Checkout