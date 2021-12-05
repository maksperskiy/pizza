import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Button } from '@material-ui/core';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/styles';
import * as Yup from "yup";
import { clearCart } from './../../redux/actions/importActions';
import { MyItem } from './../importComponents';
import { concatArrays } from './../../functions/pizzas';

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
        marginTop: '30px !important',
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
        .min(3, "От 3 и более символов")
        .max(40, "Не более 40 символов")
        .required('Обязательное'),
    mail: Yup.string()
        .required('Обязательное')
        .matches(
            /\S+@\S+\.\S+/,
            "Формат anystring@anystring.anystring"
        )
});

const arrayFields = ['name', 'mail'];

const MyItemsForm = ({ allOrder, fetchMyItems /*setMyItems*/ }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [infoText, setInfoText] = useState('');
    // const [pizzas, setPizzas] = useState([]);
    // const [myItems, setMyItems] = useState([]);
    // console.log(myItems);
    // const transformItems = myItems.length && concatArrays(myItems, ['size', 'type']);
    // console.log(transformItems);
    return (
        <>
            <Formik
                initialValues={{
                    name: '',
                    mail: ''
                }}
                validationSchema={BasicFormSchema}
                onSubmit={(values, { resetForm }) => {
                    console.log(values)
                    const findArray = allOrder.filter(item => (item.customer.name === values.name) && (item.customer.mail === values.mail) && (item.status === 'Pending' || item.status === 'InProgress'));
                    console.log('MyItemsForm: ')
                    console.log(findArray);

                    if(findArray.length) {
                        setInfoText('Отлично, ожидайте')
                    } else {
                        setInfoText('Неправильные данные')
                    }

                    localStorage.setItem('customerName', JSON.stringify(findArray[0].customer.name));
                    localStorage.setItem('customerMail', JSON.stringify(findArray[0].customer.mail));
                    localStorage.setItem('customerAddress', JSON.stringify(findArray[0].address));
                    localStorage.setItem('customerPhone', JSON.stringify(findArray[0].customer.phone));

                    fetchMyItems();
                    
                    localStorage.setItem('myItems', JSON.stringify(findArray))
                    // setMyItems([...findArray]);

                    // dispatch(clearCart());
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
                        <div style={{marginTop: '25px'}}>{infoText}</div>
                        <Button 
                            variant="contained" 
                            size="large" 
                            onClick={props.handleSubmit}
                            className={classes.button}
                        >
                            Посмотреть заказы
                        </Button>
                    </form>
                )}
            </Formik>
        </>
    )
}

export default MyItemsForm;
