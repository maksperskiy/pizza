import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Formik, Form as ContentForm } from 'formik';
import { Box, Button } from '@material-ui/core';
import { switchAdminState, switchKeysWithoutId } from './../../functions/importFunctions';
import { FormSelect, FormInput } from './../importComponents';

const Form = ({ postItem, path, statusArray, visibleFormPost }) => {
    const { allCategories, allNames, allSizes, allTypes, allCookSession, allCook, allPost } = useSelector(({ admin }) => ({
        allCategories: admin.categories,
        allNames: admin.names,
        allSizes: admin.sizes,
        allTypes: admin.types,

        allCookSession: admin.cooksession,
        allCook: admin.cook,
        allPost: admin.post
    }));

    const keysWithoutId = switchKeysWithoutId(path);

    const keysObj = keysWithoutId && keysWithoutId.reduce(function(acc, cur) {
        if(cur === 'visible') {
            acc[cur] = true;
            return acc;
        }
        acc[cur] = '';
        return acc;
    }, {});

    const formRef = useRef();

    return (
        <div className="App">
            <Formik
                initialValues= {{
                    ...keysObj
                }}
                onSubmit={(values, { resetForm }) => {
                        const formData = new FormData(formRef.current);
                        if(keysWithoutId && keysWithoutId.includes('image')) {
                            postItem(formData);
                        } else {
                            postItem(values);
                        }
                        console.log(values);
                        resetForm({values: ''});
                }}
                validate = {values => {
                    const errors = {};
                    
                    keysWithoutId.map(key => {
                        if(key === 'visible' || key === 'cookStatus') {
                            return;
                        }
                        if(!values[key]) {
                            errors[key] = 'Required';
                        }
                    })
                    console.log(errors);
                    return errors;
                }}
            >
                {(props) => {
                    return (
                        <Box mb={2}>
                            <ContentForm 
                                ref={formRef} 
                                style={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}
                            >
                                {
                                    keysWithoutId && keysWithoutId.map(key => 
                                        key.includes('Id') || key === 'cookStatus' ?
                                            <FormSelect
                                                keyValue={key}
                                                props={props}
                                                stateItems={switchAdminState(key, allCategories, allNames, allSizes, allTypes, statusArray, /*allCookSession,*/ allCook, allPost)}
                                                visibleFormPost={visibleFormPost}
                                            /> :
                                            <FormInput keyValue={key} />
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
                            </ContentForm>
                        </Box>
                    );
                }}
            </Formik>
        </div>
    );
}

export default Form;
