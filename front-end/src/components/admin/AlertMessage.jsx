import React from 'react';
import { Box, Snackbar, Collapse, Alert, IconButton } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

const AlertMessage = ({ alertOptions, setAlertOptions }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Collapse in={alertOptions.isOpen}>
                <Alert
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setAlertOptions({isOpen: false, message: alertOptions.message, type: alertOptions.type});
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    severity={alertOptions.type}
                    sx={{ mb: 1 }}
                >
                    {alertOptions.message}
                </Alert>
            </Collapse>
        </Box>
        // <Snackbar 
        //     open={alertOptions.isOpen} 
        //     autoHideDuration={6000} 
        //     onClose={() => setAlertOptions({isOpen: false, message: alertOptions.message, type: alertOptions.type})}
        // >
        //     <Alert
        //         action={
        //             <IconButton
        //                 aria-label="close"
        //                 color="inherit"
        //                 size="small"
        //                 onClick={() => {
        //                     setAlertOptions({isOpen: false, message: alertOptions.message, type: alertOptions.type});
        //                 }}
        //             >
        //                 <CloseIcon fontSize="inherit" />
        //             </IconButton>
        //         }
        //         severity={alertOptions.type}
        //         sx={{ mb: 1 }}
        //     >
        //         {alertOptions.message}
        //     </Alert>
        // </Snackbar>
    );
};

export default AlertMessage;
