import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { Form, Table, FormUpdate } from './../../components/importComponents';
import { getNewStr, switchRoutePath } from './../../functions/importFunctions';
import { toast } from "react-toastify";

const statusArray = ['Pending', 'InProgress', 'Paused', 'Closed'];

const Cook = ({ path }) => {
    const dispatch = useDispatch();
    const { allItems } = useSelector(({ admin }) => ({
        allItems: admin[path]
    }));
    const itemsKeys = allItems.length && Object.keys(allItems[0]);

    const [visibleFormPost, setVisibleFormPost] = useState(true);
    const [putStatusId, setPutStatusId] = useState('');
    const [elemUpdate, setElemUpdate] = useState('');
    
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

                path === 'cook' && notify('The put operation was successful', 'success');
            })
            .catch((err) => {
                notify('Error delete', 'error');
            })
    };

    const putItem = (id, obj) => {
        axios.put(`/api/${getNewStr(path)}/${id}/${elemUpdate === 'post' ? 'post' : 'status'}`, obj)
            .then(() => {
                getData().then(resp => {
                    const resFunc = switchRoutePath(getNewStr(path), resp.data);
                    dispatch(resFunc());
                });

                notify('The put operation was successful', 'success');
            })
            .catch((err) => {
                notify('Error put', 'error');
            })
        console.log(id);
    }

    return (
        <Box p={4}>
            <Typography
                    variant="h4"
                    content="h4"
                    mb={3}
                >
                    {getNewStr(path)}
            </Typography>
            {
                visibleFormPost ?
                    <Form 
                        postItem={postItem} 
                        path={path}
                        statusArray={statusArray}
                        visibleFormPost={visibleFormPost}
                    /> :
                    <FormUpdate 
                        putItem={putItem} 
                        putStatusId={putStatusId} 
                        setVisibleFormPost={setVisibleFormPost}
                        statusArray={statusArray}
                        elemUpdate={elemUpdate}
                    />
            }
            <Table 
                itemsKeys={itemsKeys} 
                allItems={allItems} 
                getData={getData} 
                deleteItem={deleteItem} 

                putItem={putItem}
                setVisibleFormPost={setVisibleFormPost}
                setPutStatusId={setPutStatusId}
                setElemUpdate={setElemUpdate}
            />
        </Box>
    )
}

export default Cook;
