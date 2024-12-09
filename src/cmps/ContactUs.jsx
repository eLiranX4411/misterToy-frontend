import { Formik, Form, Field } from 'formik'
import { TextField, Button } from '@mui/material'
import * as Yup from 'yup'

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required')
})

function CustomInput(props) {
  return <TextField {...props} id='standard-basic' variant='standard' />
}

export function ContactUs() {
  const defaultValues = {
    firstName: '',
    lastName: '',
    email: ''
  }
  return (
    <div className='formik-container'>
      <Formik
        initialValues={defaultValues}
        validationSchema={SignupSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log('values', values)
        }}
      >
        {({ errors, touched }) => (
          <Form className='formik'>
            <h1>Contact Us</h1>
            <Field
              as={CustomInput}
              name='firstName'
              label='First Name'
              className={errors.firstName && touched.firstName ? 'input-error' : ''}
            />
            {errors.firstName && touched.firstName && (
              <div className='errors'>{errors.firstName}</div>
            )}

            <Field
              as={CustomInput}
              name='lastName'
              label='Last Name'
              className={errors.lastName && touched.lastName ? 'input-error' : ''}
            />
            {errors.lastName && touched.lastName && <div className='errors'>{errors.lastName}</div>}

            <Field
              as={CustomInput}
              name='email'
              label='Email'
              type='email'
              className={errors.email && touched.email ? 'input-error' : ''}
            />
            {errors.email && touched.email && <div className='errors'>{errors.email}</div>}

            <Button type='submit' variant='outlined'>
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  )
}
