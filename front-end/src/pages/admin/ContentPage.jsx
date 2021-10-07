import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { Form, Table } from './../../components/importComponents';
import { getNewStr } from './../../functions/str';
import switchRoutePath from './../../functions/switchRoutePath';

const ContentPage = ({ path }) => {
    const dispatch = useDispatch();
    const { allItems } = useSelector(({ admin }) => ({
        allItems: admin[path]
    }));
    const itemsKeys = allItems.length && Object.keys(allItems[0]);

    const [message, setMessage] = useState('');

    const getData = async () => {
        const { data } = await axios(`/api/${getNewStr(path)}${path === 'pizzas' ? '/all' : ''}`);
        return await data;
    };

    const postItem = (formikValues) => {
        axios.post(`/api/${getNewStr(path)}`, formikValues, {headers: {'Content-type': 'application/json'}})
            .then(() => {
                getData().then(data => {
                    const resFunc = switchRoutePath(getNewStr(path), data);
                    dispatch(resFunc());
                });
            })
            .catch((err) => {
                setMessage('Такая запись уже есть');
                setTimeout(() => {
                    setMessage('');
                }, 2000);
            })
    };

    const deleteItem = (id) => {
        axios.delete(`/api/${getNewStr(path)}/${id}`)
            .then(() => {
                getData().then(data => {
                    const resFunc = switchRoutePath(getNewStr(path), data);
                    dispatch(resFunc());
                });
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
                itemsKeys={itemsKeys} 
                getData={getData} 
                postItem={postItem} 
                message={message}
                setMessage={setMessage}
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
