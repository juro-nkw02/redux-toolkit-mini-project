import './style.css';
import { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, login } from '../../features/auth/authSlice.js';
import useToken from '../../hooks/useToken.js';

const formInitial = {
  username: '',
  password: '',
};

const errorsInitial = {
  all: '',
  username: '',
  password: '',
  register: '',
  incorrect: '',
};

const Index = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useToken();
  const [auth, setAuth] = useState(formInitial);
  const [errors, setErrors] = useState(errorsInitial);
  const [showPass, setShowPass] = useState(false);
  const users = useSelector((state) => state.auth.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const validator = () => {
    let errorBag = [];

    const returnError = () => {
      setErrors(errorBag);
      return false;
    };

    if (auth.username.length === 0 && auth.password.length === 0) {
      errorBag['all'] = 'All fields are required!';
      return returnError();
    }

    if (auth.username.length === 0) {
      errorBag['username'] = 'Username must not be empty!';
    }
    if (auth.password.length === 0) {
      errorBag['password'] = 'Password must not be empty!';
    }

    if (auth.username.length !== 0 && auth.password.length !== 0) {
      const userExists = users.some((user) => {
        return user.username === auth.username;
      });

      if (!userExists) {
        errorBag['incorrect'] =
          'Your username does not match with our system! Please create a new one.';

        return returnError();
      }

      const correctCredentials = users.some((user) => {
        return (
          user.username === auth.username && user.password === auth.password
        );
      });

      if (correctCredentials) {
        return true;
      }

      errorBag['all'] = 'Wrong credentials!';
      return returnError();
    }

    return returnError();
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setAuth({ ...auth, [name]: value });
  };

  const togglePass = () => {
    setShowPass(!showPass);
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();

    console.log('login location ', location);
    if (validator()) {
      dispatch(login(auth));
      const to = location.state?.from?.pathname ?? '/';
      navigate(to);
      setToken(auth);
    }
  };

  return (
    <section className='w-3/5 m-auto text-white'>
      <p className='text-center mb-4 text-4xl'>Welcome Back to GS! </p>
      <form onSubmit={handleLoginSubmit}>
        {errors?.all && <p className='error'>{errors?.all}</p>}
        {errors?.register && <p className='error'>{errors?.register}</p>}
        <div>
          <label htmlFor='username'>Username</label>
          <div
            className={`p-0.5 w-full rounded-md relative ${
              errors?.all || errors?.username ? 'bg__error' : 'bg__success'
            }`}
          >
            <input
              type='text'
              name='username'
              id='username'
              placeholder='Enter your username'
              value={auth.username}
              onChange={handleOnChange}
            />
          </div>
          {errors?.username && <p className='error'>{errors?.username}</p>}
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <div
            className={`p-0.5 w-full rounded-md relative ${
              errors?.all || errors?.password ? 'bg__error' : 'bg__success'
            }`}
          >
            <input
              type={showPass ? 'text' : 'password'}
              name='password'
              id='password'
              placeholder='Enter your password'
              value={auth.password}
              onChange={handleOnChange}
            />
            {showPass ? (
              <FiEyeOff
                className='absolute top-[35%] right-[3%] text-black cursor-pointer'
                onClick={togglePass}
              />
            ) : (
              <FiEye
                className='absolute top-[35%] right-[3%] text-black cursor-pointer'
                onClick={togglePass}
              />
            )}
          </div>
          {errors?.password && <p className='error'>{errors?.password}</p>}

          <div className='flex justify-end items-end'>
            <Link to='/register' className='underline'>
              Register
            </Link>
          </div>
        </div>

        <button type='submit' className='btn__submit'>
          Login
        </button>
      </form>
    </section>
  );
};

export default Index;
