import React from 'react';
import { Formik, Form, useField } from 'formik';



export function TextField({ label, ...props }) {
  const [field, meta] = useField(props);

  return (
    <>
      {label && (<label>{label}</label>)}
      <input className="form-control" {...field} {...props} />
    </>
  )
}