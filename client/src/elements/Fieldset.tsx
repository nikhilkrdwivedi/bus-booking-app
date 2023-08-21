import React, { ReactNode } from 'react'

export default function Fieldset({fieldsetClass,showLegend,legendClass,legend,children}:FieldSetType) {
  return (
    <fieldset className={fieldsetClass}>
        {showLegend && <legend className={legendClass}>{legend}</legend>}
        {children}
    </fieldset>
  )
}

type FieldSetType = {
    fieldsetClass?: string,
    showLegend?: boolean,
    legendClass?: string
    legend?: string,
    children?: ReactNode
}