import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography, IconButton } from '@material-ui/core';
import { Menu as MenuIcon, Home as HomeIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    root: {
        color: '#fff'
    },
    svg: {
        color: '#fff'
    }
});

const NavPanel = ({ toggleDrawer }) => {
    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={classes.root}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography 
                        variant="h6" 
                        component="div" 
                        sx={{ flexGrow: 1 }}
                    >
                        Админка
                    </Typography>
                    <Link to="/app">
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="home"
                    >
                        <HomeIcon className={classes.svg} />
                    </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

export default NavPanel;
