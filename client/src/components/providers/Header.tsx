import Button from '@elements/Button'
import Input from '@elements/Input'
import { IoReturnUpBackOutline } from 'react-icons/io5'

export default function Header({showModal}:any) {
    return (
        <div className='grid place-items-center justify-items-stretch grid-cols-1 md:grid-cols-3 gap-1 py-4 border-b border-gray-600'>
            <div className='justify-self-start text-gray-600 dark:text-white font-normal text-lg'>Providers</div>
            <div className='w-full'>
                <Input type='text' placeholder='search provider name' />
            </div>
            <div className='justify-self-end'>
                <Button title='Provider' classNames='bg-green-400 px-4 py-1 w-24' onClick={showModal} />
            </div>
        </div>

    )
}
