import qs from 'querystring';
import axiosHelper from '@data/axiosHelper';
import ENV from '@environment/index';
const PROVIDER_ENDPOINT = '/api/v1/providers';
 
export function fetch(query:any={}) {
    return axiosHelper(
        `${ENV.BASE_URL + PROVIDER_ENDPOINT}?${qs.stringify(query)}`,
        'GET',
        null,
        null,
    );
}
export function create(payload:any) {
    return axiosHelper(
        `${ENV.BASE_URL + PROVIDER_ENDPOINT}/`,
        'POST',
        null,
        payload,
    );
}
export function update(payload:any,userId: string) {
    return axiosHelper(
        `${ENV.BASE_URL + PROVIDER_ENDPOINT}/${userId}`,
        'PUT',
        null,
        payload,
    );
}

export default { create, update,fetch };
