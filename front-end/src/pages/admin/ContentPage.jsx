import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { Form, Table, AlertMessage } from './../../components/importComponents';
import { getNewStr } from './../../functions/str';
import switchRoutePath from './../../functions/switchRoutePath';

const ContentPage = ({ path }) => {
    const dispatch = useDispatch();
    const { allItems } = useSelector(({ admin }) => ({
        allItems: admin[path]
    }));
    const itemsKeys = allItems.length && Object.keys(allItems[0]);

    const [alertOptions, setAlertOptions] = useState({isOpen: false, message: '', type: 'error'});

    const getData = async () => {
        const resp = await axios(`/api/${getNewStr(path)}${path === 'pizzas' ? '/all' : ''}`);
        return await resp;
    };

    const showAlert = (message, type) => {
        setAlertOptions({isOpen: true, message: message, type: type});
        setTimeout(() => {
            setAlertOptions({isOpen: false, message: '', type: ''});
        }, 2000);
    }

    const postItem = (formikValues) => {
        axios.post(`/api/${getNewStr(path)}`, formikValues, {headers: {'Content-type': 'application/json'}})
            .then((resp) => {
                getData().then(resp => {
                    const resFunc = switchRoutePath(getNewStr(path), resp.data);
                    dispatch(resFunc());
                });

                showAlert('The add operation was successful', 'success');
            })
            .catch((err) => {
                showAlert('Error', 'error');
            })
    };

    const deleteItem = (id) => {
        axios.delete(`/api/${getNewStr(path)}/${id}`)
            .then(() => {
                getData().then(resp => {
                    const resFunc = switchRoutePath(getNewStr(path), resp.data);
                    dispatch(resFunc());
                });

                showAlert('The add operation was successful', 'success');
            })
            .catch((err) => {
                showAlert('Error', 'error');
            })
    };

    return (
        <Box p={4}>
            <Typography
                    variant="h4"
                    content="h4"
                    mb={3}
                >
                    {getNewStr(path)}
            </Typography>
            <AlertMessage 
                alertOptions={alertOptions}
                setAlertOptions={setAlertOptions}
            />
            <Form 
                itemsKeys={itemsKeys} 
                postItem={postItem} 
                path={path}
            />
            <Table 
                itemsKeys={itemsKeys} 
                allItems={allItems} 
                getData={getData} 
                deleteItem={deleteItem} 
            />
        </Box>
    )
}

export default ContentPage;
