import React from 'react'
import { Button } from './ui/button'
import { MdOutlinePublish } from 'react-icons/md'

export default function PublishFormBtn() {
  return (
    <Button variant={'outline'} className='gap-2
    bg-gradient-to-r from-indigo-400 to-cyan-400
    '>
        <MdOutlinePublish className='h-4 w-4' />
        Yayınla
    </Button>    
)
}
