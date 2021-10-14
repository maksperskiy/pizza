import React from 'react';
import { useSelector } from 'react-redux';
import { Box, FormControl, NativeSelect, Button } from '@material-ui/core';
import { switchAdminState } from './../../functions/importFunctions';

const FormGet = ({ getElem, statusArray, selectGetData }) => {
    const { allCategories, allNames, allSizes, allTypes, allCook, allPost } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types,

        allCook: admin.cook,
        allPost: admin.post
    }));

    const optionItems = switchAdminState(getElem, allCategories, allNames, allSizes, allTypes, statusArray, allCook, allPost);

    const [activeSelectItem, setActiveSelectItem] = React.useState(
        optionItems.length && getElem === 'cookId' ? optionItems[0]['cookId'] : optionItems[0]
    );

    const handleChange = (e) => {
        setActiveSelectItem(e.target.value);
    };

    return (
        <Box mb={2} sx={{display: 'flex', alignItems: 'center'}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <NativeSelect
                    onChange={handleChange}
                >
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
            <Button 
                variant="contained" 
                size="medium"
                type="submit" 
                onClick={() => selectGetData(activeSelectItem)}
            >
                Выбрать
            </Button>
        </Box>
    )
}

export default FormGet;
