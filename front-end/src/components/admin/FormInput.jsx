import React from 'react';
import { useField } from 'formik';
import { Checkbox, FormControlLabel, Input, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Add as AddIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    fab: {
        backgroundColor: `#bf6bcd !important`,
        '&:hover': {
            backgroundColor: '#b243c5 !important',
        }
    }
}));

const FormInput = ({ keyValue, inputDisabled, inputPrice }) => {
    const classes = useStyles();
    const InputTextField = ({ ...props }) => {
        const [field, meta, helpers] = useField(props);
        
        return (
            <>
                {
                    inputDisabled ?
                        <Input {...field} {...props} value={inputPrice} disabled sx={{marginRight: '20px'}} /> :
                        <Input {...field} {...props} sx={{marginRight: '20px'}} />
                }
            </>
        );
    };

    const InputCheckboxField = ({ ...props }) => {
        const [field, meta, helpers] = useField(props);

        return (
            <>
                <FormControlLabel control={<Checkbox {...field} {...props} />} label={props.name} sx={{marginRight: '20px'}} />
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
                    className={classes.fab}
                    sx={{marginRight: '20px'}}
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
