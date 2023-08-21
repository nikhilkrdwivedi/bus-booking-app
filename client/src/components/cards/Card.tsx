import React, { ReactNode } from 'react'

export default function Card({cardClass, headerClass, title, bodyClass, children}:CardTypes) {
  return (
    <div className={cardClass}>
        <div className={headerClass}>{title}</div>
        <div className={bodyClass}>
            {children}
        </div>
    </div>
  )
}

type CardTypes = {cardClass?: string, headerClass?: string, title?: string, bodyClass?:string, children?: ReactNode}