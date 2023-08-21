import React from 'react'

export default function TableThead({ headers }: TableThead) {
  return (

    <thead className="border-b font-medium dark:border-neutral-500 text-gray-800 dark:text-gray-200">
      <tr>
        {headers.map((item: any, index: number) => (
          <th key={index} scope="col" className="px-6 py-4">{item.label}</th>
        ))}
      </tr>
    </thead>
  )
}
type TableThead={
  headers: any[]
}