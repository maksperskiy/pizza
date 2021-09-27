const defaultState = {
    items: {},
    totalPrice: 0,
    totalPizzas: 0
};

const cart = (state = defaultState, action) => {
    const sumTotalPrice = (array) => {
        return array.reduce((acc, curVal) => acc + curVal.price, 0)
    };

    const getItemsArray = (obj) => {
        return [].concat.apply([], Object.values(obj).map(obj => obj.items));
    };

    switch (action.type) {
        case 'ADD_PIZZA_TO_CART': {
            const currentPizzaArray = state.items[action.payload.id] ? 
                    [...state.items[action.payload.id].items, action.payload] :
                    [action.payload];

            const newItems = {
                ...state.items, 
                [action.payload.id]: {
                    items: currentPizzaArray,
                    totalPrice: sumTotalPrice(currentPizzaArray)
                }
            }

            const itemsArray = getItemsArray(newItems);

            return {
                ...state,
                items: newItems,
                totalPrice: sumTotalPrice(itemsArray),
                totalPizzas: itemsArray.length
            }
        }
        case 'CLEAR_CART':
            return {
                ...state,
                items: {},
                totalPrice: 0,
                totalPizzas: 0
            }
        case 'REMOVE_PIZZA_FROM_CART': {
            const newItems = {...state.items};
            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalPizzas = newItems[action.payload].items.length;
            delete newItems[action.payload];

            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalPizzas: state.totalPizzas - currentTotalPizzas
            }
        }
        case 'MINUS_COUNT_PIZZA': {
            const oldItems = [...state.items[action.payload].items];
            const currentPizzaArray = oldItems.length > 1 ?  
                [...state.items[action.payload].items.slice(0, state.items[action.payload].items.length - 1)] :
                oldItems;

            const newItems = {
                ...state.items, 
                [action.payload]: {
                    items: currentPizzaArray,
                    totalPrice: sumTotalPrice(currentPizzaArray)
                }
            }

            const itemsArray = getItemsArray(newItems);
            
            return {
                ...state,
                items: newItems,
                totalPrice: sumTotalPrice(itemsArray),
                totalPizzas: itemsArray.length
            }
        }
        case 'PLUS_COUNT_PIZZA': {
            const currentPizzaArray = [...state.items[action.payload].items, state.items[action.payload].items[state.items[action.payload].items.length - 1]];
            
            const newItems = {
                ...state.items, 
                [action.payload]: {
                    items: currentPizzaArray,
                    totalPrice: sumTotalPrice(currentPizzaArray)
                }
            }
            
            const itemsArray = getItemsArray(newItems);
            
            return {
                ...state,
                items: newItems,
                totalPrice: sumTotalPrice(itemsArray),
                totalPizzas: itemsArray.length
            }
        }
        default:
            return state;
    }
};

export default cart;