const getNewStr = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
};

const cutStr = (str, key) => {
    if(key.includes('Id')) {
        return str.slice(0, 8) + '...';
    }
    return str.length > 15 ? str.slice(0, 15) + '...' : str;
}

export { getNewStr, cutStr };