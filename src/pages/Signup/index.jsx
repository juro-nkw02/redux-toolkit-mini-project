import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, register } from '../../features/auth/authSlice.js';
import * as Yup from 'yup';
import FormikController from '../../formik/formik-container';

const formInitial = {
  username: '',
  password: '',
  confirm_password: '',
};

const errorsInitial = {
  username: '',
  password: '',
  confirm_password: '',
  wrong_credentials: '',
};

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState(errorsInitial);
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const validator = (values) => {
    let errorBag = [];

    const returnError = () => {
      setErrors(errorBag);
      return false;
    };

    if (values.password !== values.confirm_password) {
      errorBag['wrong_credentials'] = 'Password must be same!';
      return returnError();
    }

    if (
      values.username.length !== 0 &&
      values.password.length !== 0 &&
      values.confirm_password.length !== 0
    ) {
      const userExists = users.some((user) => {
        return user.username === values.username;
      });

      if (!userExists) {
        return true;
      }

      errorBag['wrong_credentials'] =
        'Your username already existed! Please create with new one.';
    }

    return returnError();
  };

  const handleSignUpSubmit = (values) => {
    if (validator(values)) {
      dispatch(
        register({
          payload: {
            username: values.username,
            password: values.password,
          },
          navigate,
        })
      );
    }
  };

  return (
    <section className='w-3/5 m-auto text-white'>
      <p className='text-center mb-4 text-4xl'>Register to GS! </p>

      <Formik
        initialValues={formInitial}
        initialErrors={errorsInitial}
        onSubmit={handleSignUpSubmit}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is required.'),
          password: Yup.string().required('Password is required.'),
          confirm_password: Yup.string().required(
            'Need to confirm your password.'
          ),
        })}
      >
        {(formProps) => (
          <Form>
            {Object.keys(formProps.errors).length == 0 &&
              errors?.wrong_credentials && (
                <p className='error'>{errors?.wrong_credentials}</p>
              )}

            <FormikController
              control='input'
              label='Username'
              name='username'
              placeholder='Enter your username...'
            />
            <FormikController
              control='input-password'
              label='Password'
              name='password'
              placeholder='Enter your password...'
            />
            <FormikController
              control='input-password'
              label='Confirm Password'
              name='confirm_password'
              placeholder='Confirm your password...'
            />

            <FormikController
              control='button'
              label='Sign up'
              disabled={!(formProps.dirty && formProps.isValid)}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Index;
