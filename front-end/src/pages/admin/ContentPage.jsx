import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { toast } from "react-toastify";
import { Form, Table } from './../../components/importComponents';
import { getNewStr, switchRoutePath } from './../../functions/importFunctions';

const ContentPage = ({ path }) => {
    const dispatch = useDispatch();
    const { allItems } = useSelector(({ admin }) => ({
        allItems: admin[path]
    }));
    const itemsKeys = allItems.length && Object.keys(allItems[0]);

    const getData = async () => {
        const resp = await axios(`/api/${getNewStr(path)}${path === 'pizzas' ? '/all' : ''}`);
        return await resp;
    };

    const notify = (message, type) => {
        toast[type](`🦄 ${message}`);
    };

    const postItem = (formikValues) => {
        axios.post(`/api/${getNewStr(path)}`, formikValues, {headers: {'Content-type': 'application/json'}})
            .then((resp) => {
                getData().then(resp => {
                    const resFunc = switchRoutePath(getNewStr(path), resp.data);
                    dispatch(resFunc());
                });

                notify('The add operation was successful', 'success');
            })
            .catch((err) => {
                notify('Error add', 'error');
            })
    };

    const deleteItem = (id) => {
        axios.delete(`/api/${getNewStr(path)}/${id}`)
            .then(() => {
                getData().then(resp => {
                    const resFunc = switchRoutePath(getNewStr(path), resp.data);
                    dispatch(resFunc());
                });

                notify('The delete operation was successful', 'success');
            })
            .catch((err) => {
                notify('Error delete', 'error');
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
            <Form 
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
