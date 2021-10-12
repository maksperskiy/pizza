import axios from 'axios';
import { joinArray } from '../../functions/pizzas';

const setAllCategories = (allCategories) => ({type: 'SET_ALL_CATEGORIES', payload: allCategories});
const setAllNames = (allNames) => ({type: 'SET_ALL_NAMES', payload: allNames});
const setAllPizzas = (allPizzas) => ({type: 'SET_ALL_PIZZAS', payload: allPizzas});
const setAllSizes = (AllSizes) => ({type: 'SET_ALL_SIZES', payload: AllSizes});
const setAllTypes = (allTypes) => ({type: 'SET_ALL_TYPES', payload: allTypes});

const setAllCook = (allCook) => ({type: 'SET_ALL_COOK', payload: allCook});
const setAllPost = (allPost) => ({type: 'SET_ALL_POST', payload: allPost});

const fetchData = () => {
    return (dispatch) => {
        Promise.all([
            axios.get('/api/Categories'),
            axios.get('/api/Names'),
            axios.get('/api/Pizzas/all'),
            axios.get('/api/Sizes'),
            axios.get('/api/Types'),

            // axios.get('/api/CookSession/58dec6fb-9dee-48d3-b9ba-a8933349b9f9'),
            axios.get('/api/Cook'),
            axios.get('/api/Post')
        ])
        .then(([fetchCategories, fetchNames, fetchPizzas, fetchSizes, fetchTypes, /*fetchCookSession*/, fetchCook, fetchPost]) => {
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

            const cook = joinArray(
                fetchCook.data, 
                [fetchPost.data],
                ['post']
            );
            // console.log(fetchCookSession.data);
            dispatch(setAllCook(cook));
            dispatch(setAllPost(fetchPost.data));
        })
    }
};

export { setAllCategories, setAllNames, setAllPizzas, setAllSizes, setAllTypes , setAllCook, setAllPost, fetchData };