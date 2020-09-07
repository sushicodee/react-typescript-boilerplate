export const setItem = (name,value) => {
    localStorage.setItem(name,value)
}
export const removeItem = (name) => {
    localStorage.removeItem(name);
}

export const getItem = (name) => {
    return localStorage.getItem(name);
}

export const clearStorage = () => {
    localStorage.clear();
}