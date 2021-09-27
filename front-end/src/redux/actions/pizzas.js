import axios from 'axios';

const setPizzas = (pizzas) => ({type: 'SET_PIZZAS', payload: pizzas});
const setLoaded = (flag) => ({type: 'SET_LOADED', payload: flag});

const fetchPizzas = (categorie, sortBy) => {
    return (dispatch) => {
        dispatch(setLoaded(false));
        axios.get('/pizzas', {
            params: {
                category: categorie,
                _sort: sortBy.type,
                _order: sortBy.order
            }
        })
            .then(({ data }) => {
                dispatch(setPizzas(data));
                dispatch(setLoaded(true));
            })
    }
};

export { setPizzas, setLoaded, fetchPizzas };