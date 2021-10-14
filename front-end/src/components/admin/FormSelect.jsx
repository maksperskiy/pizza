import React from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';

const FormSelect = ({ keyValue, props, stateItems }) => {
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <NativeSelect
                defaultValue={'Pending'}
                inputProps={{
                    name: keyValue,
                    id: keyValue,
                }}
                value={props.values[keyValue]}
                onChange={props.handleChange}
                disabled={keyValue === 'cookStatus' ? true : false}
            >
                <option
                    value=''
                >
                    {keyValue === 'cookStatus' ? 'Pending' : 'none'}
                </option>
                {
                    stateItems.map((item, index) => (
                        typeof item === 'object' ?
                            <option
                                key={item[keyValue]}
                                value={item[keyValue]}
                            >
                                {item.hasOwnProperty('value') ? item['value'] : item['name'] }
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

export default FormSelect;
