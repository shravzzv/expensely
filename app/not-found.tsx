'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, AlertTriangle } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen text-center px-4'>
      <AlertTriangle className='w-16 h-16 text-yellow-500 mb-4' />

      <h1 className='text-5xl font-bold mb-2'>404</h1>
      <h2 className='text-xl text-muted-foreground mb-6'>
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </h2>

      <Link href='/' passHref>
        <Button size='lg' className='cursor-pointer'>
          <Home className='w-4 h-4' />
          Go back home
        </Button>
      </Link>
    </div>
  )
}
