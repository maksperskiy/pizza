import React from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { toast } from "react-toastify";
import { OrderForm } from './../../components/importComponents';

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

const Order = ({ items, totalPrice, totalPizzas }) => {
    const classes = useStyles();

    const notify = (message, type) => {
        toast[type](`🦄 ${message}`);
    };

    const orderPost = (values) => {
        axios.post('/api/Order', values)
            .then((resp) => notify('Data success send', 'success'))
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
                orderPost={orderPost} 
            />
        </div>
    )
}

export default Order;
