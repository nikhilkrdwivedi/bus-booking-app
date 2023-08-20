/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export async function removeLocalStorage(keys:string[]) {
    keys.forEach((key) => {
        localStorage.removeItem(key);
    });
}
export async function setLocalStorage(keyValueMapping:any) {
    for (const key in keyValueMapping) {
        localStorage.setItem(key, keyValueMapping[key]);
    }
}
export default { removeLocalStorage, setLocalStorage };
