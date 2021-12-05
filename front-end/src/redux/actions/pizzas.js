import axios from 'axios';
import { joinArray, concatArrays, filter, sort } from './../../functions/pizzas';
import { setAllSizes, setAllTypes, setAllPizzas, setAllOrder, setAllCook } from './importActions';

const setPizzas = (pizzas) => ({type: 'SET_PIZZAS', payload: pizzas});
const setLoaded = (flag) => ({type: 'SET_LOADED', payload: flag});
const setCategories = (categories) => ({type: 'SET_CATEGORIES', payload: categories});
const setNames = (names) => ({type: 'SET_NAMES', payload: names});
const setSizes = (sizes) => ({type: 'SET_SIZES', payload: sizes});
const setTypes = (types) => ({type: 'SET_TYPES', payload: types});

const fetchPizzas = (activeCategorie, activeSortBy) => {
    return (dispatch) => {
        dispatch(setLoaded(false));
        Promise.all([
            axios.get('/api/Categories'),
            axios.get('/api/Names'),
            axios.get('/api/Pizzas'),
            axios.get('/api/Sizes'),
            axios.get('/api/Types'),

            axios.get('/api/Pizzas/all'),
            axios.get('/api/Order'),
            axios.get('/api/Cook')
        ])
        .then(([fetchCategories, fetchNames, fetchPizzas, fetchSizes, fetchTypes, fetchAllPizzas, fetchOrder, fetchCook]) => {
            const sortSize = [...fetchSizes.data.sort((prev, next) => {
                if(prev.value < next.value) {
                    return -1;
                }
            })];
            dispatch(setAllSizes(sortSize));
            dispatch(setAllTypes(fetchTypes.data));
            const pizzasAll = joinArray(
                fetchAllPizzas.data, 
                [fetchCategories.data, fetchNames.data, fetchSizes.data, fetchTypes.data],
                ['category', 'name', 'size', 'type']
            );
            dispatch(setAllPizzas(pizzasAll));
            dispatch(setAllOrder(fetchOrder.data));
            dispatch(setAllCook(fetchCook.data));

            const pizzas = joinArray(
                fetchPizzas.data, 
                [fetchCategories.data, fetchNames.data, fetchSizes.data, fetchTypes.data],
                ['category', 'name', 'size', 'type']
            );

            const endPizzas = concatArrays(pizzas, ['size', 'type']);

            const useCategories = fetchCategories.data.filter(categorie => {
                return pizzas.some(pizza => pizza.category.categoryId === categorie.categoryId);
            });

            dispatch(setCategories(useCategories));

            const filterArray = filter(endPizzas, activeCategorie);
            const sortArray = sort(filterArray, activeSortBy.type, activeSortBy.order);
            // dispatch(setFilterSortPizzas(sortArray));
            dispatch(setPizzas(sortArray));
            dispatch(setLoaded(true));
        })
    }
};

export { setPizzas, setLoaded, setCategories, setNames, setSizes, setTypes, fetchPizzas };