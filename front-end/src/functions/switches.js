import { setAllCategories, setAllNames, setAllSizes, setAllTypes, setAllCook, setAllPost, fetchData } from './../redux/actions/importActions';

const switchAdminState = (key, allCategories, allNames, allSizes, allTypes, allCook, allPost) => {
    switch(key) {
        case 'categoryId':
            return allCategories;
        case 'nameId':
            return allNames;
        case 'sizeId':
            return allSizes;
        case 'typeId':
            return allTypes;
        
        case 'cook':
            return allCook;
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
        
        case 'cook':
            return ['name', 'phone', 'postId', 'cookStatus'];
        case 'post':
            return ['value'];
        default:
            break;
    }
};

const switchRoutePath = (routePath, data) => {
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

            case 'Cook':
                return fetchData();
            //     return setAllCook(data);
            case 'Post':
                return setAllPost(data);
            default:
                break;
        }
    }
};

export { switchAdminState, switchKeysWithoutId, switchRoutePath };