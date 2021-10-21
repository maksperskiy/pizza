import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { FormControl, NativeSelect } from '@material-ui/core';
import { switchAdminState } from './../../functions/importFunctions';

const useStyles = makeStyles((theme) => ({
    button: {
        backgroundColor: `#8aabff !important`,
        '&:hover': {
            backgroundColor: '#5190cf !important',
        }
    }
}));

const FormUpdate = ({ putItem, putStatusId, setVisibleFormPost, allCustomers, statusArray, elemUpdate }) => {
    const classes = useStyles();
    const { allCategories, allNames, allSizes, allTypes, allCook, allPost } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types,

        allCustomers: admin.customers,

        allCook: admin.cook,
        allPost: admin.post
    }));

    const optionItems = switchAdminState(elemUpdate, allCategories, allNames, allSizes, allTypes, allCustomers, statusArray, allCook, allPost);
    console.log(elemUpdate);
    console.log(optionItems);

    const [activeSelectItem, setActiveSelectItem] = React.useState(
        elemUpdate === 'post' ? 
            optionItems[0]['postId'] : 
        elemUpdate === 'cookSession' ?
            optionItems[0]['cookId'] :  
            ''
    );
    console.log(activeSelectItem)
    const handleChange = (item) => {
        setActiveSelectItem(item.target.value);
        console.log(item.target.value);
    };

    const post = () => {
        // elemUpdate === 'post' ? 
        //     putItem(putStatusId, {postId: activeSelectItem}) : 
        //     putItem(putStatusId, {status: activeSelectItem})

        // elemUpdate === 'post' ?
        //     putItem(putStatusId, {postId: activeSelectItem}) :
        // elemUpdate === 'cookSession' ?
        //     putItem(activeSelectItem, {postId: activeSelectItem}) :
        //     ''
        elemUpdate === 'post' && putItem(putStatusId, {postId: activeSelectItem});
        elemUpdate === 'cookSession' && putItem(activeSelectItem, {postId: activeSelectItem});
        setVisibleFormPost(true);
    };

    return (
        <Box mb={2} sx={{display: 'flex', alignItems: 'center'}}>
            <FormControl variant="standard" sx={{minWidth: 120, marginRight: '20px'}}>
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
                                    value={
                                        elemUpdate === 'post' ? 
                                            item['postId'] :
                                        elemUpdate === 'cookSession' ?
                                            item['cookId'] : ''
                                    }
                                >
                                    {
                                    // item['value']
                                        elemUpdate === 'post' ? 
                                            item['value'] :
                                        elemUpdate === 'cookSession' ?
                                            item['name'] : ''
                                    }
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
                className={classes.button}
            >
                Изменить
            </Button>
        </Box>
    )
}

export default FormUpdate;
