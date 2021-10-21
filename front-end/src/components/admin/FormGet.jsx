import React from 'react';
import { useSelector } from 'react-redux';
import { Box, FormControl, NativeSelect, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { switchAdminState } from './../../functions/importFunctions';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: `#8aabff !important`,
        '&:hover': {
            backgroundColor: '#5190cf !important',
        }
    }
}));

const FormGet = ({ getElem, statusArray, selectGetData, postItem, putDateTimeItem }) => {
    const classes = useStyles();
    const { allCategories, allNames, allSizes, allTypes, allCustomers, allCookSession, allCook, allPost } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types,

        allCustomers: admin.customers,

        allCookSession: admin.cooksession,
        allCook: admin.cook,
        allPost: admin.post
    }));
    
    const optionItems = switchAdminState(getElem, allCategories, allNames, allSizes, allTypes, allCustomers, statusArray, allCook, allPost);

    let cookTimeEndArray = allCookSession && allCookSession.filter(item => item.dateTimeEnd === null);

    const [activeSelectItem, setActiveSelectItem] = React.useState(
        localStorage.getItem('cook') ? localStorage.getItem('cook') : allCook.length && allCook[0].cookId
    );

    const [activeSelectItemCustomer, setActiveSelectItemCustomer] = React.useState(
        localStorage.getItem('customer') ? localStorage.getItem('customer') : allCustomers.length && ''
        // ''
    );

    const handleChange = (e) => {
        getElem === 'cookId' ? setActiveSelectItem(e.target.value) : setActiveSelectItemCustomer(e.target.value);
        selectGetData(e.target.value);
        console.log(e.target.value);
        // localStorage.setItem('cook', e.target.value);
        getElem === 'cookId' ? localStorage.setItem('cook', e.target.value) : localStorage.setItem('customer', e.target.value);
    };

    return (
        <Box mb={2} sx={{display: 'flex', alignItems: 'center'}}>
            <FormControl variant="standard" sx={{minWidth: 120, marginRight: '20px'}}>
                <NativeSelect
                    defaultValue={'none'}
                    inputProps={{
                        name: getElem,
                        id: getElem,
                    }}
                    // value={activeSelectItem}
                    value={getElem === 'cookId' ? activeSelectItem : activeSelectItemCustomer}
                    onChange={handleChange}
                >
                    {
                        getElem === 'customerId' ? 
                            <option
                                value=''
                            >
                                none
                            </option> : ''
                    }
                    {
                        optionItems.map((item, index) => 
                            typeof item === 'object' ?
                                <option
                                    // value={getElem === 'cookId' ? item['cookId'] : getElem === 'customerId' ? item['customerId'] : ''}
                                    value={getElem === 'cookId' ? item['cookId'] : item['customerId']}
                                >
                                    {item['name']}
                                </option> :
                            <option value={index}>{item}</option>
                        )
                    }
                </NativeSelect>
            </FormControl>
            {
                getElem === 'cookId' ? 
                    allCookSession.length === 0 || cookTimeEndArray.length === 0 ?
                        <Button 
                            variant="contained" 
                            size="medium"
                            type="submit" 
                            className={classes.button}
                            onClick={() => {
                                postItem(activeSelectItem);
                            }}
                        >
                            Начать сессию
                        </Button> : 
                        <Button 
                            variant="contained" 
                            size="medium"
                            type="submit" 
                            className={classes.button}
                            onClick={() => {
                                putDateTimeItem(activeSelectItem)
                            }}
                        >
                            Закончить сессию
                        </Button> 
                    : ''
            }
        </Box>
    )
}

export default FormGet;
