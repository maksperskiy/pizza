const setCustomer = (customerName) => ({type: 'SET_CUSTOMER', payload: customerName});
const setItems = (items) => ({type: 'SET_ITEMS', payload: items});
const addItems = (items) => ({type: 'ADD_ITEMS', payload: items});

export { setCustomer, setItems, addItems };