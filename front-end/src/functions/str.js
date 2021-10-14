const getNewStr = (str) => {
    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
};

const cutStr = (str, key) => {
    if(key.includes('Id')) {
        return str.slice(0, 8) + '...';
    } else if(key === 'dateTimeStart' || key === 'dateTimeEnd') {
        return str;
    }
    return str.length > 15 ? str.slice(0, 15) + '...' : str;
}

const cleanTheDate = (dateStr) => {
    return new Date(dateStr).toISOString().
        replace(/T/, ' ').
        replace(/\..+/, '')
}

export { getNewStr, cutStr, cleanTheDate };