import axios from 'axios';
import { setFilterPizzas } from './importActions';

const joinArray = (pizzas, fetchArrays, propsArray) => {
    let joinPizzas;

    fetchArrays.forEach((array, i) => {
        joinPizzas = pizzas.map(pizza => {
            const propFind = propsArray[i] + 'Id';
            const index = array.findIndex(name => name[propFind] === pizza[propFind]);
            pizza[propsArray[i]] = array[index];
            delete pizza[propFind];
            return {...pizza};
        })
    });
    
    return joinPizzas;
};

const concatArrays = (pizzas, oldPropsArray) => {
    let newPizzas;
    oldPropsArray.forEach((elArr, i) => {
        const newProp = elArr + 's';

        const deletePizzas = pizzas.reduce((acc, curPizza) => {
            return acc.find(pizza => pizza.name.value === curPizza.name.value) ?
                [...acc] :
                [...acc, curPizza]
        }, []);

        newPizzas = deletePizzas.map(item => {
            for (let i = 0; i < pizzas.length; i++) {
                if(item.name.value === pizzas[i].name.value) {
                    const oldSizes = !item[newProp] ? [] : item[newProp];
                    item[newProp] = [...oldSizes, pizzas[i][elArr]];
                    delete item[elArr];
                }
            }
            return {...item};
        });
    });

    return newPizzas;
};

const setPizzas = (pizzas) => ({type: 'SET_PIZZAS', payload: pizzas});
const setLoaded = (flag) => ({type: 'SET_LOADED', payload: flag});
const setCategories = (categories) => ({type: 'SET_CATEGORIES', payload: categories});
const setNames = (names) => ({type: 'SET_NAMES', payload: names});
const setSizes = (sizes) => ({type: 'SET_SIZES', payload: sizes});
const setTypes = (types) => ({type: 'SET_TYPES', payload: types});

const fetchPizzas = (active, sortBy) => {
    return (dispatch) => {
        // dispatch(setLoaded(false));
        // axios.get('/pizzas', {
        //     params: {
        //         category: categorie,
        //         _sort: sortBy.type,
        //         _order: sortBy.order
        //     }
        // })
        //     .then(({ data }) => {
        //         dispatch(setPizzas(data));
        //         dispatch(setLoaded(true));
        //     })
        dispatch(setLoaded(false));
        Promise.all([
            axios.get('/api/Categories'),
            axios.get('/api/Names'),
            axios.get('/api/Pizzas'),
            axios.get('/api/Sizes'),
            axios.get('/api/Types')
        ])
        .then(([fetchCategories, fetchNames, fetchPizzas, fetchSizes, fetchTypes]) => {
            const pizzas = joinArray(
                fetchPizzas.data, 
                [fetchCategories.data, fetchNames.data, fetchSizes.data, fetchTypes.data],
                ['category', 'name', 'size', 'type']
            );

            const endPizzas = concatArrays(pizzas, ['size', 'type']);

            dispatch(setCategories(fetchCategories.data));
            dispatch(setNames(fetchNames.data));
            dispatch(setSizes(fetchSizes.data));
            dispatch(setTypes(fetchTypes.data));

            dispatch(setPizzas(endPizzas));
            dispatch(setLoaded(true));
            dispatch(setFilterPizzas(endPizzas));
        })
    }
};

export { setPizzas, setLoaded, setCategories, setNames, setSizes, setTypes, fetchPizzas };