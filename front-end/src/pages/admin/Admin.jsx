import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { NavPanel, Sidebar } from './../../components/importComponents';
import { ContentPage, Pizzas } from './../../pages/importPages';

const useStyles = makeStyles({
    intro: {
        textAlign: 'center',
        width: '100%',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate3d(-50%, -50%, 10px)',
    }
});

const Admin = () => {
    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const classes = useStyles();

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setVisibleSidebar(open);
    };

    return (
        <Box style={{height: '100vh', background: '#fff'}}>
            <NavPanel toggleDrawer={toggleDrawer} />
            <Sidebar visibleSidebar={visibleSidebar} toggleDrawer={toggleDrawer} />
            <Switch>
                <Route path="/admin" exact component={() => <Typography variant="h2" component="h1" className={classes.intro}>Добро пожаловать<br/> в админку сайта Pizza Shop</Typography>} />
                {
                    [
                        {path: 'categories', component: ContentPage},
                        {path: 'names', component: ContentPage},
                        {path: 'pizzas', component: ContentPage},
                        {path: 'sizes', component: ContentPage},
                        {path: 'types', component: ContentPage},
                        
                        {path: 'cook', component: ContentPage},
                        {path: 'post', component: ContentPage}
                    ].map(({ path, component }) => 
                        <Route key={path} path={`/admin/${path}`}>
                            <ContentPage path={path} />
                        </Route>)
                }
                {/* <Route path={`/admin/pizzas`}>
                        <Pizzas path="pizzas" />
                </Route> */}
                <Route path="/*" exact component={() => <Typography variant="h2" component="h1" className={classes.intro}>Добро пожаловать<br/> в админку сайта Pizza Shop</Typography>} />
            </Switch>
        </Box>
    );
};

export default Admin;
