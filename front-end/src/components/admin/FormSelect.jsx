import React from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';

const FormSelect = ({ keyValue, props, stateItems, inputDisabled, inputCategoryName }) => {
    return (
        <FormControl variant="standard" sx={{minWidth: 120, marginRight: '20px'}}>
            <NativeSelect
                defaultValue={'Pending'}
                inputProps={{
                    name: keyValue,
                    id: keyValue,
                }}
                value={props.values[keyValue]}
                onChange={props.handleChange}
                disabled=
                {
                    // keyValue === 'cookStatus' ? true : false
                    keyValue === 'cookStatus' ? true :
                        inputDisabled && keyValue === 'categoryId' ? true : false
                }
            >
                <option
                    value=''
                >
                    {
                        keyValue === 'cookStatus' ? 
                            'Pending' :
                            inputDisabled && keyValue === 'categoryId' && inputCategoryName ?
                            inputCategoryName :
                            'none'
                    }
                    {/* {keyValue === 'categoryId' ? inputCategoryName : ''} */}
                </option>
                {
                    stateItems.map((item, index) => (
                        typeof item === 'object' ?
                            <option
                                key={item[keyValue]}
                                value={item[keyValue]}
                            >
                                {/* {item.hasOwnProperty('value') ? item['value'] : item['name'] } */}
                                {
                                    keyValue === 'sizeId' ? 
                                        item['name'] :
                                    item.hasOwnProperty('value') ? item['value'] : item['name']
                                }
                            </option> :
                            <option
                                key={item}
                                value={index}
                            >
                                {item}
                            </option>
                    ))
                }
            </NativeSelect>
        </FormControl>
    );
};

export default React.memo(FormSelect);
