import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect, useRouteMatch, Link } from 'react-router-dom';
import { fetchPizzas, fetchData } from './../../redux/actions/importActions';
import { Header } from './../../components/importComponents';
import { Home, Cart, OrderMain, PageNotFound, MyItems } from './../../pages/importPages';


function Main() {
    const { path, url } = useRouteMatch();
    const dispatch = useDispatch();
    const { pizzas, isLoaded, activeCategorie, activeSortBy, items, totalPrice, totalPizzas, allOrder, allCook, customerName, customerItems } = useSelector(({ pizzas, filter, cart, admin, customer }) => ({
        pizzas: pizzas.pizzas,
        isLoaded: pizzas.isLoaded,

        activeCategorie: filter.categorie,
        activeSortBy: filter.sortBy,
        filterSortPizzas: filter.filterSortPizzas,
        
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalPizzas: cart.totalPizzas,

        allOrder: admin.order,
        allCook: admin.cook,

        customerName: customer.customerName,
        customerItems: customer.items
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
        <div>
            <div className="wrapper">
                <Header totalPrice={totalPrice} totalPizzas={totalPizzas} />
                <div className="content">
                    <Switch>
                        <Route path={`${path}/`} exact>
                            <Home
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
                                allOrder={allOrder}
                                customerName={customerName}
                            />
                        </Route>
                        <Route path={`${path}/myitems`}>
                            <MyItems 
                                allOrder={allOrder} 
                                allCook={allCook} 
                                customerName={customerName}
                                customerItems={customerItems}
                            />
                        </Route>
                        <Route path={`${path}/*`} component={PageNotFound} exact />
                        <Redirect to={`${path}/`} />
                    </Switch>
                </div>
            </div>
            <Link to={`/admin`}>
                <button 
                    // style={{
                    //     background: 'none',
                    //     outline: 'none',
                    //     border: '1px solid #000',
                    //     fontSize: '20px',
                    //     margin: '0 0 50px 50px',
                    //     padding: '5px 10px',
                    //     cursor: 'pointer',
                    //     ':hover': {
                    //         color: '#ffffff'
                    //     }
                    // }}
                    className="button--admin"
                >
                    В админку
                </button>
            </Link>
        </div>
    );
}

export default Main;
