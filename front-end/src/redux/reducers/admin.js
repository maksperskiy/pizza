const defaultState = {
    categories: [],
    names: [],
    pizzas: [],
    sizes: [],
    types: [],

    customers: [],
    curCustomer: [],
    order: [],
    promo: [],

    cooksession: [],
    cook: [],
    post: []
};

const admin = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_ALL_CATEGORIES':
            return {...state, categories: action.payload}
        case 'SET_ALL_PIZZAS':
            return {...state, pizzas: action.payload}
        case 'SET_ALL_NAMES':
            return {...state, names: action.payload}
        case 'SET_ALL_SIZES':
            return {...state, sizes: action.payload}  
        case 'SET_ALL_TYPES':
            return {...state, types: action.payload}
        
        case 'SET_ALL_CUSTOMERS':
            return {...state, customers: action.payload}
        case 'SET_CUR_CUSTOMER':
            return {...state, curCustomer: action.payload}
        case 'SET_ALL_ORDER':
            return {...state, order: action.payload}
        case 'SET_ALL_PROMO':
            return {...state, promo: action.payload}

        case 'SET_ALL_COOKSESSION':
            return {...state, cooksession: action.payload}
        case 'SET_ALL_COOK':
            return {...state, cook: action.payload}
        case 'SET_ALL_POST':
            return {...state, post: action.payload}
        default:
            return state;
    }
};

export default admin;