import qs from 'querystring';
import axiosHelper from '@data/axiosHelper';
import ENV from '@environment/index';
const VEHICLE_ENDPOINT = '/api/v1/vehicles';
 
export function fetchVehicles(query:any={}) {
    return axiosHelper(
        `${ENV.BASE_URL + VEHICLE_ENDPOINT}?${qs.stringify(query)}`,
        'GET',
        null,
        null,
    );
}
export function createVehicles(payload:any) {
    return axiosHelper(
        `${ENV.BASE_URL + VEHICLE_ENDPOINT}/`,
        'POST',
        null,
        payload,
    );
}
export function updateVehicles(payload:any,userId: string) {
    return axiosHelper(
        `${ENV.BASE_URL + VEHICLE_ENDPOINT}/${userId}`,
        'PUT',
        null,
        payload,
    );
}

export default { createVehicles, updateVehicles,fetchVehicles };
