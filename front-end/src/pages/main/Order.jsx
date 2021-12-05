import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { toast } from "react-toastify";
import { OrderForm } from './../../components/importComponents';
import { clearCart, setCustomer, setItems, setAllOrder } from './../../redux/actions/importActions';

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

const Order = ({ items, totalPrice, totalPizzas, allOrder, customerName }) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const notify = (message, type) => {
        toast[type](`🦄 ${message}`);
    };

    const orderPost = (values) => {
        console.log(values);
        
        axios.post('/api/Order', values)
            .then((resp) => {
                notify('Data success send', 'success');
                let newOrders = [];
                axios.get('/api/Order')
                    .then(({ data }) => {
                        newOrders = [...data];
                        dispatch(setAllOrder(data));
                        console.log(newOrders);
                        const customerId = newOrders.filter(order => order?.customer.name === values.name && order?.customer.mail === values.mail)[0]?.customer.customerId;
                        
                        console.log(allOrder);
                        const array = newOrders.filter(order => order?.customer.name === values.name && order?.customer.mail === values.mail)
                        console.log(array);

                        axios.get(`/api/Order/customers/${customerId}`)
                            .then(({ data }) => {
                                const findArray = data.filter(item => (item.customer.name === values.name) && (item.customer.mail === values.mail) && (item.status === 'Pending' || item.status === 'InProgress'));
                                dispatch(setItems(findArray));
                            })
                    })
                // console.log(newOrders)
                // const customerId = newOrders.filter(order => order?.customer.name === values.name && order?.customer.mail === values.mail)[0]?.customer.customerId;
                
                // console.log(allOrder);
                // const array = newOrders.filter(order => order?.customer.name === values.name && order?.customer.mail === values.mail)
                // console.log(array);

                // axios.get(`/api/Order/customers/${customerId}`)
                //     .then(({ data }) => {
                //         const findArray = data.filter(item => (item.customer.name === values.name) && (item.customer.mail === values.mail) && (item.status === 'Pending' || item.status === 'InProgress'));
                //         dispatch(setItems(findArray));
                //     })
            })
            .catch((error) => notify('Error', 'error'))
    };

    return (
        <div className="container container--order">
            <Typography 
                variant="h2" 
                className={classes.title}
            >
                Оформление заказа
            </Typography>
            <OrderForm 
                items={items} 
                totalPrice={totalPrice} 
                totalPizzas={totalPizzas}
                allOrder={allOrder}
                orderPost={orderPost} 
                customerName={customerName}
            />
        </div>
    )
}

export default Order;
