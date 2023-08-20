import axiosHelper from '@data/axiosHelper';
import ENV from '@environment';

const USER_ENDPOINT = '/api/v1/users';

export function updatePassword(userId, payload) {
    return axiosHelper(
        `${ENV.BASE_URL + USER_ENDPOINT}/updatePassword/${userId}`,
        'PATCH',
        null,
        payload,
    );
}

export function updateUser(userId, payload) {
    return axiosHelper(
        `${ENV.BASE_URL + USER_ENDPOINT}/${userId}`,
        'PUT',
        null,
        payload,
    );
}

export default { updatePassword, updateUser };
