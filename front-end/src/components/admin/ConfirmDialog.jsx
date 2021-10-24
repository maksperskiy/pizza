import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { setIsOpen, setIsAgree } from './../../redux/actions/importActions';

const AlertDialog = () => {
    const dispatch = useDispatch();
    const { isOpen } = useSelector(({ confirmDialog }) => ({
        isOpen: confirmDialog.isOpen
    }));

    const handleClickOpen = () => {
        dispatch(setIsAgree(false));
        dispatch(setIsOpen(true));
    };

    const handleCloseDisagree = () => {
        dispatch(setIsOpen(false));
        dispatch(setIsAgree(false));
    };

    const handleCloseAgree = () => {
        dispatch(setIsOpen(false));
        dispatch(setIsAgree(true));
    };

    return (
        <div>
            <Dialog
                open={isOpen}
                onClose={handleCloseDisagree}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    Delete Confirmation
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDisagree}>Disagree</Button>
                    <Button onClick={handleCloseAgree} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AlertDialog;
