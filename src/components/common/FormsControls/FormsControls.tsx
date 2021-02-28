import React from 'react';
import Style from './FormsControls.module.css'

type TextAreaPropsType = { // todo - fix any
    input: any,
    meta: any
}

export const TextInputForm = ({input, meta, formType, ...props}: any) => {

    const hasError = meta.error && meta.touched

    return (
        <div className={Style.formControl + ' ' + (hasError && Style.error)}>
            <div>
                {formType === 'textarea' ? <textarea {...input} {...props}/>
                    : <input {...input} {...props}/>
                }
            </div>
            {hasError && <span style={{color: 'red', fontWeight: 'bold'}}>{meta.error}</span>}
        </div>
    )
}
