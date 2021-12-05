const defaultState = {
    customerName: JSON.parse(localStorage.getItem('customerName')) ||'',
    items: JSON.parse(localStorage.getItem('myItems')) || []
};

const customer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CUSTOMER':
            localStorage.setItem('customerName', JSON.stringify(action.payload.name));
            localStorage.setItem('customerMail', JSON.stringify(action.payload.mail));
            localStorage.setItem('customerAddress', JSON.stringify(action.payload.address));
            localStorage.setItem('customerPhone', JSON.stringify(action.payload.phone));
            return {...state, customerName: action.payload.name}
        case 'SET_ITEMS':
            localStorage.setItem('myItems', JSON.stringify(action.payload));
            return {...state, items: action.payload}
        case 'ADD_ITEMS':
            return {...state, items: [...state.items, action.payload]}
        default:
            return state;
    }
};

export default customer;