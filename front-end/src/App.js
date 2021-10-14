import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Main, Admin } from './pages/importPages';

const App = () => {
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
