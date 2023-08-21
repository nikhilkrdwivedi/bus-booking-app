import httpResponseMessages from "../constants/httpResponseMessages.js";
import { create } from "../providers/vehicles.js";
const assignSeatNumber = (body) => {
    console.log(body)
    const {capacity:{layout}} = body;
    let seatNumber = 1
    const _layout = layout.map(row => {
       return row.map(col => {
            
            return { ...col, seatNumber: col.seatStatus === "A" ?seatNumber++: -1}
        })
    })
    const _body = {...body, capacity:{
        ...body.capacity,
        layout:_layout
    }};
    return _body

}
export const createVehicle = async (request, response) => {
    try {
        let { body } = request;
        body = assignSeatNumber(body)
        const vehicle = await create(body);

        return response
            .status(200)
            .json({ message: "Provider successfully created.", data: vehicle });
    } catch (error) {
        console.log({error})
        return response
            .status(500)
            .json({ message: httpResponseMessages.INTERNAL_SERVER_ERROR, data: error });
    }
}

export default {createVehicle}