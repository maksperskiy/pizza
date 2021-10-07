import { setAllCategories, setAllNames, setAllPizzas, setAllSizes, setAllTypes, fetchData } from './../redux/actions/importActions';

const switchRoutePath = (routePath, data) => {
    return () => {
        switch(routePath) {
            case 'Categories':
                return setAllCategories(data);
            case 'Names':
                return setAllNames(data);
            case 'Pizzas':
                // return setAllPizzas(data);
                return fetchData();
            case 'Sizes':
                return setAllSizes(data);
            case 'Types':
                return setAllTypes(data);
            default:
                break;
        }
    }
};

export default switchRoutePath;