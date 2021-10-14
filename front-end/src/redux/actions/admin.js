import axios from 'axios';
import { joinArray } from '../../functions/pizzas';

const setAllCategories = (allCategories) => ({type: 'SET_ALL_CATEGORIES', payload: allCategories});
const setAllNames = (allNames) => ({type: 'SET_ALL_NAMES', payload: allNames});
const setAllPizzas = (allPizzas) => ({type: 'SET_ALL_PIZZAS', payload: allPizzas});
const setAllSizes = (AllSizes) => ({type: 'SET_ALL_SIZES', payload: AllSizes});
const setAllTypes = (allTypes) => ({type: 'SET_ALL_TYPES', payload: allTypes});

const setAllCookSession = (allCookSession) => ({type: 'SET_ALL_COOKSESSION', payload: allCookSession});
const setAllCook = (allCook) => ({type: 'SET_ALL_COOK', payload: allCook});
const setAllPost = (allPost) => ({type: 'SET_ALL_POST', payload: allPost});

const fetchData = (cookId) => {
    return (dispatch) => {
        Promise.all([
            axios.get('/api/Categories'),
            axios.get('/api/Names'),
            axios.get('/api/Pizzas/all'),
            axios.get('/api/Sizes'),
            axios.get('/api/Types'),

            axios.get('/api/Cook'),
            axios.get('/api/Post')
        ])
        .then(([fetchCategories, fetchNames, fetchPizzas, fetchSizes, fetchTypes, fetchCook, fetchPost]) => {
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
            dispatch(setAllCook(cook));
            dispatch(setAllPost(fetchPost.data));
            

            axios.get(`/api/CookSession/${cookId}`)
                .then(({ data }) => {
                    const cookSession = joinArray(
                        data,
                        [fetchCook.data],
                        ['cook']
                    );

                    dispatch(setAllCookSession(cookSession));
                })
        })
    }
};

export { setAllCategories, setAllNames, setAllPizzas, setAllSizes, setAllTypes, setAllCookSession, setAllCook, setAllPost, fetchData };