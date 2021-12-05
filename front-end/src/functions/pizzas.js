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
            let newObj;
            for (let i = 0; i < pizzas.length; i++) {
                if(item.name.value === pizzas[i].name.value && item.size) {
                    const oldSizes = !item[newProp] ? [] : item[newProp];
                    item[newProp] = [...oldSizes, pizzas[i][elArr]];
                    const {size, type, ...obj} = item;
                    // delete item[elArr];
                    newObj = {...obj};
                }
            }
            return {...newObj};
            // return {...item};
        });
    });

    return newPizzas;
};

const filter = (pizzas, activeCategorie) => {
    const filterArray = pizzas.filter(pizza => {
        if(activeCategorie) {
            return pizza.category.value === activeCategorie;
        } else {
            return pizza;
        }
    });

    return filterArray;
};

const sort = (pizzas, type) => {
    const sortArray = [...pizzas.sort((prev, next) => {
        if(type === 'name') {
            if(prev.name.value < next.name.value) {
                return -1;
            }
        } else {
            return next[type] - prev[type];
        }
    })];

    return sortArray;
};

export { joinArray, concatArrays, filter, sort };