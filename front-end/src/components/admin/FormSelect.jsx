import React from 'react';
import { FormControl, NativeSelect } from '@material-ui/core';

const FormSelect = ({ keyValue, props, stateItems }) => {
    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <NativeSelect
                defaultValue={'none'}
                inputProps={{
                    name: keyValue,
                    id: keyValue,
                }}
                value={props.values[keyValue]}
                onChange={props.handleChange}
            >
                <option
                    key='none'
                    value='none'
                >
                    none
                </option>
                {stateItems.map((item) => (
                    <option
                        key={item[keyValue]}
                        value={item[keyValue]}
                    >
                        {item['value']}
                    </option>
                ))}
            </NativeSelect>
        </FormControl>
    );
};

export default FormSelect;
