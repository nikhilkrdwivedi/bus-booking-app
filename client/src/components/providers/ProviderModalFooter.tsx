import Button from '@elements/Button'
import React from 'react'

export default function ProviderModalFooter({onClick}:any) {
  return (
    <div className='flex justify-end items-center'>
        <Button title='Save' classNames='bg-green-400 w-24 px-4 py-1' onClick={()=>onClick()} />
    </div>
  )
}
