import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { UploadField } from './UploadField';
import { TextField } from './TextField';
import { Formik, Form } from 'formik';



function App() {
  return (
    <Switch>
      <Route path="/edit" component={Edit} />
      <Route path="/add" component={Add} />
      <Redirect from="/" to="/add" />
    </Switch>
  )
}

function Add() {
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <Link to="/edit">Edit</Link>
              <h1 className="mb-5">Uppy</h1>
              <Formik
                initialValues={{
                  name: '',
                  surname: '',
                  upload: {
                    isEditing: false,
                    endpoint: 'https://wunschmieter-api-4h4sn.ondigitalocean.app/api/test-object/create',
                  }
                }}
                onSubmit={(values) => {
                  alert(JSON.stringify(values, null, 2));
                }}

              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit} id="formOne">
                    <div className="mb-4">
                      <UploadField
                        id="one"
                        limit="3"
                        isSubmitting={isSubmitting}
                        name="upload"
                        isEditing={values.upload.isEditing}
                        endpoint={values.upload.endpoint}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        name="surname"
                        type="text"
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function Edit() {
  return (
    <>
      <section className="py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-6 col-lg-4 col-xl-3">
              <h1 className="mb-5">Uppy</h1>

              <Formik
                initialValues={{
                  name: '',
                  surname: '',
                  upload: {
                    isEditing: true,
                    endpoint: 'https://wunschmieter-api-4h4sn.ondigitalocean.app/api/test-object/create',
                    imagesEndpoint: 'https://wunschmieter-api-4h4sn.ondigitalocean.app/api/test-object/1',
                  }
                }}
                onSubmit={(values) => {
                  // console.log(values)
                  alert(JSON.stringify(values, null, 2));
                }}

              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting
                }) => (
                  <Form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <UploadField
                        id="two"
                        limit="3"
                        isSubmitting={isSubmitting}
                        name="upload"
                        isEditing={values.upload.isEditing}
                        endpoint={values.upload.endpoint}
                        imagesEndpoint={values.upload.imagesEndpoint}
                      />
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                      />
                    </div>
                    <div className="mb-4">
                      <TextField
                        name="surname"
                        type="text"
                      />
                    </div>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App;
