const defaultState = {
    categorie: null,
    sortBy: {
        name: 'популярности',
        type: 'rating',
        order: 'desc'
    },
    // filterSortPizzas: []
};

const filter = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIE':
            return {...state, categorie: action.payload}
        case 'SET_SORT_BY':
            return {...state, sortBy: action.payload}
        case 'SET_FILTER_SORT_PIZZAS':
            return {...state, filterSortPizzas: action.payload}
        default:
            return state;
    }
};

export default filter;