import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { fetchPizzas, setFilterPizzas, setLoaded } from './redux/actions/importActions';
import { Header } from './components/importComponents';
import { Home, Cart, PageNotFound } from './pages/importPages';


function App() {
    const dispatch = useDispatch();
    const { pizzas, isLoaded, activeCategorie, activeSortBy, filterPizzas, items, totalPrice, totalPizzas } = useSelector(({ pizzas, filter, cart }) => ({
        pizzas: pizzas.pizzas,
        isLoaded: pizzas.isLoaded,

        activeCategorie: filter.categorie,
        activeSortBy: filter.sortBy,
        filterPizzas: filter.filterPizzas,
        
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalPizzas: cart.totalPizzas
    })); 

    useEffect(() => {
        dispatch(fetchPizzas(activeCategorie, activeSortBy));
    }, [dispatch]);

    const filter = (pizzas) => {
        const filterArray = pizzas.filter(pizza => {
            if(activeCategorie) {
                return pizza.category.value === activeCategorie;
            } else {
                return pizza;
            }
        });

        return filterArray;
    }
    
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
    }

    useEffect(() => {
        const filterArray = filter(pizzas);
        const sortArray = sort(filterArray, activeSortBy.type, activeSortBy.order);

        console.log(sortArray);
        dispatch(setLoaded(false));
        dispatch(setFilterPizzas(sortArray));
        setTimeout(() => {
            dispatch(setLoaded(true));
        }, 200);
    }, [activeCategorie, activeSortBy, dispatch]);

    return (
        <div className="wrapper">
            <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
            <div className="content">
                <Switch>
                    <Route path="/" exact>
                        <Home
                            pizzas={filterPizzas}
                            isLoaded={isLoaded}
                            activeCategorie={activeCategorie} 
                            activeSortBy={activeSortBy} 
                        />
                    </Route>
                    <Route path="/cart" exact>
                        <Cart 
                            items={items} 
                            totalPrice={totalPrice} 
                            totalPizzas={totalPizzas} 
                        />
                    </Route>
                    <Route component={PageNotFound} exact />
                </Switch>
            </div>
        </div>
    );
}

export default App;
