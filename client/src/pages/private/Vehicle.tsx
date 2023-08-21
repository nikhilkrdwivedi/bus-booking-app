import Card from '@components/cards/Card'
import SeatOptionsCard from '@components/cards/SeatOptionsCard'
import Container from '@components/containers/Container'
import SeatingSeat from '@components/seats/SeatingSeat'
import KeyValueDisplay from '@components/texts/KeyValueDisplay'
import Button from '@elements/Button'
import Fieldset from '@elements/Fieldset'
import Input from '@elements/Input'
import Select from '@elements/Select'
import {  fetch } from '@data/rest/providers'
import { createVehicles, fetchVehicles,} from '@data/rest/vehicle'
import { Disclosure } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { BiChevronsDown } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { useTheme } from '@contexts/ThemeContext'
export default function Vehicle() {
    const { isDarkMode } = useTheme();
    const [vehicleConfigForm, setVehicleConfigForm] = useState<any>({
        brand: '', purchase: '', capacity:
        {
            columns: 6, rows: 10, gallaryColumn: 2, seating: 51
        }
    })
    const [providers, setProviders] = useState<any>({});
    const [selectedProvider, setSelectedProvider] = useState<any>({});
    const renderSeats = () => {
        let { capacity: { columns, rows, gallaryColumn } } = vehicleConfigForm;
        if (columns < 1 || rows < 1) {
            setVehicleConfigForm((prev: any) => ({
                ...prev,
                capacity: {
                    ...prev.capacity,
                    layout: []
                }
    
            }))
            return 
        }
        // Initialize an empty seat matrix
        console.log({ gallaryColumn })
        const matrix = new Array(rows).fill('').map((_, index) => {
            const array = new Array(columns).fill({ seatStatus: 'A' })
            if (index < rows - 1) {
                array[gallaryColumn] = { seatStatus: 'G' }
            }
            return array
        });
        setVehicleConfigForm((prev: any) => ({
            ...prev,
            capacity: {
                ...prev.capacity,
                layout: matrix
            }

        }))
    }
    const fetchProviders = async () => {
        try {
            const { data } = await fetch({ sendAllRecords: "YES" })
            setProviders({ data: data.data, pagination: data?.pagination })
        } catch (error: any) {
            const errorMsg = error?.response?.data?.message || 'Operation Failed!';
            toast(errorMsg, {
                type: "error",
                theme: isDarkMode ? "dark" : "light",
            });
        }
    }

    const handleSeatTypeInLayoutClick = (type: string, rowIndex: number, colIndex: number) => {
        console.log({ type, rowIndex, colIndex })
        const { capacity: { layout } } = vehicleConfigForm
        layout[rowIndex][colIndex] = { seatStatus: type };
        setVehicleConfigForm((prev: any) => ({
            ...prev,
            capacity: {
                ...prev.capacity,
                layout
            }

        }))
    }
    const handleVehicleClick = async () => {
        console.log({ vehicleConfigForm })
        try {
           await  createVehicles(vehicleConfigForm)
        } catch (error) {
            
        }
    }
    const handleVehicleConfigFormeChange= (key: string, value: any, identifier?: string,)=> {
        console.log({ key, value, identifier, })
        if (identifier === 'capacity') {
            setVehicleConfigForm((prev: any) => ({
                ...prev,
                capacity: {
                    ...prev.capacity,
                    [key]: value
                }

            }))
        } else if (identifier === 'provider') {
            setSelectedProvider(value)
            setVehicleConfigForm((prev: any) => ({
                ...prev,
                [key]: value?._id
            }))

        } else {
            setVehicleConfigForm((prev: any) => ({
                ...prev,
                [key]: value
            }))
        }
        console.log({ vehicleConfigForm })
    }

    useEffect(() => {
        fetchProviders()
    }, [])
    useEffect(() => {
        renderSeats()
    }, [vehicleConfigForm.capacity.rows, vehicleConfigForm.capacity.columns, vehicleConfigForm.capacity.gallaryColumn])
    return (
        <Container className='px-2 md:px-4 lg:px-20 xl:px-32 dark:bg-gray-800 w-full h-screen overflow-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-2 md:my-4'>
                <div className='flex flex-col gap-4'>
                    <Disclosure as="div" >
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Provider Details </span>
                                    <BiChevronsDown
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-gray-600 dark:text-gray-200 `}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                                    <Fieldset
                                        showLegend
                                        legend='Provider Informations'
                                        fieldsetClass='border p-2 border-gray-600 '
                                        legendClass='text-white px-2'
                                    >
                                        <Select label='Choose Provider*' data={providers?.data} onChange={(value: any) => handleVehicleConfigFormeChange("provider", value, 'provider')} valueKey="_id" displayKey='company' selected={selectedProvider} />
                                        {/* <Input type='text' label="Brand*" placeholder="eg: Tata Moters" value={vehicleConfigForm?.brand} onChange={(event: any) => handleVehicleConfigFormeChange("brand", event?.target?.value)} /> */}
                                    </Fieldset>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    <Disclosure as="div" >
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Basic Details </span>
                                    <BiChevronsDown
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-gray-600 dark:text-gray-200 `}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500">
                                    <Fieldset
                                        showLegend
                                        legend='Layout Informations'
                                        fieldsetClass='border p-2 border-gray-600 '
                                        legendClass='text-white px-2'
                                    >
                                        <Input type='text' label="Brand*" placeholder="eg: Tata Moters" value={vehicleConfigForm?.brand} onChange={(event: any) => handleVehicleConfigFormeChange("brand", event?.target?.value)} />
                                        <Input type='text' label="Info*" placeholder="eg: Bharat Benz A/C Sleeper (2+1)" value={vehicleConfigForm?.info} onChange={(event: any) => handleVehicleConfigFormeChange("info", event?.target?.value)} />
                                        <Input type='text' label="Vehicle number*" placeholder="eg: BH-21-MH-0980" value={vehicleConfigForm?.number} onChange={(event: any) => handleVehicleConfigFormeChange("number", event?.target?.value)} />
                                        <Input type='date' label="Purchase Date*" placeholder="eg: Tata Moters" value={vehicleConfigForm?.purchase} onChange={(event: any) => handleVehicleConfigFormeChange("purchase", event?.target?.value)} />
                                    </Fieldset>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                    <Disclosure as="div" >
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="w-full flex justify-between rounded-md bg-gray-200 dark:bg-gray-900 px-4 py-2 text-left text-sm font-medium text-gray-800 dark:text-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>Design Layout</span>
                                    <BiChevronsDown
                                        className={`${open ? 'rotate-180 transform' : ''
                                            } h-5 w-5 text-gray-600 dark:text-gray-200 `}
                                    />
                                </Disclosure.Button>
                                <Disclosure.Panel className="pt-4 pb-2 text-sm text-gray-500 w-full overflow-auto">
                                    <div className="w-full">
                                        <Fieldset
                                            showLegend
                                            legend='Layout Informations'
                                            fieldsetClass='border p-2 border-gray-600 '
                                            legendClass='text-white px-2'
                                        >
                                            <div className='grid md:grid-cols-2 gap-4'>
                                                <Input type='number' label="Seat Counts*" placeholder="eg: 10" value={vehicleConfigForm?.capacity?.seating} onChange={(event: any) => handleVehicleConfigFormeChange("seating", +event?.target?.value, "capacity")} />
                                                <Input type='number' label="Rows (including gallary)*" placeholder="eg: 5" value={vehicleConfigForm?.capacity?.rows} onChange={(event: any) => handleVehicleConfigFormeChange("rows", +event?.target?.value, "capacity")} />
                                                <Input type='number' label="Columns (including gallary)*" placeholder="eg: 5" value={vehicleConfigForm?.capacity?.columns} onChange={(event: any) => handleVehicleConfigFormeChange("columns", +event?.target?.value, "capacity")} />
                                                <Input type='number' label="Gallary column*" placeholder="eg: 10" value={vehicleConfigForm?.capacity?.gallaryColumn} onChange={(event: any) => handleVehicleConfigFormeChange("gallaryColumn", +event?.target?.value, "capacity")} />
                                            </div>
                                        </Fieldset>

                                    </div>
                                    <div className='overflow-auto'>
                                        {console.log({ nikhil: vehicleConfigForm?.capacity?.layout })}
                                        {vehicleConfigForm?.capacity?.layout?.map((row: any[], rowIndex: number) => (
                                            <div key={rowIndex} className='flex justify-center items-center gap-4'>
                                                {row?.map((col: any, colIndex: number) => (
                                                    <div key={rowIndex + colIndex}
                                                    >
                                                        {/* <SeatingSeat seat={col} /> */}
                                                        <SeatOptionsCard cardId={rowIndex + colIndex + 1} onClick={(value: string) => { handleSeatTypeInLayoutClick(value, rowIndex, colIndex) }}>
                                                            <SeatingSeat seat={col?.seatStatus} />
                                                        </SeatOptionsCard>
                                                    </div>

                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                </div>
                <div className='flex flex-col gap-4'>
                    <Card
                        cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
                        headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-600"
                        bodyClass="p-2"
                        title='Provider Details'>
                        <KeyValueDisplay keyName='Provider' value={selectedProvider?.company || 'NA'} />
                    </Card>
                    <Card
                        cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
                        headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-600"
                        bodyClass="p-2"
                        title='Basic Details'>
                        <KeyValueDisplay keyName='Brand' value={vehicleConfigForm?.brand || 'NA'} />
                        <KeyValueDisplay keyName='Info' value={vehicleConfigForm?.info || 'NA'} />
                        <KeyValueDisplay keyName='Number' value={vehicleConfigForm?.number || 'NA'} />
                        <KeyValueDisplay keyName='Purchase Date' value={vehicleConfigForm?.purchase || 'NA'} />
                    </Card>
                    <Card
                        cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
                        headerClass="p-2 text-gray-600 dark:text-gray-200 font-semibold border-b border-gray-400 dark:border-gray-600"
                        bodyClass="p-2"
                        title='Vechicle Layout'>
                        <KeyValueDisplay keyName='Seat Counts' value={vehicleConfigForm?.capacity?.seating || 'NA'} />
                        <KeyValueDisplay keyName='Rows' value={vehicleConfigForm?.capacity?.rows || 'NA'} />
                        <KeyValueDisplay keyName='Columns' value={vehicleConfigForm?.capacity?.columns || 'NA'} />
                        <KeyValueDisplay keyName='Gallary Column' value={vehicleConfigForm?.capacity?.gallaryColumn || 'NA'} />
                    </Card>
                    <Card
                        cardClass="bg-gray-200 dark:bg-gray-800 rounded-md border border-gray-600"
                        bodyClass="p-2"
                    >
                        <div className='max-h-96- overflow-auto'>
                            {vehicleConfigForm?.capacity?.layout?.map((row: any[], rowIndex: number) => (
                                <div key={rowIndex} className='flex justify-center items-center gap-4'>
                                    {row?.map((col: any, colIndex: number) => (
                                        <div key={rowIndex + colIndex}
                                        >
                                            <SeatingSeat seat={col.seatStatus} />
                                        </div>

                                    ))}
                                </div>
                            ))}
                        </div>

                    </Card>
                </div>
            </div>
            <div className='flex justify-center items-center my-4'>
                <Button title='Save Vechicle' classNames='py-2 px-4 bg-green-400 hover:bg-green-500 text-white font-semibold w-full' onClick={() => { handleVehicleClick() }} />
            </div>
        </Container>
    )
}
