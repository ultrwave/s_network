import React from 'react';
import Style from './FormsControls.module.css'
import {Field} from 'redux-form';

type TextAreaPropsType = {
    input: string,
    meta: string
}


export const TextInputForm = ({input, meta, formType, ...props}: any) => {

    const hasError = meta.error && meta.touched

    return (
        <div className={Style.formControl + ' ' + (hasError && Style.error)}>
            <div>
                {formType === 'textarea'
                    ? <textarea {...input} {...props}/>
                    : <input {...input} {...props}/>
                }
            </div>
            {hasError && <span style={{color: 'red', fontWeight: 'bold'}}>{meta.error}</span>}
        </div>
    )
}

export const createField = (placeholder: string, name: string, validators: any, component: any, props = {}, text = '') => (<div>
    <Field placeholder={placeholder}
           name={name}
           validate={validators}
           component={component}
           {...props}
    /> {text}
</div>)