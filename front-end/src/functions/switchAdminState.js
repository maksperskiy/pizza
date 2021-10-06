const switchAdminState = (key, allCategories, allNames, allSizes, allTypes) => {
    switch(key) {
        case 'categoryId':
            return allCategories;
        case 'nameId':
            return allNames;
        case 'sizeId':
            return allSizes;
        case 'typeId':
            return allTypes;    
        default:
            break;
    }
};

export default switchAdminState;