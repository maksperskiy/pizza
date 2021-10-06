import axios from 'axios';
import { joinArray } from '../../functions/pizzas';

const setAllCategories = (allCategories) => ({type: 'SET_ALL_CATEGORIES', payload: allCategories});
const setAllNames = (allNames) => ({type: 'SET_ALL_NAMES', payload: allNames});
const setAllPizzas = (allPizzas) => ({type: 'SET_ALL_PIZZAS', payload: allPizzas});
const setAllSizes = (AllSizes) => ({type: 'SET_ALL_SIZES', payload: AllSizes});
const setAllTypes = (allTypes) => ({type: 'SET_ALL_TYPES', payload: allTypes});

const fetchData = () => {
    return (dispatch) => {
        Promise.all([
            axios.get('/api/Categories'),
            axios.get('/api/Names'),
            axios.get('/api/Pizzas/all'),
            axios.get('/api/Sizes'),
            axios.get('/api/Types')
        ])
        .then(([fetchCategories, fetchNames, fetchPizzas, fetchSizes, fetchTypes]) => {
            const pizzas = joinArray(
                fetchPizzas.data, 
                [fetchCategories.data, fetchNames.data, fetchSizes.data, fetchTypes.data],
                ['category', 'name', 'size', 'type']
            );
            
            dispatch(setAllCategories(fetchCategories.data));
            dispatch(setAllNames(fetchNames.data));
            dispatch(setAllPizzas(pizzas));
            dispatch(setAllSizes(fetchSizes.data));
            dispatch(setAllTypes(fetchTypes.data));
        })
    }
};

export { setAllCategories, setAllNames, setAllPizzas, setAllSizes, setAllTypes, fetchData };