import React from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/styles';
import * as Yup from "yup";
import { clearCart, setCustomer, setItems } from './../../redux/actions/importActions';

const useStyles = makeStyles((theme) => ({
    errorTitle: {
        color: 'red'
    },
    wrapper: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '20px 40px',
        [theme.breakpoints.down('md')]: {
            gridGap: '20px 20px',
        },
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr'
        }
    },
    input: {
        width: '100%',
        height: '50px'
    },
    button: {
        marginTop: '40px !important',
        backgroundColor: `#8aabff !important`,
        '&:hover': {
            backgroundColor: '#5190cf !important',
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginTop: '25px !important',
        }
    }
}));



const arrayFields = ['name', 'mail', 'address', 'phone', 'promo'];

const OrderForm = ({ items, totalPrice, totalPizzas, allOrder, orderPost, customerName }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const BasicFormSchema = Yup.object().shape({
        name: !customerName && Yup.string()
            .min(3, "От 3 и более символов")
            .max(40, "Не более 40 символов")
            .required('Обязательное'),
        mail: !customerName && Yup.string()
            .required('Обязательное')
            .matches(
                /\S+@\S+\.\S+/,
                "Формат anystring@anystring.anystring"
            ),
        address: !customerName && Yup.string()
            .min(10, "От 10 и более символов")
            .max(50, "Не более 50 символов")
            .required('Обязательное'),
        phone: !customerName && Yup.string()
            .required('Обязательное')
            .matches(
                /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/,
                "Формат +375(29|25|44|33)9999999"
            )
    });

    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    mail: '',
                    address: '',
                    phone: '',
                    promo: '',
                    pizzas: []
                }}
                validationSchema={BasicFormSchema}
                onSubmit={(values, { resetForm }) => {
                    values.pizzas = [...Object.keys(items)];
                    JSON.parse(localStorage.getItem('customerName')) ? 
                        values.name = JSON.parse(localStorage.getItem('customerName')) :
                        values = {...values}
                    JSON.parse(localStorage.getItem('customerMail')) ? 
                        values.mail = JSON.parse(localStorage.getItem('customerMail')) :
                        values = {...values}
                    JSON.parse(localStorage.getItem('customerAddress')) ? 
                        values.address = JSON.parse(localStorage.getItem('customerAddress')) :
                        values = {...values}
                    JSON.parse(localStorage.getItem('customerPhone')) ? 
                        values.phone = JSON.parse(localStorage.getItem('customerPhone')) :
                        values = {...values}
                    if(values['promo']) {
                        values = {...values};
                    } else {
                        // delete values['promo'];
                        const {promo, ...newValues} = values;
                        values = {...newValues};
                    }   
                    orderPost(values);
                    // const findArray = allOrder.filter(item => (item.customer.name === values.name) && (item.customer.mail === values.mail) && (item.status === 'Pending' || item.status === 'InProgress'));
                    // console.log(findArray);
                    history.push('/app');
                    dispatch(setCustomer({name: values.name, mail: values.mail, address: values.address, phone: values.phone}));
                    // dispatch(setItems(findArray));
                    dispatch(clearCart());
                    resetForm({values: ''});
                }}
            >
                {props => (
                    <form onSubmit={props.handleSubmit}>
                        <div className={classes.wrapper}>
                            {arrayFields.map(field => 
                                <div>
                                    <Input
                                        type="text"
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        value={props.values[field]}
                                        name={field}
                                        placeholder={
                                            field === 'name' && JSON.parse(localStorage.getItem('customerName')) ? 
                                                JSON.parse(localStorage.getItem('customerName')) : 
                                            field === 'mail' && JSON.parse(localStorage.getItem('customerMail')) ?
                                                JSON.parse(localStorage.getItem('customerMail')) :
                                            field === 'address' && JSON.parse(localStorage.getItem('customerAddress')) ?
                                                JSON.parse(localStorage.getItem('customerAddress')) :
                                            field === 'phone' && JSON.parse(localStorage.getItem('customerPhone')) ?
                                                JSON.parse(localStorage.getItem('customerPhone')) :
                                                field
                                        }
                                        className={classes.input}
                                        disabled={
                                            field === 'name' && JSON.parse(localStorage.getItem('customerName')) ? 
                                                true : 
                                            field === 'mail' && JSON.parse(localStorage.getItem('customerMail')) ?
                                                JSON.parse(localStorage.getItem('customerMail')) :
                                            field === 'address' && JSON.parse(localStorage.getItem('customerAddress')) ?
                                                JSON.parse(localStorage.getItem('customerMail')) :
                                            field === 'phone' && JSON.parse(localStorage.getItem('customerPhone')) ?
                                                JSON.parse(localStorage.getItem('customerPhone')) :
                                                false
                                        }
                                    />
                                    {props.errors[field] && <div className={classes.errorTitle}>{props.errors[field]}</div>}
                                </div>
                            )}
                        </div>
                        <div className="cart__bottom">
                            <div className="cart__bottom-details">
                                <span>
                                    Всего пицц: <b>{totalPizzas} шт.</b>
                                </span>
                                <span>
                                    Сумма заказа: <b>{totalPrice} ₽</b>
                                </span>
                            </div>
                            <Button 
                                variant="contained" 
                                size="large" 
                                onClick={props.handleSubmit}
                                className={classes.button}
                            >
                                Оформить заказ
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default OrderForm;
