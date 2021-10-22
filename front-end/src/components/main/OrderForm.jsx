import React from 'react';
import { Input, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/styles';
import { toast } from "react-toastify";
import * as Yup from "yup";

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

const BasicFormSchema = Yup.object().shape({
    name: Yup.string()
        .min(3, "От 6 и более символов")
        .max(12, "Не более 12 символов")
        .required('Обязательное'),
    mail: Yup.string()
        .required('Обязательное')
        .matches(
            /\S+@\S+\.\S+/,
            "Формат anystring@anystring.anystring"
        ),
    address: Yup.string()
        .min(10, "От 10 и более символов")
        .max(30, "Не более 30 символов")
        .required('Обязательное'),
    phone: Yup.string()
        .required('Обязательное')
        .matches(
            /^(\+375)(29|25|44|33)(\d{3})(\d{2})(\d{2})$/,
            "Формат +375(29|25|44|33)9999999"
        ),
    // promo: Yup.string()
    //     .required('Обязательное')
});

const arrayFields = ['name', 'mail', 'address', 'phone', 'promo'];

const OrderForm = ({ items, totalPrice, totalPizzas, orderPost }) => {
    const classes = useStyles();

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
                    if(values['promo']) {
                        values = {...values};
                    } else {
                        // delete values['promo'];
                        const {promo, ...newValues} = values;
                        values = {...newValues};
                    }   
                    orderPost(values);
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
                                        placeholder={field}
                                        className={classes.input}
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
