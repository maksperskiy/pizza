import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ListItemButton, List, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore, FolderOpen as FolderOpenIcon } from '@material-ui/icons';
import SidebarFolderItem from './SidebarFolderItem';

const SidebarFolder = ({ folderName, folderItems, toggleDrawer }) => {
    const location = useLocation();
    let pathActive;
    if(location.pathname.split('/').length === 3 && location.pathname.split('/')[2].length !== 0) {
        pathActive = location.pathname.split('/')[2][0].toUpperCase() + location.pathname.split('/')[2].substr(1).toLowerCase();
    }

    const [open, setOpen] = useState(false);
    // const [activeListItem, setActiveListItem] = useState(folderItems.findIndex(sidebarItem => sidebarItem === pathActive));
    const activeListItem = folderItems.findIndex(sidebarItem => sidebarItem === pathActive);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <List
                sx={{ width: '100%', maxWidth: 250, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                        <FolderOpenIcon />
                    </ListItemIcon>
                    <ListItemText primary={folderName} />
                    {
                        open ? <ExpandLess /> : <ExpandMore />
                    }
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List >
                        {
                            folderItems.map((text, index) => (
                                <Link 
                                    to={`/admin/${text.toLowerCase()}`} 
                                    key={`${text}_${index}`}
                                >
                                    <SidebarFolderItem
                                        text={text} 
                                        index={index} 
                                        activeListItem={activeListItem}
                                        // setActiveListItem={setActiveListItem}
                                        toggleDrawer={toggleDrawer}
                                    />
                                </Link>
                            ))
                        }
                    </List>
                </Collapse>
            </List>
        </>
    );
};

export default SidebarFolder;
