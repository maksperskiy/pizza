import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { TableRowsOutlined as TableRowsOutlinedIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    activeListItem: {
        backgroundColor: '#E0FFFF !important'
    }
});

const SidebarFolderItem = ({ text, index, activeListItem, /*setActiveListItem,*/ toggleDrawer }) => {
    const classes = useStyles();
    
    return (
        <>
            <ListItemButton 
                sx={{ pl: 4 }}
                className={activeListItem === index ? classes.activeListItem : ''}
                onClick={toggleDrawer(false)}
                // onClick={() => {setActiveListItem(index)}}
            >
                <ListItemIcon>
                    <TableRowsOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
            </ListItemButton>
        </>
    )
}

export default SidebarFolderItem;
