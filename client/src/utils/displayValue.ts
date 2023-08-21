export const getDisplayValue = (data:any,selected:string,displayKey:string) => {
    const obj = data?.find((item:any) => item._id === selected);
    return obj?.[displayKey] || ''
}