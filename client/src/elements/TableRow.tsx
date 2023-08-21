import React, { ReactNode } from 'react'

export default function TableRow({children}:TableRow) {
  return (
<tr className="border-b dark:border-neutral-500">
    {children}
  </tr>
  )
}
type TableRow ={
    children: ReactNode;
}