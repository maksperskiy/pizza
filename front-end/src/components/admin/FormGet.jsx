import React from 'react';
import { useSelector } from 'react-redux';
import { Box, FormControl, NativeSelect, Button } from '@material-ui/core';
import { switchAdminState } from './../../functions/importFunctions';

const FormGet = ({ getElem, statusArray, selectGetData, postItem, putDateTimeItem }) => {
    const { allCategories, allNames, allSizes, allTypes, allCookSession, allCook, allPost } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types,

        allCookSession: admin.cooksession,
        allCook: admin.cook,
        allPost: admin.post
    }));
    
    const optionItems = switchAdminState(getElem, allCategories, allNames, allSizes, allTypes, statusArray, allCook, allPost);

    let cookTimeEndArray = allCookSession && allCookSession.filter(item => item.dateTimeEnd === null);

    const [activeSelectItem, setActiveSelectItem] = React.useState(
        localStorage.getItem('cook') ?  localStorage.getItem('cook') : ''
        // allCook.length ? allCook[0].cookId : ''
    );

    const handleChange = (e) => {
        setActiveSelectItem(e.target.value);
        selectGetData(e.target.value);
        console.log(e.target.value);
        localStorage.setItem('cook', e.target.value);
    };

    return (
        <Box mb={2} sx={{display: 'flex', alignItems: 'center'}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <NativeSelect
                    defaultValue={'none'}
                    inputProps={{
                        name: getElem,
                        id: getElem,
                    }}
                    value={activeSelectItem}
                    onChange={handleChange}
                >
                    <option
                        value=''
                        onClick={() => console.log('none')}
                    >
                        none
                    </option>
                    {
                        optionItems.map((item, index) => 
                            typeof item === 'object' ?
                                <option
                                    value={item['cookId']}
                                >
                                    {item['name']}
                                </option> :
                            <option value={index}>{item}</option>
                        )
                    }
                </NativeSelect>
            </FormControl>
            {
                allCookSession.length === 0 || cookTimeEndArray.length === 0 ?
                    <Button 
                        variant="contained" 
                        size="medium"
                        type="submit" 
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
                        onClick={() => {
                            putDateTimeItem(activeSelectItem)
                        }}
                    >
                        Закончить сессию
                    </Button>
            }
        </Box>
    )
}

export default FormGet;
