import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useField, Formik, Form as FormField } from 'formik';
import { Box, Button, Checkbox, Input, Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import switchAdminState from './../../functions/switchAdminState';
import { FormSelect } from './../importComponents';

const Form = ({ itemsKeys, postItem, message, setMessage, path }) => {
    const { allCategories, allNames, allSizes, allTypes } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types
    }));

    let keysWithoutId;
    if(path === 'pizzas') {
        keysWithoutId = ['nameId', 'typeId', 'sizeId', 'categoryId', 'price', 'visible'];
    } else {
        keysWithoutId = itemsKeys.length && itemsKeys.filter(key => !/Id/.test(key));
    }
    const keysObj = itemsKeys && keysWithoutId.reduce(function(acc, cur) {
        acc[cur] = '';
        return acc;
    }, {});

    const formRef = useRef();

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
                <Checkbox {...field} {...props} color="secondary" />
            </>
        );
    };

    return (
        <div className="App">
            <Formik
                initialValues= {{
                    ...keysObj
                }}
                onSubmit={(values, { resetForm }) => {
                        const formData = new FormData(formRef.current);
                        if(itemsKeys && itemsKeys.includes('image')) {
                            formData.append('image', values['file']);
                            postItem(formData);
                        } else {
                            postItem(values);
                        }
                        resetForm({values: ''});
                }}
            >
                {(props) => {
                    return (
                        <Box mb={2}>
                            <FormField 
                                ref={formRef} 
                                style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
                            >
                                {
                                    keysWithoutId && keysWithoutId.map(key => 
                                        key.includes('Id') ?
                                            <FormSelect
                                                keyValue={key}
                                                props={props}
                                                stateItems={switchAdminState(key, allCategories, allNames, allSizes, allTypes)}
                                            />
                                            :
                                        key === 'image' ?
                                            <label htmlFor={key}>
                                                <input
                                                    style={{ display: "none" }}
                                                    id={key}
                                                    name={key}
                                                    type="file"
                                                    value={props.values[key]}
                                                    onChange={(e) => props.setFieldValue('file', e.currentTarget.files[0])}
                                                />
                                                <Fab
                                                    color="secondary"
                                                    size="small"
                                                    component="span"
                                                    variant="extended"
                                                >
                                                    <AddIcon /> Upload photo
                                                </Fab>
                                            </label> :
                                        key === 'visible' ?
                                            <InputCheckboxField name={key} /> :
                                            <InputTextField name={key} placeholder={key} />
                                    )
                                }
                                <Button 
                                    variant="contained" 
                                    size="medium"
                                    type="submit" 
                                    onClick={props.handleSubmit}
                                >
                                    Добавить
                                </Button>
                            </FormField>
                        </Box>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Form;
