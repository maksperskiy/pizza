import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form as ContentForm } from 'formik';
import { Box, Button, Slider } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { switchAdminState, switchKeysWithoutId } from './../../functions/importFunctions';
import { FormSelect, FormInput } from './../importComponents';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: `#8aabff !important`,
        '&:hover': {
            backgroundColor: '#5190cf !important',
        }
    }
}));

const Form = ({ postItem, path, statusArray, visibleFormPost }) => {
    const classes = useStyles();
    const { allCategories, allNames, allSizes, allTypes, allPizzas, allCustomers, allCookSession, allCook, allPost } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types,
        allPizzas: admin.pizzas,

        allCustomers: admin.customers,

        allCookSession: admin.cooksession,
        allCook: admin.cook,
        allPost: admin.post
    }));

    const keysWithoutId = switchKeysWithoutId(path);

    const keysObj = keysWithoutId && keysWithoutId.reduce(function(acc, cur) {
        if(cur === 'visible') {
            acc[cur] = true;
            return acc;
        }
        if(path === 'promo' && cur === 'value') {
            acc[cur] = 10;
            return acc;
        }
        acc[cur] = '';
        return acc;
    }, {});

    const formRef = useRef();
    const [inputDisabled, setInputDisabled] = React.useState(false);
    const [inputPrice, setInputPrice] = React.useState('');
    const [inputCategoryName, setInputCategoryName] = React.useState('');

    const newFunc = (price, category) => {
        setInputDisabled(true);
        setInputPrice(price);
        setInputCategoryName(category);
    };

    return (
        <div className="App">
            <Formik
                initialValues= {{
                    ...keysObj
                }}
                onSubmit={(values, { resetForm }) => {
                        const formData = new FormData(formRef.current);
                        if(keysWithoutId && keysWithoutId.includes('image')) {
                            postItem(formData);
                        } else {
                            postItem(values);
                        }
                        // console.log(values);
                        setInputDisabled(false);
                        resetForm({values: ''});
                }}
                validate = {values => {
                    const errors = {};
                    
                    keysWithoutId.map(key => {
                        if(key === 'visible' || key === 'cookStatus' || (path === 'promo' && key === 'value')) {
                            return;
                        }
                        if((inputDisabled && key === 'price') || (inputDisabled && key === 'categoryId')) {
                            return;
                        }
                        if(!values[key]) {
                            errors[key] = 'Required';
                        }
                    })
                    console.log(values);
                    const findArray = allPizzas.filter(item => item.name.nameId === values.nameId);
                    setInputDisabled(false);
                    if(path === 'pizzas' && findArray.length !== 0) {
                        console.log(values);
                        console.log(allPizzas);
                        
                        console.log(findArray.length && findArray[0].category.categoryId);
                        values.price = findArray.length ? findArray[0].price : '';
                        values.categoryId = findArray.length ? findArray[0].category.categoryId : '';
                        findArray.length ? 
                            newFunc(findArray[0].price, findArray[0].category.value)
                            :
                            setInputDisabled(false)
                    }
                    
                    console.log(errors);
                    return errors;
                }}
            >
                {(props) => {
                    return (
                        <Box mb={2}>
                            <ContentForm 
                                ref={formRef} 
                                style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
                            >
                                {
                                    keysWithoutId && keysWithoutId.map(key => 
                                        key.includes('Id') || key === 'cookStatus' ?
                                            <FormSelect
                                                keyValue={key}
                                                props={props}
                                                stateItems={switchAdminState(key, allCategories, allNames, allSizes, allTypes, allCustomers, statusArray, allCook, allPost)}
                                                visibleFormPost={visibleFormPost}
                                                inputDisabled={inputDisabled}
                                                inputCategoryName={inputCategoryName}
                                            /> :
                                        path === 'promo' && key === 'value' ?
                                            <Slider
                                                size="small"
                                                defaultValue={10}
                                                min={10}
                                                max={100}
                                                step={10}
                                                aria-label="Small"
                                                valueLabelDisplay="auto"
                                                sx={{width: '300px', marginRight: '20px'}}
                                                name={key}
                                                onChange={props.handleChange}
                                            /> :
                                            <FormInput 
                                                keyValue={key} 
                                                inputDisabled={inputDisabled} 
                                                inputPrice={inputPrice}
                                            />
                                    )
                                }
                                <Button 
                                    variant="contained" 
                                    size="medium"
                                    type="submit" 
                                    onClick={props.handleSubmit}
                                    className={classes.button}
                                >
                                    Добавить
                                </Button>
                            </ContentForm>
                        </Box>
                    );
                }}
            </Formik>
        </div>
    );
}

export default React.memo(Form);
