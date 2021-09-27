import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { fetchPizzas } from './redux/actions/importActions';
import { Header } from './components/importComponents';
import { Home, Cart, PageNotFound } from './pages/importPages';

function App() {
    const dispatch = useDispatch();
    const { pizzas, isLoaded, activeCategorie, activeSortBy, items, totalPrice, totalPizzas } = useSelector(({ pizzas, filter, cart }) => ({
        pizzas: pizzas.pizzas,
        isLoaded: pizzas.isLoaded,

        activeCategorie: filter.categorie,
        activeSortBy: filter.sortBy,
        
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalPizzas: cart.totalPizzas
    }));

    useEffect(() => {
        dispatch(fetchPizzas(activeCategorie, activeSortBy));
    }, [activeCategorie, activeSortBy, dispatch]);

    return (
        <div className="wrapper">
            <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
            <div className="content">
                <Switch>
                    <Route path="/" exact>
                        <Home
                            pizzas={pizzas}
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
                    <Route component={ PageNotFound } exact />
                </Switch>
            </div>
        </div>
    );
}

export default App;
