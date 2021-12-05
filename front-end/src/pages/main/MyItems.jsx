import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { toast } from "react-toastify";
import { MyItemsForm, MyItem, Table } from './../../components/importComponents';
import { clearCart, setCustomer, setItems } from './../../redux/actions/importActions';

const useStyles = makeStyles((theme) => ({
    title: {
        fontSize: '32px !important',
        fontWeight: '600 !important',
        marginBottom: '20px !important',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: '26px !important',
            marginBottom: '10px',
        },
    }    
}));

const MyItems = ({ allOrder, allCook, customerName, customerItems }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const itemsKeys = allOrder.length && Object.keys(allOrder[0]);

    const fetchMyItems = () => {
        const name = JSON.parse(localStorage.getItem('customerName'));
        const mail = JSON.parse(localStorage.getItem('customerMail'));
        if(name && mail && allOrder.length) {
            const customerId = allOrder.length && allOrder.filter(order => order?.customer.name === name && order?.customer.mail === mail)[0]?.customer.customerId;
            console.log(customerId);
            axios.get(`/api/Order/customers/${customerId}`)
                .then(({ data }) => {
                    const findArray = data.filter(item => (item.customer.name === name) && (item.customer.mail === mail) && (item.status === 'Pending' || item.status === 'InProgress'));
                    dispatch(setItems(findArray));
                    dispatch(setCustomer({
                        name: JSON.parse(localStorage.getItem('customerName')), 
                        mail: JSON.parse(localStorage.getItem('customerMail')), 
                        address: JSON.parse(localStorage.getItem('customerAddress')), 
                        phone: JSON.parse(localStorage.getItem('customerPhone'))
                    }));
                })
        }
    };

    useEffect(() => {
        fetchMyItems();
    }, [allOrder]);
    
    return (
        <div className="container container--order">
            <Typography 
                variant="h2" 
                className={classes.title}
            >
                Мои заказанные товары
            </Typography>
            {
                customerItems.length ? 
                    <>
                        <Table 
                            allItems={customerItems}
                            itemsKeys={itemsKeys}
                            path="myitems"
                        /> 
                        <Button 
                            variant="contained" 
                            size="large" 
                            sx={{marginTop: '25px'}}
                            onClick={() => {
                                localStorage.removeItem('customerName')
                                localStorage.removeItem('customerMail')
                                localStorage.removeItem('customerAddress')
                                localStorage.removeItem('customerPhone')
                                localStorage.removeItem('myItems')

                                dispatch(setItems([]));
                                console.log('clear: ')
                            }}
                            // className={classes.button}
                        >
                            Посмотреть другие заказы
                        </Button>
                    </> :
                    <MyItemsForm allOrder={allOrder} fetchMyItems={fetchMyItems} />
            }
            {/* {
                allOrder?.length ? 
                <Table 
                    allItems={customerItems}
                    itemsKeys={itemsKeys}
                    path="myitems"
                />
                :
                <div style={{fontSize: '20px'}}>Список пуст</div>
            } */}
        </div>
    )
}

export default MyItems;
