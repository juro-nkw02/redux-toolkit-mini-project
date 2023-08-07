import './style.css';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getUsers, login } from '../../features/auth/authSlice.js';
import * as Yup from 'yup';
import useToken from '../../hooks/useToken.js';
import FormikController from '../../formik/formik-container';

const formInitial = {
  username: '',
  password: '',
};

const errorsInitial = {
  username: '',
  password: '',
  incorrect: '',
};

const Index = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useToken();
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

    if (values.username.length !== 0 && values.password.length !== 0) {
      const userExists = users.some((user) => {
        return user.username === values.username;
      });

      if (!userExists) {
        errorBag['incorrect'] =
          'Your username does not match with our system! Please create a new one.';

        return returnError();
      }

      const correctCredentials = users.some((user) => {
        return (
          user.username === values.username && user.password === values.password
        );
      });

      if (correctCredentials) {
        return true;
      }

      errorBag['incorrect'] = 'Wrong credentials!';
      return returnError();
    }

    return returnError();
  };

  const handleLoginSubmit = (formValues) => {
    if (!validator(formValues)) {
      return;
    }

    dispatch(login(formValues));
    const to = location.state?.from?.pathname ?? '/';
    navigate(to);
    setToken(formValues);
  };

  return (
    <section className='w-3/5 m-auto text-white'>
      <p className='text-center mb-4 text-4xl'>Welcome Back to GS!</p>

      <Formik
        initialValues={formInitial}
        initialErrors={errorsInitial}
        onSubmit={handleLoginSubmit}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is required.'),
          password: Yup.string().required('Password is required.'),
        })}
      >
        {(formProps) => (
          <Form>
            {Object.keys(formProps.errors).length == 0 && errors?.incorrect && (
              <p className='error'>{errors?.incorrect}</p>
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
            <div className='flex justify-end items-end'>
              <Link to='/register' className='underline'>
                Register
              </Link>
            </div>

            <FormikController
              control='button'
              label='Login'
              disabled={!(formProps.dirty && formProps.isValid)}
            />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default Index;
