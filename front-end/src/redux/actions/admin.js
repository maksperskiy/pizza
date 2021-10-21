import axios from 'axios';
import { joinArray } from '../../functions/pizzas';

const setAllCategories = (allCategories) => ({type: 'SET_ALL_CATEGORIES', payload: allCategories});
const setAllNames = (allNames) => ({type: 'SET_ALL_NAMES', payload: allNames});
const setAllPizzas = (allPizzas) => ({type: 'SET_ALL_PIZZAS', payload: allPizzas});
const setAllSizes = (AllSizes) => ({type: 'SET_ALL_SIZES', payload: AllSizes});
const setAllTypes = (allTypes) => ({type: 'SET_ALL_TYPES', payload: allTypes});

const setAllCustomers = (allCustomers) => ({type: 'SET_ALL_CUSTOMERS', payload: allCustomers});
const setCurCustomer = (curCustomer) => ({type: 'SET_CUR_CUSTOMER', payload: curCustomer});
const setAllOrder = (allOrder) => ({type: 'SET_ALL_ORDER', payload: allOrder});
const setAllPromo = (allPromo) => ({type: 'SET_ALL_PROMO', payload: allPromo});

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

            axios.get(`/api/Order/Customers`),
            axios.get('/api/Order'),
            axios.get('/api/Promo'),

            axios.get('/api/Cook'),
            axios.get('/api/Post')
        ])
        .then(([fetchCategories, fetchNames, fetchPizzas, fetchSizes, fetchTypes, fetchCustomers, fetchOrder, fetchPromo, fetchCook, fetchPost]) => {
            const pizzas = joinArray(
                fetchPizzas.data, 
                [fetchCategories.data, fetchNames.data, fetchSizes.data, fetchTypes.data],
                ['category', 'name', 'size', 'type']
            );
            console.log(fetchOrder.data);
            dispatch(setAllCategories(fetchCategories.data));
            dispatch(setAllNames(fetchNames.data));
            dispatch(setAllPizzas(pizzas));
            dispatch(setAllSizes(fetchSizes.data));
            dispatch(setAllTypes(fetchTypes.data));

            dispatch(setAllCustomers(fetchCustomers.data));

            const cook = joinArray(
                fetchCook.data, 
                [fetchPost.data],
                ['post']
            );

            dispatch(setAllCook(cook));

            // dispatch(setCurCustomer(fetchCustomers.data));
            // const newCurCustomer = localStorage.getItem('customer') ? 
            // fetchCustomers.data.filter(customer => customer.customerId === localStorage.getItem('customer')) : 
            // fetchCustomers.data;
            // dispatch(setCurCustomer(newCurCustomer));
            localStorage.getItem('customer') ? 
                axios.get(`/api/Order/Customers/${localStorage.getItem('customer')}`)
                    .then(({ data }) => {
                        dispatch(setCurCustomer(data));
                    })
                :
                // dispatch(setCurCustomer(fetchCustomers.data.filter(customer => customer.customerId === localStorage.getItem('customer')))) :
                dispatch(setCurCustomer(fetchCustomers.data))

            dispatch(setAllOrder(fetchOrder.data));
            dispatch(setAllPromo(fetchPromo.data));
            
            dispatch(setAllPost(fetchPost.data));
            

            axios.get(`/api/CookSession/${
                cookId ? 
                    cookId : 
                localStorage.getItem('cook') ? localStorage.getItem('cook') :
                    cook[0].cookId
            }`)
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

export { setAllCategories, setAllNames, setAllPizzas, setAllSizes, setAllTypes, setCurCustomer, setAllCustomers, setAllOrder, setAllPromo, setAllCookSession, setAllCook, setAllPost, fetchData };