import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { fetchPizzas, fetchData } from './redux/actions/importActions';
import { Main, Admin } from './pages/importPages';

const App = () => {
    const dispatch = useDispatch();
    const { activeCategorie, activeSortBy } = useSelector(({ filter }) => ({
        activeCategorie: filter.categorie,
        activeSortBy: filter.sortBy
    }));

    useEffect(() => {
        dispatch(fetchData());
        dispatch(fetchPizzas(activeCategorie, activeSortBy));
    }, [activeCategorie, activeSortBy, dispatch]);

    return (
        <>
            <Router>
                <Switch>
                    <Route path="/app" component={Main} />
                    <Route path="/admin" component={Admin} />
                    <Redirect to="/app" />
                </Switch>
            </Router>
            <ToastContainer
                position="bottom-left"
                limit={3}
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}

export default App;
