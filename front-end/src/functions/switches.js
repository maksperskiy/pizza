import { setAllCategories, setAllNames, setAllSizes, setAllTypes, setCurCustomer, setAllPromo, setAllCookSession, setAllPost, fetchData } from './../redux/actions/importActions';

const switchAdminState = (key, allCategories, allNames, allSizes, allTypes, allCustomers, statusArray, allCook, allPost) => {
    switch(key) {
        case 'categoryId':
            return allCategories;
        case 'nameId':
            return allNames;
        case 'sizeId':
            return allSizes;
        case 'typeId':
            return allTypes;

        case 'cookSession':
            return allCook.filter(cook => cook.cookStatus === 'InProgress');
        case 'customerId':
            return allCustomers;

        case 'cookStatus':
            return statusArray;
        case 'cookId':
            return allCook;
        case 'post':
            return allPost;
        case 'postId':
            return allPost; 
        default:
            break;
    }
};

const switchKeysWithoutId = (routePath) => {
    switch(routePath) {
        case 'categories':
            return ['value'];
        case 'names':
            return ['value', 'image'];
        case 'pizzas':
            return ['nameId', 'typeId', 'sizeId', 'categoryId', 'price', 'visible'];
        case 'sizes':
            return ['value', 'name'];
        case 'types':
            return ['value'];
        
        case 'promo':
            return ['value', 'promoCode'];

        case 'cooksession': 
            return ['cookId'];
        case 'cook':
            return ['name', 'phone', 'postId', 'cookStatus'];
        case 'post':
            return ['value'];
        default:
            break;
    }
};

const switchRoutePath = (routePath, data, cookId) => {
    return () => {
        switch(routePath) {
            case 'Categories':
                return setAllCategories(data);
            case 'Names':
                return setAllNames(data);
            case 'Pizzas':
                return fetchData();
            case 'Sizes':
                return setAllSizes(data);
            case 'Types':
                return setAllTypes(data);

            case 'CookSession':
                return fetchData();
            case 'Customers':
                return setCurCustomer(data);
            case 'Promo':
                return setAllPromo(data);

            case 'Cooksession':
                return fetchData(cookId);
            case 'Cook':
                return fetchData();
            case 'Post':
                return setAllPost(data);
            default:
                break;
        }
    }
};

export { switchAdminState, switchKeysWithoutId, switchRoutePath };