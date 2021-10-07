import React from 'react';
import { Box, SwipeableDrawer, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SidebarFolder } from './../importComponents';

const useStyles = makeStyles({
    typography: {
        padding: '8px 10px',
        fontWeight: '700 !important'
    },
    activeListItem: {
        backgroundColor: '#E0FFFF !important'
    }
});

const sidebarItems = [
    {folderName: 'Pizzas', folderItems: ['Categories', 'Names', 'Pizzas', 'Sizes', 'Types']},
    {folderName: 'Orders', folderItems: ['Cart', 'Posts']},
    {folderName: 'Customers', folderItems: ['Customer1', 'Customer2', 'Customer3']},
];

const Sidebar = ({ visibleSidebar, toggleDrawer }) => {
    const classes = useStyles();

    return (
        <>
            <SwipeableDrawer
                open={visibleSidebar}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
            >
                <Typography 
                    variant="h5" 
                    component="h5"
                    className={classes.typography}
                >
                    Tables
                </Typography>
                <Box
                    sx={{ width: 250 }}
                    role="presentation"
                    onKeyDown={toggleDrawer(false)}
                >
                    {
                        sidebarItems.map((sidebarItem, index) => 
                            <SidebarFolder 
                                folderName={sidebarItem.folderName}
                                folderItems={sidebarItem.folderItems}
                                toggleDrawer={toggleDrawer}
                            />)
                    }
                </Box>
            </SwipeableDrawer>
        </>
    );
};

export default Sidebar;
