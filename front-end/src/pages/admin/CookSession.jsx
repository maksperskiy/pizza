import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@material-ui/core';
import { Form, Table, FormUpdate, FormGet } from './../../components/importComponents';
import { getNewStr, switchRoutePath } from './../../functions/importFunctions';
import { toast } from "react-toastify";

const statusArray = ['Pending', 'InProgress', 'Paused', 'Closed'];

const CookSession = ({ path }) => {
    const dispatch = useDispatch();
    const { allItems, allCook } = useSelector(({ admin }) => ({
        allItems: admin[path],
        allCook: admin.cook
    }));
    const itemsKeys = allItems.length && Object.keys(allItems[0]);

    const [visibleFormPost, setVisibleFormPost] = useState(true);
    const [putStatusId, setPutStatusId] = useState('');
    const [elemUpdate, setElemUpdate] = useState('');
    
    const getData = async (cookId) => {
        const resp = await axios(`/api/${getNewStr(path)}/${ cookId ? cookId : allCook[0].cookId }`);
        return await resp;
    };

    const selectGetData = async (cookId) => {
        axios.get(`/api/${getNewStr(path)}/${cookId}`)
            .then(({ data }) => {
                const resFunc = switchRoutePath(getNewStr(path), data, cookId);
                dispatch(resFunc());

                notify('The get operation was successful', 'success');
            })
    };

    const notify = (message, type) => {
        toast[type](`🦄 ${message}`);
    };
    
    const postItem = (cookId) => {
        console.log(cookId);
        axios.post(`/api/CookSession`, { cookId: cookId ? cookId : allCook[0].cookId }, {headers: {'Content-type': 'application/json'}})
            .then((resp) => {
                getData(cookId).then(resp => {
                    const resFunc = switchRoutePath(getNewStr(path), resp.data, cookId);
                    dispatch(resFunc());
                });

                notify('The add operation was successful', 'success');
            })
            .catch((err) => {
                notify('Error add', 'error');
            })
    };

    const putDateTimeItem = (cookId) => {
        axios.put(`/api/${getNewStr(path)}/${ cookId ? cookId : allCook[0].cookId }/end`)
            .then(({ data }) => {
                const resFunc = switchRoutePath(getNewStr(path), data, cookId);
                dispatch(resFunc());

                notify('The put operation was successful', 'success');
            })
            .catch((err) => {
                notify('Error put', 'error');
            })
        console.log(cookId);
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
            <Box sx={{display: 'flex'}}>
            <FormGet 
                getElem="cookId"
                statusArray={statusArray}
                selectGetData={selectGetData}
                postItem={postItem}
                putDateTimeItem={putDateTimeItem}
            />
            </Box>
            <Table 
                itemsKeys={itemsKeys} 
                allItems={allItems} 
                getData={getData} 
                // deleteItem={deleteItem} 

                // putItem={putItem}
                setVisibleFormPost={setVisibleFormPost}
                setPutStatusId={setPutStatusId}
                setElemUpdate={setElemUpdate}
                putDateTimeItem={putDateTimeItem}
            />
        </Box>
    )
}

export default CookSession;
