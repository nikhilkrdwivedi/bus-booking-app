import Container from '@components/containers/Container'
import Pagination from '@components/paginations/Pagination'
import Header from '@components/vehicles/Header'
import List from '@components/vehicles/List'

import { useTheme } from '@contexts/ThemeContext'
import {  fetchVehicles } from '@data/rest/vehicle'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'

export default function Vechicles() {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<any>({});
    const [vehicles, setVehicles] = useState<any>({});

    useEffect(()=>{
        fetchProviders()
    },[])
    const handleCloseModal = () =>{
        setShowModal(false);
    }
    const handleShowModal = (provider:any={}) =>{
        setSelectedVehicle(provider)
        setShowModal(true);
    }
    const fetchProviders = async () => {
        try {
           const {data} = await fetchVehicles()
           console.log({data})
           setVehicles({data:data.data, pagination:data?.pagination})
        } catch (error:any) {
            const errorMsg = error?.response?.data?.message || 'Operation Failed!';
      toast(errorMsg, {
        type: "error",
        theme: isDarkMode ? "dark" : "light",
      });
    }
        }
    const handleSelectedProviderChange = (value:string, key:string, identifier:string) => {
        if(identifier === 'address'){
            setSelectedVehicle((prev:any)=>({
                ...prev,
                address: {
                    ...prev.address,
                    [key]:value
                }
            }))
        }else if(identifier === 'contact'){
            setSelectedVehicle((prev:any)=>({
                ...prev,
                contact: {
                    ...prev.contact,
                    [key]:value
                }
            }))
        }else{
            setSelectedVehicle((prev:any)=>({
                ...prev,
                [key]:value
            }))
        }
        
    }
  return (
    <Container className='px-2 md:px-4 lg:px-20 xl:px-32 dark:bg-gray-800 w-full h-screen overflow-auto'>
        <div className='flex flex-col'>
        <Header onClick={()=>navigate('/vehicle-config')}  />
        <List data={vehicles.data} onClick={(vehicle:any)=> navigate('/vehicle-config',{state:vehicle})}  />
        <Pagination className="bottom-0 sticky" />

        </div>
    </Container>
  )
}
