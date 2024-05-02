"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React, { useEffect } from 'react'

export default function ErrorPage({error}: {
    error:Error
}) {

    useEffect(() => {
        console.error(error)
    }, [error])

  return (
    <div className='flex w-full h-full flex-col items-center justify-center'>
        <h2 className='text-destructive text-4xl'>
            Beklenmedik bir hata oluştu.
        </h2>
        <Button asChild>
            <Link href='/'>
                Anasayfaya dön 
            </Link>
        </Button>
    </div>
  )
}
