import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { FormControl, NativeSelect } from '@material-ui/core';
import { switchAdminState } from './../../functions/importFunctions';

const FormUpdate = ({ putItem, putStatusId, setVisibleFormPost, statusArray, elemUpdate }) => {
    const { allCategories, allNames, allSizes, allTypes, allCook, allPost } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types,

        allCook: admin.cook,
        allPost: admin.post
    }));

    const optionItems = switchAdminState(elemUpdate, allCategories, allNames, allSizes, allTypes, statusArray, allCook, allPost);
    console.log(elemUpdate);

    const [activeSelectItem, setActiveSelectItem] = React.useState(
        // elemUpdate === 'post' ? optionItems[0]['postId'] : optionItems[0]
        elemUpdate === 'post' ? optionItems[0]['postId'] : ''
    );

    const handleChange = (item) => {
        setActiveSelectItem(item.target.value);
    };
    const post = () => {
        elemUpdate === 'post' ? 
            putItem(putStatusId, {postId: activeSelectItem}) : 
            putItem(putStatusId, {status: activeSelectItem})
        setVisibleFormPost(true);
    };

    return (
        <Box mb={2} sx={{display: 'flex', alignItems: 'center'}}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <NativeSelect
                    inputProps={{
                        name: elemUpdate,
                        id: elemUpdate,
                    }}
                    onChange={handleChange}
                >
                    {
                        optionItems.map((item, index) => 
                            typeof item === 'object' ?
                                <option
                                    value={item['postId']}
                                >
                                    {item['value']}
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
                onClick={post}
            >
                Изменить
            </Button>
        </Box>
    )
}

export default FormUpdate;
