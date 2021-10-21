import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { ThemeProvider } from '@material-ui/styles';
import { createTheme } from '@material-ui/core';
import { Main, Admin } from './pages/importPages';

const App = () => {
    let theme = createTheme();

    return (
        <ThemeProvider theme={theme}>
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
        </ThemeProvider>
    )
}

export default App;
