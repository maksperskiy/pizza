import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch } from 'react-router-dom';
import { fetchPizzas, fetchData } from './../../redux/actions/importActions';
import { Header } from './../../components/importComponents';
import { Home, Cart, OrderMain, PageNotFound } from './../../pages/importPages';


function Main() {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    const { pizzas, isLoaded, activeCategorie, activeSortBy, /*filterSortPizzas,*/ items, totalPrice, totalPizzas } = useSelector(({ pizzas, filter, cart }) => ({
        pizzas: pizzas.pizzas,
        isLoaded: pizzas.isLoaded,

        activeCategorie: filter.categorie,
        activeSortBy: filter.sortBy,
        filterSortPizzas: filter.filterSortPizzas,
        
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalPizzas: cart.totalPizzas
    }));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('totalPrice', totalPrice);
    localStorage.setItem('totalPizzas', totalPizzas);

    // useEffect(() => {
    //     dispatch(fetchData());
    // }, []);

    useEffect(() => {
        dispatch(fetchPizzas(activeCategorie, activeSortBy));
    }, [activeCategorie, activeSortBy, dispatch]);

    return (
        <div className="wrapper">
            <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
            <div className="content">
                <Switch>
                    <Route path={`${path}/`} exact>
                        <Home
                            // pizzas={filterSortPizzas}
                            pizzas={pizzas}
                            isLoaded={isLoaded}
                            activeCategorie={activeCategorie} 
                            activeSortBy={activeSortBy} 
                        />
                    </Route>
                    <Route path={`${path}/cart`}>
                        <Cart 
                            items={items} 
                            totalPrice={totalPrice} 
                            totalPizzas={totalPizzas} 
                        />
                    </Route>
                    <Route path={`${path}/order`}>
                        <OrderMain
                            items={items} 
                            totalPrice={totalPrice} 
                            totalPizzas={totalPizzas} 
                        />
                    </Route>
                    <Route path={`${path}/*`} component={PageNotFound} exact />
                    <Redirect to={`${path}/`} />
                </Switch>
            </div>
        </div>
    );
}

export default Main;
