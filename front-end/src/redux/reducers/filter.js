const defaultState = {
    categorie: null,
    sortBy: {
        name: 'популярности',
        type: 'rating',
        order: 'desc'
    }
};

const filter = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_CATEGORIE':
            return {...state, categorie: action.payload}
        case 'SET_SORT_BY':
            return {...state, sortBy: action.payload}
        default:
            return state;
    }
};

export default filter;