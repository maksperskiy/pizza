import React from 'react';
import { useField } from 'formik';
import { Checkbox, FormControlLabel, Input, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

const FormInput = ({ keyValue }) => {
    const InputTextField = ({ ...props }) => {
        const [field, meta, helpers] = useField(props);
        
        return (
            <>
                <Input {...field} {...props} />
            </>
        );
    };

    const InputCheckboxField = ({ ...props }) => {
        const [field, meta, helpers] = useField(props);

        return (
            <>
                <FormControlLabel control={<Checkbox {...field} {...props} />} label={props.name} />
            </>
        );
    };

    const InputFileField = ({ ...props }) => {
        const [field, meta, helpers] = useField(props);

        return (
            <label htmlFor={props.id}>
                <input {...field} {...props} />
                <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    variant="extended"
                >
                    <AddIcon /> Upload photo
                </Fab>
            </label>
        );
    };

    return (
        <>
            {
                keyValue === 'image' ?
                    <InputFileField 
                        style={{ display: "none" }}
                        id={keyValue} 
                        name={keyValue} 
                        type="file" 
                    /> :
                keyValue === 'visible' ?
                    <InputCheckboxField name={keyValue} color="secondary" defaultChecked={true} /> :
                    <InputTextField name={keyValue} placeholder={keyValue} />
            }
        </>
    )
}

export default React.memo(FormInput);
