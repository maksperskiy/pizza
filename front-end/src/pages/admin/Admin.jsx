import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { fetchData } from './../../redux/actions/importActions';
import { NavPanel, Sidebar } from './../../components/importComponents';
import { ContentPage, Cook, CookSession } from './../../pages/importPages';

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
    const dispatch = useDispatch();
    const [visibleSidebar, setVisibleSidebar] = useState(false);
    const classes = useStyles();

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setVisibleSidebar(open);
    };

    useEffect(() => {
        dispatch(fetchData());
    }, []);

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
                        
                        {path: 'post', component: ContentPage}
                    ].map(({ path, component }) => 
                        <Route key={path} path={`/admin/${path}`}>
                            <ContentPage path={path} />
                        </Route>)
                }
                <Route path={`/admin/cooksession`}>
                        <CookSession path="cooksession" />
                </Route>
                <Route path={`/admin/cook`}>
                        <Cook path="cook" />
                </Route>
                <Route path="/*" exact component={() => <Typography variant="h2" component="h1" className={classes.intro}>Добро пожаловать<br/> в админку сайта Pizza Shop</Typography>} />
            </Switch>
        </Box>
    );
};

export default Admin;
